"use client"

import React from "react"
import { useShop } from "@/context/ShopContext"
import { Package, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const { orders, cancelOrder } = useShop()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing": return <Clock className="w-5 h-5 text-blue-500" />
      case "Shipped": return <Package className="w-5 h-5 text-purple-500" />
      case "Delivered": return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "Cancelled": return <XCircle className="w-5 h-5 text-red-500" />
      default: return <Clock className="w-5 h-5 text-zinc-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing": return "bg-blue-50 text-blue-700 border-blue-200"
      case "Shipped": return "bg-purple-50 text-purple-700 border-purple-200"
      case "Delivered": return "bg-green-50 text-green-700 border-green-200"
      case "Cancelled": return "bg-red-50 text-red-700 border-red-200"
      default: return "bg-zinc-50 text-zinc-700 border-zinc-200"
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Order History</h1>
          <p className="text-zinc-500 text-sm">Track, return, or purchase items again.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm">
          <Package className="w-16 h-16 text-zinc-200 mb-6" />
          <h2 className="text-xl font-bold mb-2">No orders found</h2>
          <p className="text-zinc-500 mb-8 max-w-sm text-center">You haven't placed any orders yet. Start exploring our premium collection.</p>
          <Link href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-violet-200 hover:-translate-y-0.5 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="bg-zinc-50/80 p-6 border-b border-zinc-100 flex flex-wrap gap-6 justify-between items-center">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Order Placed</p>
                    <p className="font-medium text-zinc-900">{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total</p>
                    <p className="font-medium text-zinc-900">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Order ID</p>
                    <p className="font-medium text-zinc-900">#{order.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                  
                  {order.status === "Processing" && (
                    <button 
                      onClick={() => cancelOrder(order.id)}
                      className="px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-xl font-medium text-sm transition-colors shadow-sm"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4">Items in this order</h3>
                <div className="space-y-4">
                  {order.items.length === 0 ? (
                    <p className="text-zinc-500 italic">No items found for this order.</p>
                  ) : order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-center">
                      <div className="w-20 h-20 bg-zinc-50 rounded-xl p-2 shrink-0 border border-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-zinc-900">{item.title}</h4>
                        <div className="flex gap-3 text-sm text-zinc-500 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>Color: <span className="inline-block w-2.5 h-2.5 rounded-full border border-zinc-300 ml-1" style={{ backgroundColor: item.color }}></span></span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-zinc-50/50 p-4 px-6 border-t border-zinc-100 flex justify-end gap-3">
                <Link href="/dashboard" className="px-5 py-2.5 bg-white border border-zinc-200 rounded-xl font-medium text-sm hover:bg-zinc-50 transition-colors">
                  View Invoice
                </Link>
                {order.status !== "Cancelled" && (
                  <button className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-medium text-sm hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
                    Buy Again <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
