"use client"

import { Settings, Save, Shield, Bell, Globe } from "lucide-react"

export function AdminSettingsView() {
  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-zinc-700" />
            Platform Settings
          </h1>
          <p className="text-zinc-500 mt-2">Manage global configurations and preferences.</p>
        </div>
        <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 text-white font-bold shadow-md shadow-zinc-200">
            <Globe className="w-5 h-5" /> General Details
          </button>
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-transparent hover:bg-zinc-100 text-zinc-600 font-bold transition-colors">
            <Shield className="w-5 h-5" /> Security & Privacy
          </button>
          <button className="flex items-center gap-3 p-4 rounded-2xl bg-transparent hover:bg-zinc-100 text-zinc-600 font-bold transition-colors">
            <Bell className="w-5 h-5" /> Notifications
          </button>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">General Information</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Platform Name</label>
                <input type="text" defaultValue="Aura & Artifact" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Support Email</label>
                <input type="email" defaultValue="support@aura-artifact.com" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Platform Description</label>
              <textarea rows={4} defaultValue="Premium e-commerce platform for handcrafted artifacts." className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium resize-none"></textarea>
            </div>

            <div className="flex items-center justify-between p-5 border border-zinc-100 rounded-2xl bg-zinc-50/50">
              <div>
                <h3 className="font-bold text-zinc-900">Maintenance Mode</h3>
                <p className="text-sm text-zinc-500">Temporarily disable the platform for updates.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
