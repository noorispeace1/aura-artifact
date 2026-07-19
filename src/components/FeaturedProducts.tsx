"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ProductCard, ProductProps } from "./ProductCard"
import { ScrollReveal } from "./ScrollReveal"
import { Search, ChevronDown, ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products?limit=8")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setProducts(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load featured products. Please try again later.")
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (sortBy === "price_asc")   result.sort((a, b) => a.price - b.price)
    if (sortBy === "price_desc")  result.sort((a, b) => b.price - a.price)
    if (sortBy === "rating_desc") result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    return result
  }, [products, searchQuery, sortBy])

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">

        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-violet-600 bg-violet-50 border border-violet-200 rounded-full">
              Featured
            </span>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-900">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-zinc-500 md:text-lg">
              Handpicked top-tier products designed for the modern lifestyle.
            </p>
          </div>
          <Link
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-800 whitespace-nowrap transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* Filter / Sort bar */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-between items-center glass-card p-4 rounded-2xl border border-violet-100">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search featured products..."
                className="w-full bg-white/80 border border-violet-200 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none text-sm transition-all placeholder:text-zinc-400"
              />
            </div>
            <div className="relative w-full sm:w-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-48 bg-white/80 px-4 py-2.5 pr-10 rounded-xl border border-violet-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-violet-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="skeleton-shimmer aspect-square rounded-2xl mb-4 w-full" />
                <div className="skeleton-shimmer h-3 rounded w-1/3 mb-2" />
                <div className="skeleton-shimmer h-4 rounded w-3/4 mb-4" />
                <div className="skeleton-shimmer h-4 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-zinc-500">
            <p>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl border border-violet-100">
            <p className="text-zinc-500">No featured products found matching your search.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden:  { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
