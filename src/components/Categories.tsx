"use client"

import { motion } from "framer-motion"
import { Sparkles, Palette, MonitorSmartphone, Gem, Home, Watch } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

const categories = [
  { id: 1, title: "Art Pieces",   icon: Palette,          gradient: "from-violet-500 to-purple-600",  bg: "bg-violet-50",  border: "border-violet-200" },
  { id: 2, title: "Home Decor",   icon: Home,             gradient: "from-teal-500 to-emerald-500",   bg: "bg-teal-50",    border: "border-teal-200" },
  { id: 3, title: "Jewelry",      icon: Gem,              gradient: "from-rose-500 to-pink-600",      bg: "bg-rose-50",    border: "border-rose-200" },
  { id: 4, title: "Electronics",  icon: MonitorSmartphone, gradient: "from-blue-500 to-indigo-600",  bg: "bg-blue-50",    border: "border-blue-200" },
  { id: 5, title: "Accessories",  icon: Watch,            gradient: "from-amber-500 to-orange-500",   bg: "bg-amber-50",   border: "border-amber-200" },
  { id: 6, title: "Collectibles", icon: Sparkles,         gradient: "from-fuchsia-500 to-violet-600", bg: "bg-fuchsia-50", border: "border-fuchsia-200" },
]

export function Categories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="text-center mb-14 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 rounded-full">
            Collections
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="max-w-[600px] mx-auto text-zinc-500 md:text-lg">
            Browse our wide selection of premium, curated collections
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`glass-card cursor-pointer rounded-2xl p-6 flex flex-col items-center gap-3 border ${cat.border} hover:shadow-xl transition-shadow group`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-semibold text-sm text-zinc-800">{cat.title}</span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
