"use client"

import React from "react"
import { useShop } from "@/context/ShopContext"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { products, favorites, toggleFavorite, addToCart } = useShop()

  const favoriteProducts = products.filter(p => favorites.includes(p.id))

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 shadow-sm border border-violet-200">
          <Heart className="w-6 h-6 fill-violet-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Your Favorites</h1>
          <p className="text-zinc-500 text-sm">Items you've loved and saved for later.</p>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm">
          <Heart className="w-16 h-16 text-zinc-200 mb-6" />
          <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-zinc-500 mb-8 max-w-sm text-center">Save items you love by clicking the heart icon on any product.</p>
          <Link href="/dashboard" className="px-6 py-3 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-3xl p-4 border border-zinc-100 transition-all duration-500 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100"
            >
              <div className="relative w-full aspect-[4/3] bg-zinc-50/50 rounded-2xl mb-4 flex items-center justify-center p-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(product.id)
                  }}
                  className="absolute top-3 right-3 p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 z-10 hover:scale-110 bg-violet-50"
                >
                  <Heart className="w-4 h-4 transition-colors fill-violet-600 text-violet-600 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                </button>
              </div>
              <div className="flex-1 flex flex-col">
                <Link href={`/product/${product.id}`} className="font-bold text-sm line-clamp-2 mb-2 text-zinc-900 hover:text-violet-700 transition-colors">
                  {product.title}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100/80">
                  <p className="font-black text-lg text-zinc-900">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product)
                    }}
                    className="bg-zinc-900 hover:bg-violet-600 text-white p-2.5 px-4 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-md shadow-zinc-200 hover:shadow-violet-200 hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
