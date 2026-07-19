"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")

  return (
    <div className="min-h-[70vh] bg-[#FDFCFB] flex flex-col items-center justify-center py-32 px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
          Track Your Order
        </h1>
        <p className="text-zinc-500 mb-12">
          Enter your order number to see the current status of your artifact.
        </p>
        
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-32 py-4 border border-zinc-200 rounded-2xl leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all text-zinc-900"
            placeholder="e.g. ORD-12345"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <button 
            className="absolute inset-y-2 right-2 px-6 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Track
          </button>
        </div>
      </div>
    </div>
  )
}
