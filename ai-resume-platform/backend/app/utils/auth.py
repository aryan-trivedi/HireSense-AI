from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import requests

SUPABASE_URL = "https://ogvuodhlfauaunpyvfky.supabase.co"

security = HTTPBearer()

JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"
JWKS = requests.get(JWKS_URL).json()


def get_public_key(token: str):
    header = jwt.get_unverified_header(token)
    kid = header.get("kid")

    for jwk in JWKS["keys"]:
        if jwk["kid"] == kid:
            # ES256 uses ECAlgorithm (not RSA)
            return jwt.algorithms.ECAlgorithm.from_jwk(jwk)

    raise Exception("Matching JWK not found")


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        public_key = get_public_key(token)

        payload = jwt.decode(
            token,
            public_key,
            algorithms=["ES256"],
            audience="authenticated",
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError as e:
        print("JWT verification error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")