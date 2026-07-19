"use client"

import { useState } from "react"
import { ShoppingCart, Eye, Trash2, Search, Filter } from "lucide-react"

export function AdminOrdersView() {
  const [orders] = useState([
    { id: "ORD-9231", customer: "John Doe", date: "2026-07-18", status: "Delivered", total: 129.99 },
    { id: "ORD-9232", customer: "Jane Smith", date: "2026-07-17", status: "Processing", total: 45.50 },
    { id: "ORD-9233", customer: "Michael Johnson", date: "2026-07-16", status: "Shipped", total: 399.00 },
    { id: "ORD-9234", customer: "Emily Davis", date: "2026-07-15", status: "Cancelled", total: 89.00 },
    { id: "ORD-9235", customer: "William Brown", date: "2026-07-14", status: "Delivered", total: 215.75 },
    { id: "ORD-9236", customer: "Olivia Wilson", date: "2026-07-14", status: "Processing", total: 65.00 },
  ])

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-200"
      case "Processing": return "bg-amber-50 text-amber-600 border-amber-200"
      case "Shipped": return "bg-blue-50 text-blue-600 border-blue-200"
      case "Cancelled": return "bg-red-50 text-red-600 border-red-200"
      default: return "bg-zinc-50 text-zinc-600 border-zinc-200"
    }
  }

  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-amber-500" />
            Orders Management
          </h1>
          <p className="text-zinc-500 mt-2">View and manage all customer orders.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <button className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-zinc-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-6 font-bold">Order ID</th>
                <th className="p-6 font-bold">Customer</th>
                <th className="p-6 font-bold">Date</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold">Total</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="p-6 font-bold text-zinc-900">{order.id}</td>
                  <td className="p-6 text-zinc-700 font-medium">{order.customer}</td>
                  <td className="p-6 text-zinc-500">{order.date}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-zinc-900">${order.total.toFixed(2)}</td>
                  <td className="p-6">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Order">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
