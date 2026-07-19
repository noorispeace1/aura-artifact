"use client"

import { useState } from "react"
import { Users, Mail, MapPin, MoreHorizontal, Search, Star } from "lucide-react"

export function VendorCustomersView() {
  const [customers] = useState([
    { id: "CUS-V01", name: "Elena Gilbert", email: "elena.g@example.com", location: "Mystic Falls, VA", orders: 4, spent: 340.50, rating: 5 },
    { id: "CUS-V02", name: "Stefan Salvatore", email: "stefan.s@example.com", location: "Mystic Falls, VA", orders: 2, spent: 150.00, rating: 4 },
    { id: "CUS-V03", name: "Damon Salvatore", email: "damon.s@example.com", location: "Mystic Falls, VA", orders: 12, spent: 1250.00, rating: 5 },
    { id: "CUS-V04", name: "Caroline Forbes", email: "caroline.f@example.com", location: "Whitmore, VA", orders: 7, spent: 890.75, rating: 5 },
    { id: "CUS-V05", name: "Bonnie Bennett", email: "bonnie.b@example.com", location: "Mystic Falls, VA", orders: 1, spent: 45.00, rating: 3 },
  ])

  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            My Customers
          </h1>
          <p className="text-zinc-500 mt-2">Manage customers who have purchased from your store.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search your customers..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-6 font-bold w-[300px]">Customer</th>
                <th className="p-6 font-bold">Contact & Location</th>
                <th className="p-6 font-bold">Store Activity</th>
                <th className="p-6 font-bold">Avg Rating</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{customer.name}</p>
                        <p className="text-xs text-zinc-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1 text-zinc-600">
                      <span className="flex items-center gap-1.5 text-xs font-medium"><Mail className="w-3.5 h-3.5 text-zinc-400" /> {customer.email}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium"><MapPin className="w-3.5 h-3.5 text-zinc-400" /> {customer.location}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-zinc-900">{customer.orders} orders</p>
                    <p className="text-xs text-emerald-600 font-bold">${customer.spent.toFixed(2)} spent</p>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= customer.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-zinc-400 hover:text-blue-600 rounded-lg transition-colors bg-white border border-transparent hover:border-blue-100 hover:bg-blue-50 shadow-sm">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
