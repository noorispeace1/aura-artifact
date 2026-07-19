"use client"

import React from "react"
import { 
  Home, ShoppingCart, Bookmark, Package, Settings, 
  Search, Bell, Mail, ChevronRight
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useShop } from "@/context/ShopContext"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { cart, favorites } = useShop()

  return (
    <div className="flex h-[calc(100vh-80px)] bg-zinc-50 text-zinc-900 overflow-hidden font-sans w-full">
      {/* 1. Mini Sidebar (Far Left) */}
      <div className="w-20 border-r border-violet-100 flex flex-col items-center py-6 hidden md:flex shrink-0 z-20 bg-white/80 backdrop-blur-xl">
        {/* IA Logo Removed as requested */}
        <nav className="flex flex-col gap-4 w-full px-3 mt-4">
          {[
            { id: "home", href: "/dashboard", icon: Home, label: "Home" },
            { id: "cart", href: "/dashboard/cart", icon: ShoppingCart, label: "Cart", badge: cart.length > 0 ? cart.length : null },
            { id: "favorites", href: "/dashboard/favorites", icon: Bookmark, label: "Favorites", badge: favorites.length > 0 ? favorites.length : null },
            { id: "orders", href: "/dashboard/orders", icon: Package, label: "Orders" },
            { id: "settings", href: "/dashboard/settings", icon: Settings, label: "Settings" },
          ].map((item, i) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={i}
                href={item.href}
                title={item.label}
                className={`w-full py-3 flex justify-center rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "bg-violet-50 text-violet-700 shadow-sm shadow-violet-100/50 scale-105 border border-violet-100/50" 
                    : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive && item.id === "favorites" ? "fill-violet-600" : ""}`} />
                {item.badge && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <button className="mt-auto p-3 text-zinc-400 hover:text-violet-600 transition-colors">
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-200 hover:scale-105 transition-all">
            <span className="text-xs">🌓</span>
          </div>
        </button>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-violet-100 flex items-center px-6 justify-between bg-white/80 backdrop-blur-xl z-20 shrink-0">
          <div className="flex-1 max-w-2xl flex items-center gap-4">
            <button className="md:hidden text-zinc-400"><ChevronRight /></button>
            <div className="relative w-full group">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="w-full bg-zinc-50/50 border border-zinc-100 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 outline-none text-sm transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-zinc-400 hover:text-violet-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-sm animate-pulse"></span>
            </button>
            <button className="relative p-2 text-zinc-400 hover:text-violet-600 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            {/* User Profile Dropdown Removed as requested */}
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden bg-zinc-50/50">
          {children}
        </div>
      </div>
    </div>
  )
}
