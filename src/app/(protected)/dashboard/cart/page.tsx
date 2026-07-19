"use client"

import React from "react"
import { useShop } from "@/context/ShopContext"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, checkout } = useShop()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cart.length > 0 ? (subtotal > 100 ? 0 : 15) : 0
  const total = subtotal + shipping

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-8 text-zinc-900 tracking-tight">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm">
          <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-6 text-violet-500">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-zinc-500 mb-8 max-w-sm text-center">Looks like you haven't added any premium artifacts to your cart yet.</p>
          <Link href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-violet-200 hover:-translate-y-0.5 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div key={item.cartId} className="flex gap-6 bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-32 h-32 bg-zinc-50 rounded-2xl p-4 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-zinc-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-500 mb-3 capitalize">{item.category}</p>
                      <div className="flex gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                          Color: <div className="w-3 h-3 rounded-full border border-zinc-200 shadow-sm" style={{ backgroundColor: item.color }}></div>
                        </span>
                        <span className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                          Size: <span className="text-zinc-900 font-bold">{item.size}</span>
                        </span>
                      </div>
                    </div>
                    <p className="font-black text-xl text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-zinc-50 rounded-xl border border-zinc-200 p-1">
                      <button 
                        onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-zinc-600 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-zinc-600 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-zinc-900">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-zinc-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-zinc-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-violet-600 bg-violet-50 p-2 rounded-lg border border-violet-100 mt-2">
                    Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                  </p>
                )}
              </div>
              
              <div className="border-t border-zinc-100 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-zinc-900">Total</span>
                  <span className="text-3xl font-black text-zinc-900">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  checkout()
                  alert("Order placed successfully!")
                }}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
