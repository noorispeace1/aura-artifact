"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Package, Users, FileText, Percent, Link as LinkIcon, HelpCircle, Settings, Search, Bell, MessageSquare, ChevronDown, MoreHorizontal, UserPlus, User } from "lucide-react"
import { VendorRequestsView } from "@/components/VendorRequestsView"
import { ProfileView } from "@/components/ProfileView"
import { AdminProductsView } from "@/components/AdminProductsView"
import { AdminHelpView } from "@/components/AdminHelpView"
import { AdminOrdersView } from "@/components/AdminOrdersView"
import { AdminCustomersView } from "@/components/AdminCustomersView"
import { AdminReportsView } from "@/components/AdminReportsView"
import { AdminIntegrationsView } from "@/components/AdminIntegrationsView"
import { AdminSettingsView } from "@/components/AdminSettingsView"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")

  useEffect(() => {
    setMounted(true)
    if (session && session.user.role !== "admin") {
      router.push("/")
    }
  }, [session, router])

  if (!mounted) return null
  if (!session || session.user.role !== "admin") return null

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6">
        </div>
        
        <div className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          <button 
            onClick={() => setCurrentView("dashboard")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'dashboard' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setCurrentView("orders")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'orders' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <ShoppingCart className="w-5 h-5" /> Orders
          </button>
          <button 
            onClick={() => setCurrentView("products")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'products' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <Package className="w-5 h-5" /> Products
          </button>
          <button 
            onClick={() => setCurrentView("customers")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'customers' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <Users className="w-5 h-5" /> Customers
          </button>
          <button 
            onClick={() => setCurrentView("vendors")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'vendors' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <UserPlus className="w-5 h-5" /> Vendor Requests
          </button>
          <button 
            onClick={() => setCurrentView("reports")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'reports' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <FileText className="w-5 h-5" /> Reports
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium transition-colors">
            <Percent className="w-5 h-5" /> Discounts
          </button>

          <div className="mt-8 mb-2 px-4">
            <hr className="border-zinc-100" />
          </div>

          <button 
            onClick={() => setCurrentView("integrations")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'integrations' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <LinkIcon className="w-5 h-5" /> Integrations
          </button>
          <button 
            onClick={() => setCurrentView("help")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'help' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <HelpCircle className="w-5 h-5" /> Help
          </button>
          <button 
            onClick={() => setCurrentView("settings")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'settings' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button 
            onClick={() => setCurrentView("profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'profile' ? 'bg-amber-500 text-white' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}
          >
            <User className="w-5 h-5" /> Profile
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-100 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-80">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search stock, order, etc" 
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <button className="hover:text-zinc-900"><MessageSquare className="w-5 h-5" /></button>
              <button className="hover:text-zinc-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {currentView === "dashboard" ? (
          <div className="p-8 flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto w-full">
          {/* Left Column (Main Stats + Charts) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Top Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-amber-100/50 rounded-2xl p-6 border border-amber-200/50 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-amber-900/60 font-medium">Total Sales</p>
                  <div className="bg-amber-500 text-white p-2 rounded-lg">
                    <span className="text-xs font-bold">$</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-amber-950 mb-2">$983,410</h3>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  ↑ 3.34% <span className="text-amber-900/40">vs last week</span>
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-zinc-500 font-medium">Total Orders</p>
                  <div className="text-zinc-400"><ShoppingCart className="w-5 h-5" /></div>
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-2">58,375</h3>
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  ↓ 2.85% <span className="text-zinc-400">vs last week</span>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-zinc-500 font-medium">Total Visitors</p>
                  <div className="text-zinc-400"><Users className="w-5 h-5" /></div>
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-2">237,782</h3>
                <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                  ↑ 8.02% <span className="text-zinc-400">vs last week</span>
                </p>
              </div>
            </div>

            {/* Middle Row (Analytics & Target) */}
            <div className="flex gap-6 h-[340px]">
              <div className="flex-[2] bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Revenue Analytics</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2"><span className="w-3 h-1 bg-amber-500 rounded-full"></span><span className="text-xs font-medium text-zinc-500">Revenue</span></div>
                      <div className="flex items-center gap-2"><span className="w-3 h-1 bg-amber-200 rounded-full border border-amber-300 border-dashed"></span><span className="text-xs font-medium text-zinc-500">Order</span></div>
                    </div>
                  </div>
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                    Last 8 Days <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                {/* CSS Mocked Line Chart */}
                <div className="flex-1 relative flex items-end justify-between pt-8 pb-6">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-6 pointer-events-none">
                    {[16,12,8,4,0].map(v => (
                      <div key={v} className="border-b border-zinc-100 w-full h-0 relative">
                        <span className="absolute -left-6 -top-2 text-xs text-zinc-400">{v}K</span>
                      </div>
                    ))}
                  </div>
                  {/* X axis labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs font-medium text-zinc-400">
                    <span>12 Aug</span><span>13 Aug</span><span>14 Aug</span><span>15 Aug</span><span>16 Aug</span><span>17 Aug</span><span>18 Aug</span><span>19 Aug</span>
                  </div>
                  {/* Mock SVG Line */}
                  <svg className="absolute inset-0 w-full h-[80%] bottom-8" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,60 Q10,50 20,60 T40,50 T60,20 T80,50 T100,40" fill="none" stroke="#F59E0B" strokeWidth="2" />
                    <path d="M0,80 Q10,75 20,85 T40,70 T60,50 T80,75 T100,60" fill="none" stroke="#FCD34D" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="60" cy="20" r="2" fill="white" stroke="#F59E0B" strokeWidth="2" />
                    <rect x="53" y="2" width="14" height="8" rx="2" fill="white" stroke="#F59E0B" strokeWidth="1" />
                    <text x="60" y="8" fontSize="4" fill="#451a03" textAnchor="middle" fontWeight="bold">$14,521</text>
                  </svg>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-900">Monthly Target</h3>
                  <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center relative">
                  {/* CSS Gauge */}
                  <div className="w-48 h-24 overflow-hidden relative mb-2">
                    <div className="w-48 h-48 rounded-full border-[16px] border-amber-100 absolute top-0 left-0"></div>
                    <div className="w-48 h-48 rounded-full border-[16px] border-amber-500 absolute top-0 left-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(-25deg)' }}></div>
                  </div>
                  <div className="absolute top-[40%] flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-zinc-900">85%</h2>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">↑ 8.02% <span className="text-zinc-400">from last month</span></p>
                  </div>
                  <div className="text-center mt-2">
                    <p className="font-bold text-zinc-900">Great Progress! 🎉</p>
                    <p className="text-xs text-zinc-500 mt-1 max-w-[200px] leading-relaxed">Our achievement increased by <span className="text-amber-500 font-bold">$200,000</span>, let's reach 100% next month.</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-500 font-medium mb-1">Target</p>
                    <p className="font-bold text-zinc-900">$600,000</p>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-500 font-medium mb-1">Revenue</p>
                    <p className="font-bold text-zinc-900">$510,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-6">
              <div className="w-1/3 bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Active User</h3>
                    <h2 className="text-3xl font-bold text-zinc-900 mt-2">2,758 <span className="text-xs font-normal text-zinc-400 block mt-1">Users</span></h2>
                  </div>
                  <div className="text-right">
                    <MoreHorizontal className="w-5 h-5 text-zinc-400 ml-auto mb-2" />
                    <p className="text-xs text-green-500 font-medium">↑ 8.02%</p>
                    <p className="text-xs text-zinc-400">from last month</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { country: "United States", pct: "36%", val: 36, color: "bg-amber-200" },
                    { country: "United Kingdom", pct: "24%", val: 24, color: "bg-amber-400" },
                    { country: "Indonesia", pct: "17.5%", val: 17.5, color: "bg-amber-600" },
                    { country: "Russia", pct: "15%", val: 15, color: "bg-amber-500" },
                  ].map(c => (
                    <div key={c.country}>
                      <div className="flex justify-between text-sm font-medium text-zinc-600 mb-1">
                        <span>{c.country}</span><span>{c.pct}</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c.color} rounded-full`} style={{ width: c.pct }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-[2] bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-zinc-900">Conversion Rate</h3>
                  <button className="bg-amber-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    This Week <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-end justify-between h-40 gap-2">
                  {[
                    { label: "Product\nViews", val: "25,000", pct: "↑ 5%", h: "90%", c: "bg-amber-100" },
                    { label: "Add to\nCart", val: "12,000", pct: "↑ 6%", h: "60%", c: "bg-amber-200" },
                    { label: "Proceed to\nCheckout", val: "8,500", pct: "↑ 4%", h: "45%", c: "bg-amber-300" },
                    { label: "Completed\nPurchases", val: "6,200", pct: "↑ 7%", h: "35%", c: "bg-amber-400" },
                    { label: "Abandoned\nCarts", val: "3,000", pct: "↓ -5%", h: "15%", c: "bg-amber-500", pctColor: "text-red-500" },
                  ].map(col => (
                    <div key={col.label} className="flex-1 flex flex-col group">
                      <div className="mb-2">
                        <p className="text-xs text-zinc-500 font-medium whitespace-pre-line leading-tight h-8">{col.label}</p>
                        <p className="font-bold text-zinc-900 text-lg mt-1">{col.val}</p>
                        <p className={`text-xs font-bold ${col.pctColor || 'text-green-500'}`}>{col.pct}</p>
                      </div>
                      <div className="h-24 flex items-end">
                        <div className={`w-full ${col.c} rounded-t-md transition-all group-hover:opacity-80`} style={{ height: col.h }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Top Categories & Traffic) */}
          <div className="w-[320px] flex flex-col gap-6 shrink-0">
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900">Top Categories</h3>
                <span className="text-sm font-medium text-zinc-400 cursor-pointer">See All</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                {/* CSS Donut Chart */}
                <div className="w-48 h-48 rounded-full border-[16px] border-amber-100 relative">
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-amber-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 60%)' }}></div>
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-amber-300" style={{ clipPath: 'polygon(50% 50%, 0 60%, 0 0, 50% 0)' }}></div>
                </div>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-medium text-zinc-400">Total Sales</span>
                  <span className="text-2xl font-bold text-zinc-900">$3,400,000</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { n: "Electronics", v: "$1,200,000", c: "bg-amber-500" },
                  { n: "Fashion", v: "$950,000", c: "bg-amber-300" },
                  { n: "Home & Kitchen", v: "$750,000", c: "bg-amber-100" },
                  { n: "Beauty & Personal Care", v: "$500,000", c: "bg-zinc-100" },
                ].map(item => (
                  <div key={item.n} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-sm ${item.c}`}></span>
                      <span className="font-medium text-zinc-600">{item.n}</span>
                    </div>
                    <span className="font-bold text-zinc-900">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-zinc-900">Traffic Sources</h3>
                <MoreHorizontal className="w-5 h-5 text-zinc-400" />
              </div>
              
              <div className="h-8 w-full flex rounded-lg overflow-hidden mb-8 gap-0.5">
                <div className="bg-amber-100 h-full w-[40%]"></div>
                <div className="bg-amber-300 h-full w-[30%]"></div>
                <div className="bg-amber-400 h-full w-[15%]"></div>
                <div className="bg-amber-500 h-full w-[10%]"></div>
                <div className="bg-amber-600 h-full w-[5%]"></div>
              </div>

              <div className="space-y-4">
                {[
                  { n: "Direct Traffic", v: "40%", c: "bg-amber-100" },
                  { n: "Organic Search", v: "30%", c: "bg-amber-300" },
                  { n: "Social Media", v: "15%", c: "bg-amber-400" },
                  { n: "Referral Traffic", v: "10%", c: "bg-amber-500" },
                  { n: "Email Campaigns", v: "5%", c: "bg-amber-600" },
                ].map(item => (
                  <div key={item.n} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-sm ${item.c}`}></span>
                      <span className="font-medium text-zinc-600">{item.n}</span>
                    </div>
                    <span className="font-bold text-zinc-900">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        ) : currentView === "vendors" ? (
          <VendorRequestsView />
        ) : currentView === "products" ? (
          <AdminProductsView />
        ) : currentView === "orders" ? (
          <AdminOrdersView />
        ) : currentView === "customers" ? (
          <AdminCustomersView />
        ) : currentView === "reports" ? (
          <AdminReportsView />
        ) : currentView === "integrations" ? (
          <AdminIntegrationsView />
        ) : currentView === "settings" ? (
          <AdminSettingsView />
        ) : currentView === "help" ? (
          <AdminHelpView />
        ) : currentView === "profile" ? (
          <ProfileView />
        ) : null}
      </main>
    </div>
  )
}
