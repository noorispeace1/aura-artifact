"use client"

import { Settings, Save, Store, CreditCard, ShieldCheck } from "lucide-react"

export function VendorSettingsView() {
  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-zinc-700" />
            Store Settings
          </h1>
          <p className="text-zinc-500 mt-2">Manage your vendor profile, payment details, and policies.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">
            <Store className="w-5 h-5" /> Store Details
          </button>
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-transparent hover:bg-zinc-100 text-zinc-600 font-bold transition-colors">
            <CreditCard className="w-5 h-5" /> Payment Info
          </button>
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-transparent hover:bg-zinc-100 text-zinc-600 font-bold transition-colors">
            <ShieldCheck className="w-5 h-5" /> Policies
          </button>
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">Store Information</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Store Name</label>
                <input type="text" defaultValue="Bredar Handicrafts" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Support Email</label>
                <input type="email" defaultValue="support@bredar.com" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Store Description</label>
              <textarea rows={4} defaultValue="We specialize in handcrafted home goods and artifacts from local artisans around the world." className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium resize-none"></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Business Address</label>
              <textarea rows={2} defaultValue="123 Artisan Way, Craftsville, NY 10001" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium resize-none"></textarea>
            </div>

            <div className="flex items-center justify-between p-5 border border-zinc-100 rounded-2xl bg-zinc-50/50">
              <div>
                <h3 className="font-bold text-zinc-900">Vacation Mode</h3>
                <p className="text-sm text-zinc-500">Temporarily hide your products from the store.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
