"use client"

import { BarChart3, TrendingUp, Package, Eye, ArrowUpRight } from "lucide-react"

export function VendorProductAnalyticsView() {
  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            Product Analytics
          </h1>
          <p className="text-zinc-500 mt-2">Track the performance of your store's products.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 font-bold">Total Product Views</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-zinc-900 mb-2">124.5K</p>
            <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +14.2% from last week
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 font-bold">Items Sold</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-zinc-900 mb-2">3,492</p>
            <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +8.1% from last week
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <h3 className="text-zinc-500 font-bold">Conversion Rate</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-zinc-900 mb-2">2.8%</p>
            <p className="text-rose-500 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4 rotate-180" /> -0.2% from last week
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
        <h3 className="text-xl font-bold text-zinc-900 mb-6">Top Performing Products</h3>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">Views</th>
                <th className="p-4 font-bold">Sales</th>
                <th className="p-4 font-bold">Revenue</th>
                <th className="p-4 font-bold">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {[
                { name: "Handcrafted Ceramic Vase", views: "12,450", sales: "840", rev: "$25,200", conv: "6.7%" },
                { name: "Vintage Leather Wallet", views: "9,820", sales: "612", rev: "$18,360", conv: "6.2%" },
                { name: "Minimalist Desk Lamp", views: "15,200", sales: "590", rev: "$29,500", conv: "3.8%" },
                { name: "Organic Cotton T-Shirt", views: "22,100", sales: "1,204", rev: "$36,120", conv: "5.4%" },
                { name: "Bamboo Matcha Whisk", views: "5,430", sales: "210", rev: "$4,200", conv: "3.8%" },
              ].map((prod, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 font-bold text-zinc-900">{prod.name}</td>
                  <td className="p-4 text-zinc-600 font-medium">{prod.views}</td>
                  <td className="p-4 text-zinc-600 font-medium">{prod.sales}</td>
                  <td className="p-4 text-emerald-600 font-bold">{prod.rev}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-600">
                      {prod.conv}
                    </span>
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
