from supabase import create_client

SUPABASE_URL = "https://ogvuodhlfauaunpyvfky.supabase.co"
SUPABASE_KEY = "sb_publishable_QmTug6vBU-6CCp8rAGUwCA_SC1zufrb"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

res = supabase.auth.sign_in_with_password({
    "email": "rohitsharma707aa@gmail.com",
    "password": "abcdefgh"
})

print("\nACCESS TOKEN:\n")
print(res.session.access_token)