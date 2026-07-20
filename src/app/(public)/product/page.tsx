"use client"

import { useEffect, useState, useMemo } from "react"
import { ProductCard, ProductProps } from "@/components/ProductCard"
import { Search, ChevronDown, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    const fetchJWT = async () => {
      try {
        const res = await fetch("/api/jwt")
        if (res.ok) {
          const data = await res.json()
          if (data.token) {
            localStorage.setItem("aura_jwt", data.token)
          }
        }
      } catch (err) {
        console.error("Failed to fetch JWT", err)
      }
    }
    fetchJWT()

    const fetchProducts = async () => {
      try {
        // Fetch fake products
        const fakeRes = await fetch("https://fakestoreapi.com/products")
        const fakeData = fakeRes.ok ? await fakeRes.json() : []
        
        // Fetch our database products
        let dbData = []
        try {
          const dbRes = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/products")
          if (dbRes.ok) {
            dbData = await dbRes.json()
          }
        } catch (e) {
          console.error("Failed to fetch custom products", e)
        }
        
        // Map our db products to match ProductProps
        const mappedDbData = dbData.map((p: any) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          description: p.description,
          category: p.category,
          image: p.imageUrl,
          rating: { rate: 5.0, count: 0 } // default rating for new products
        }))
        
        setProducts([...mappedDbData, ...fakeData])
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category))
    return ["all", ...Array.from(cats)]
  }, [products])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy, selectedCategory, priceRange])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        (p.title?.toLowerCase().includes(query) || false) || 
        (p.description?.toLowerCase().includes(query) || false) ||
        (p.category?.toLowerCase().includes(query) || false)
      )
    }

    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      if (max) {
        result = result.filter(p => p.price >= min && p.price <= max)
      } else {
        result = result.filter(p => p.price >= min)
      }
    }

    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating_desc") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    }

    return result
  }, [products, searchQuery, sortBy, selectedCategory, priceRange])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage])
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <main className="min-h-screen bg-white pt-12 md:pt-24 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">All Products</h1>
            <p className="text-zinc-500 max-w-2xl text-lg">
              Browse our complete collection of premium artifacts, electronics, and lifestyle products.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap w-full md:w-auto md:justify-end">
            <div className="relative w-full sm:w-auto">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-full sm:w-48 bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 outline-none text-sm transition-all"
              />
            </div>
            
            <div className="relative shrink-0 w-full sm:w-auto">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full bg-white px-4 py-2.5 pr-10 rounded-lg border border-zinc-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative shrink-0 w-full sm:w-auto">
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="appearance-none w-full bg-white px-4 py-2.5 pr-10 rounded-lg border border-zinc-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer"
              >
                <option value="all">Any Price</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-999999">Over $200</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative shrink-0 w-full sm:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-white px-4 py-2.5 pr-10 rounded-lg border border-zinc-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Top Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-violet-100 rounded-full animate-ping opacity-75" />
              <div className="relative bg-white p-5 rounded-full border border-violet-100 shadow-[0_0_40px_rgba(124,58,237,0.15)] z-10 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-violet-600 animate-bounce" />
              </div>
              <div className="absolute w-28 h-28 rounded-full border-t-2 border-l-2 border-violet-500 animate-[spin_2s_linear_infinite]" />
              <div className="absolute w-32 h-32 rounded-full border-b-2 border-r-2 border-fuchsia-500 animate-[spin_3s_linear_infinite_reverse]" />
            </div>
            <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs animate-pulse">
              Curating Artifacts...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-100">
            <p className="text-zinc-500">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-100">
            <p className="text-zinc-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-zinc-900 text-white' 
                          : 'text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
