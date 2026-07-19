"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth-client"
import { ProductCard } from "./ProductCard"
import { Sparkles, Loader2 } from "lucide-react"

export function AIRecommendations() {
  const { data: session } = useSession()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>("")
  const [categories, setCategories] = useState<string[]>([])

  // Fetch categories initially
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/products")
        if (res.ok) {
          const products = await res.json()
          const uniqueCategories = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean))) as string[]
          setCategories(uniqueCategories)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session?.user?.email || null, // track by email or null for anonymous
            filterCategory: filterCategory || null
          })
        })

        if (res.ok) {
          const data = await res.json()
          setRecommendations(data)
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [session?.user?.email, filterCategory])

  if (!loading && recommendations.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-zinc-50 border-y border-zinc-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Recommended for You</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Refine AI suggestions:</span>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            <span className="ml-3 text-zinc-500 font-medium">AI is generating recommendations...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                category={product.category}
                price={product.price}
                image={product.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
