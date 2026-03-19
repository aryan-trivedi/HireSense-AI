"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function FeatureCard({
  title,
  description,
  icon,
  href,
}: FeatureCardProps) {

  return (

    <Link href={href} className="block group h-full">

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="
          relative h-full
          rounded-xl
          border border-neutral-800
          bg-neutral-900/40
          backdrop-blur-xl
          p-6
          flex flex-col
          justify-between
          overflow-hidden
        "
      >

        {/* glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

        {/* content */}
        <div className="relative z-10 space-y-4">

          {/* icon */}
          <div className="
            w-10 h-10
            rounded-lg
            flex items-center justify-center
            bg-neutral-800
            border border-neutral-700
            group-hover:border-neutral-600
            transition
          ">
            {icon}
          </div>

          {/* title */}
          <h3 className="text-base font-semibold text-white">
            {title}
          </h3>

          {/* description */}
          <p className="text-sm text-neutral-400 leading-relaxed">
            {description}
          </p>

        </div>

        {/* bottom subtle hover border */}
        <div className="
          absolute inset-0
          rounded-xl
          border border-transparent
          group-hover:border-neutral-700
          transition
        "/>

      </motion.div>

    </Link>

  )
}