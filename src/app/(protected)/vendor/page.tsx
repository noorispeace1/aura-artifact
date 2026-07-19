"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Store, MessageSquare, Settings, Search, Plus, Bell, MoreHorizontal, ChevronDown, BarChart3, Tag, User, Sparkles } from "lucide-react"
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts"
import { AddProductView } from "@/components/AddProductView"
import { VendorStoreView } from "@/components/VendorStoreView"
import { MessagesView } from "@/components/MessagesView"
import { ProfileView } from "@/components/ProfileView"
import { AIContentGeneratorView } from "@/components/AIContentGeneratorView"
import { VendorProductAnalyticsView } from "@/components/VendorProductAnalyticsView"
import { VendorCustomersView } from "@/components/VendorCustomersView"
import { VendorSettingsView } from "@/components/VendorSettingsView"

export default function VendorDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")

  useEffect(() => {
    setMounted(true)
    if (session && session.user.role !== "vendor") {
      router.push("/")
    }
  }, [session, router])

  if (!mounted) return null
  if (!session || session.user.role !== "vendor") return null

  // Radial Bar Data
  const genderData = [
    { name: 'Male', value: 30, fill: '#60A5FA' }, // Light blue
    { name: 'Female', value: 65, fill: '#FFFFFF' }, // White
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 flex flex-col shrink-0">
        <div className="h-24 flex items-center px-8 border-b border-transparent">
        </div>
        
        <div className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          <button 
            onClick={() => setCurrentView("dashboard")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'dashboard' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setCurrentView("analytics")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'analytics' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <BarChart3 className="w-5 h-5" /> Product Analytics
          </button>
          <button 
            onClick={() => setCurrentView("customers")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'customers' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <Users className="w-5 h-5" /> Customers
          </button>
          <button 
            onClick={() => setCurrentView("store")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'store' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <Store className="w-5 h-5" /> Store
          </button>
          <button 
            onClick={() => setCurrentView("messages")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'messages' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
          <button 
            onClick={() => setCurrentView("aiTools")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'aiTools' ? 'bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <Sparkles className="w-5 h-5" /> AI Tools
          </button>
          <button 
            onClick={() => setCurrentView("settings")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'settings' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button 
            onClick={() => setCurrentView("profile")}
            className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${currentView === 'profile' ? 'bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'}`}
          >
            <User className="w-5 h-5" /> Profile
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <header className="h-24 bg-[#F9FAFB] flex items-center justify-between px-10 shrink-0">
          <div className="flex-1 max-w-2xl">
          </div>
          <div className="flex items-center gap-6 ml-8">
            <button 
              onClick={() => setCurrentView("addProduct")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Plus className="w-5 h-5" /> Add product
            </button>
            <div 
              onClick={() => setCurrentView("messages")}
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
            >
              <MessageSquare className="w-6 h-6 text-zinc-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentView === "dashboard" ? (
          <div className="p-10 max-w-[1400px] w-full">
            <h1 className="text-3xl font-bold text-zinc-900 mb-8">Dashboard</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Top Left: Map Widget */}
            <div className="flex-[2] bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm relative flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-zinc-900">Top countries</h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  Latest 7 days <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 relative w-full h-full flex items-center justify-center bg-zinc-50/50 rounded-2xl overflow-hidden mt-2">
                 {/* Mock Map Background SVG */}
                 <svg className="w-full h-full opacity-60" viewBox="0 0 1000 500" fill="none" stroke="#CBD5E1" strokeWidth="1">
                    <path d="M150,150 Q200,100 250,120 T350,150 T450,120 T550,150 T650,120 T750,150 T850,120" fill="#E2E8F0" />
                    <path d="M200,200 Q250,150 300,180 T400,220 T500,200 T600,250 T700,200 T800,250" fill="#DBEAFE" stroke="#3B82F6"/>
                    <path d="M400,300 Q450,250 500,280 T600,320 T700,300 T800,350" fill="#BFDBFE" stroke="#2563EB"/>
                 </svg>
                 
                 {/* Tooltip Overlay */}
                 <div className="absolute top-[40%] left-[55%] bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 animate-in fade-in zoom-in duration-300">
                    <p className="text-xs font-semibold text-zinc-500 mb-1">Sudan</p>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                      <span className="font-bold text-zinc-900">$1,688,908.13</span>
                    </div>
                 </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-10 right-10 flex gap-4 text-xs font-medium text-zinc-500">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-500"></span> Top 1</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-300"></span> Top 2</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-200"></span> Top 3</div>
              </div>
            </div>

            {/* Top Right: New Publish Widget */}
            <div className="flex-1 bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
              <div className="h-48 bg-zinc-200 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=800&auto=format&fit=crop" alt="Product" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-200"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-200"></span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm font-semibold text-zinc-500 mb-2">New publish</p>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Strike a yogi pose</h3>
                <p className="text-sm text-zinc-500 line-clamp-2 flex-1">Get fit with Pocket Yoga's custom routines and poses.</p>
                <button className="w-fit px-5 py-2.5 mt-4 border border-zinc-200 rounded-xl font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors">
                  View product
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Bottom Left: Sale By Gender (Recharts) */}
            <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 shadow-md relative h-[380px] overflow-hidden flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-white absolute top-8 left-8">Sale By Gender</h3>
              
              <div className="w-full h-[250px] relative mt-12">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    cx="50%" 
                    cy="70%" 
                    innerRadius="70%" 
                    outerRadius="120%" 
                    barSize={20} 
                    data={genderData} 
                    startAngle={180} 
                    endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                      dataKey="value"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <p className="text-white/80 font-medium mb-1">Total</p>
                  <p className="text-4xl font-bold text-white">92,126</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600 to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Right: New Orders */}
            <div className="flex-[2] bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 h-[380px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-zinc-900">New orders</h3>
                <button className="px-4 py-2 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
                  View all
                </button>
              </div>
              
              <div className="flex-1 overflow-auto pr-2">
                <table className="w-full text-left text-sm">
                  <thead className="text-zinc-500 sticky top-0 bg-white z-10">
                    <tr>
                      <th className="pb-4 font-semibold font-sans">Customers</th>
                      <th className="pb-4 font-semibold font-sans">Order</th>
                      <th className="pb-4 font-semibold font-sans">State</th>
                      <th className="pb-4 font-semibold font-sans">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    <tr className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="https://i.pravatar.cc/150?u=1" alt="Dianne Russell" className="w-10 h-10 rounded-full object-cover border border-zinc-100" />
                          <span className="font-bold text-zinc-900">Dianne Russell</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-zinc-900">$14.88</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                          <span className="font-semibold text-zinc-900">Chargeback</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-zinc-900">16 Sep 2024</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/50 transition-colors group bg-zinc-50/30 rounded-xl">
                      <td className="py-4 rounded-l-2xl pl-2">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="https://i.pravatar.cc/150?u=2" alt="Bessie Cooper" className="w-10 h-10 rounded-full object-cover border border-zinc-100" />
                          <span className="font-bold text-zinc-900">Bessie Cooper</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-zinc-900">$14.88</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span className="font-semibold text-zinc-900">Completed</span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-zinc-900 rounded-r-2xl pr-2">16 Sep 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        ) : currentView === "addProduct" ? (
          <AddProductView onBack={() => setCurrentView("store")} />
        ) : currentView === "store" ? (
          <VendorStoreView onAddProduct={() => setCurrentView("addProduct")} />
        ) : currentView === "analytics" ? (
          <VendorProductAnalyticsView />
        ) : currentView === "customers" ? (
          <VendorCustomersView />
        ) : currentView === "settings" ? (
          <VendorSettingsView />
        ) : currentView === "messages" ? (
          <MessagesView />
        ) : currentView === "aiTools" ? (
          <AIContentGeneratorView />
        ) : currentView === "profile" ? (
          <ProfileView />
        ) : null}
      </main>
    </div>
  )
}
