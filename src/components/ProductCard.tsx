"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Star, Eye } from "lucide-react"
import { useSession } from "@/lib/auth-client"

export interface ProductProps {
  id: string | number
  title: string
  category: string
  price: number
  image?: string
  description?: string
  rating?: {
    rate: number
    count: number
  }
}

export function ProductCard({ id, title, category, price, image, rating }: ProductProps) {
  const { data: session } = useSession()

  const trackInteraction = async () => {
    try {
      await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.email || "anonymous",
          productId: id,
          action: "view",
        }),
      })
    } catch (error) {
      console.error("Failed to track interaction:", error)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group flex flex-col overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-square glass-card rounded-2xl overflow-hidden mb-4 border border-violet-100/60">
        {image ? (
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-full p-6 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-violet-200 bg-violet-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover action buttons */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
          <Link
            href={`/product/${id}`}
            onClick={trackInteraction}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white text-violet-700 rounded-xl text-xs font-bold hover:bg-violet-50 shadow-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </Link>
          <button className="p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-start gap-1 px-1">
        <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider">{category}</span>
        <h3 className="font-semibold text-sm leading-tight text-zinc-900 line-clamp-1 w-full">{title}</h3>
        <div className="flex items-center justify-between w-full mt-1">
          <span className="font-bold text-base gradient-text">${price.toFixed(2)}</span>
          {rating && (
            <div className="flex items-center text-zinc-500 text-xs gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium">{rating.rate}</span>
              <span className="text-zinc-400">({rating.count})</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
