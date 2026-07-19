"use client"

import { useState } from "react"
import { Users, Mail, Phone, MapPin, MoreHorizontal, Search } from "lucide-react"

export function AdminCustomersView() {
  const [customers] = useState([
    { id: "CUS-001", name: "Alice Freeman", email: "alice.f@example.com", phone: "+1 234-567-8900", location: "New York, USA", orders: 12, spent: 1250.00, status: "Active" },
    { id: "CUS-002", name: "David Copper", email: "david.c@example.com", phone: "+1 987-654-3210", location: "London, UK", orders: 5, spent: 450.50, status: "Active" },
    { id: "CUS-003", name: "Sarah Connor", email: "sarah.c@example.com", phone: "+1 555-123-4567", location: "Los Angeles, USA", orders: 1, spent: 45.00, status: "Inactive" },
    { id: "CUS-004", name: "James Bond", email: "james.b@example.com", phone: "+44 007-007-0070", location: "London, UK", orders: 24, spent: 5400.00, status: "VIP" },
    { id: "CUS-005", name: "Bruce Wayne", email: "bruce.w@example.com", phone: "+1 888-888-8888", location: "Gotham, USA", orders: 102, spent: 15600.00, status: "VIP" },
  ])

  const getStatusColor = (status: string) => {
    switch(status) {
      case "VIP": return "bg-amber-100 text-amber-700"
      case "Active": return "bg-emerald-50 text-emerald-600"
      case "Inactive": return "bg-zinc-100 text-zinc-500"
      default: return "bg-zinc-50 text-zinc-600"
    }
  }

  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-500" />
            Customers
          </h1>
          <p className="text-zinc-500 mt-2">Manage customer accounts, purchase history, and details.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                <th className="p-6 font-bold">Contact</th>
                <th className="p-6 font-bold">Location</th>
                <th className="p-6 font-bold">Orders / Spent</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
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
                      <span className="flex items-center gap-1.5 text-xs"><Mail className="w-3.5 h-3.5" /> {customer.email}</span>
                      <span className="flex items-center gap-1.5 text-xs"><Phone className="w-3.5 h-3.5" /> {customer.phone}</span>
                    </div>
                  </td>
                  <td className="p-6 text-zinc-600 text-xs">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {customer.location}</span>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-zinc-900">{customer.orders} orders</p>
                    <p className="text-xs text-zinc-500">${customer.spent.toFixed(2)}</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 rounded-lg transition-colors">
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
