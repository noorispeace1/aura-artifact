"use client"

import React, { useState, useEffect, useMemo } from "react"
import { 
  Home, ShoppingCart, Bookmark, Package, Settings, 
  Search, Bell, Mail, ChevronDown, ChevronRight, 
  Star, ShoppingBag, Heart
} from "lucide-react"
import { useRouter } from "next/navigation"
import { AIRecommendations } from "./AIRecommendations"

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

type EnrichedProduct = Product & {
  color: string
  size: string
}

const CATEGORIES = ["All", "Men's", "Women's", "Jewelry", "Electronics", "Sneakers"]
const COLORS = ["#d1d5db", "#000000", "#ef4444", "#3b82f6", "#10b981", "#eab308"]
const SIZES = ["US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5"]
const PRICE_RANGES = ["$0 - 100", "$100 - 200", "$200 - 300", "$300 - 400", "Over $400"]

export function DashboardShopLayout() {
  const router = useRouter()
  const [products, setProducts] = useState<EnrichedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null)
  
  // Filter states
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("New Arrival")
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  
  const [activeSidebar, setActiveSidebar] = useState("home")
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard_favorites")
      if (saved) return JSON.parse(saved)
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard_favorites", JSON.stringify(favorites))
    }
  }, [favorites])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const enriched = data.map(p => ({
          ...p,
          color: COLORS[p.id % COLORS.length],
          size: SIZES[p.id % SIZES.length]
        }))
        setProducts(enriched)
        if (enriched.length > 0) setSelectedProduct(enriched[0])
        setLoading(false)
      })
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // Sidebar Favorites filter
      if (activeSidebar === "favorites" && !favorites.includes(p.id)) {
        return false
      }

      // Category Filter
      if (activeCategory !== "All") {
        if (activeCategory === "Men's" && p.category !== "men's clothing") return false
        if (activeCategory === "Women's" && p.category !== "women's clothing") return false
        if (activeCategory === "Jewelry" && p.category !== "jewelery") return false
        if (activeCategory === "Electronics" && p.category !== "electronics") return false
        if (activeCategory === "Sneakers") return false // Mock: no actual sneakers in fakestore
      }
      
      // Color Filter
      if (activeColor && p.color !== activeColor) return false
      
      // Price Range Filter
      if (priceRange) {
        if (priceRange === "$0 - 100" && p.price > 100) return false
        if (priceRange === "$100 - 200" && (p.price <= 100 || p.price > 200)) return false
        if (priceRange === "$200 - 300" && (p.price <= 200 || p.price > 300)) return false
        if (priceRange === "$300 - 400" && (p.price <= 300 || p.price > 400)) return false
        if (priceRange === "Over $400" && p.price <= 400) return false
      }
      
      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        if (!p.title.toLowerCase().includes(query) && !p.description.toLowerCase().includes(query)) {
          return false
        }
      }
      
      return true
    })

    // Sort Logic
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating_desc") {
      result.sort((a, b) => b.rating.rate - a.rating.rate)
    }

    return result
  }, [products, activeCategory, activeColor, priceRange, searchQuery, sortBy])

  return (
    <div className="flex h-[calc(100vh-80px)] bg-zinc-50 text-zinc-900 overflow-hidden font-sans w-full">
      {/* 1. Mini Sidebar (Far Left) */}
      <div className="w-20 border-r border-violet-100 flex flex-col items-center py-6 hidden md:flex shrink-0 z-20 bg-white/80 backdrop-blur-xl">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-200 text-white rounded-xl flex items-center justify-center mb-8 font-bold text-xs">
          IA
        </div>
        <nav className="flex flex-col gap-4 w-full px-3">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "cart", icon: ShoppingCart, label: "Cart" },
            { id: "favorites", icon: Bookmark, label: "Favorites" },
            { id: "orders", icon: Package, label: "Orders" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveSidebar(item.id)}
              title={item.label}
              className={`w-full py-3 flex justify-center rounded-xl transition-all duration-300 ${
                activeSidebar === item.id 
                  ? "bg-violet-50 text-violet-700 shadow-sm shadow-violet-100/50 scale-105 border border-violet-100/50" 
                  : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeSidebar === item.id && item.id === "favorites" ? "fill-violet-600" : ""}`} />
            </button>
          ))}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="flex items-center gap-3 pl-4 border-l border-violet-100 ml-2">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-200 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm shadow-sm">
                GS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-tight text-zinc-900">Gabriella Shiaan</p>
                <p className="text-xs text-zinc-500 leading-tight">@gabriellashiaan</p>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 ml-2 cursor-pointer hover:text-violet-600" />
            </div>
          </div>
        </header>

        {/* 3-Column Internal Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Column A: Filters Sidebar */}
          <div className="w-64 border-r border-violet-50 p-6 overflow-y-auto hidden lg:block shrink-0 bg-white/50 backdrop-blur-md">
            <div className="mb-8">
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Category</h3>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm w-full text-left flex items-center justify-between transition-colors ${activeCategory === cat ? 'font-bold text-violet-700 bg-violet-50/50 py-1 px-2 -ml-2 rounded-lg' : 'text-zinc-500 hover:text-violet-600'}`}
                    >
                      {cat}
                      {cat === "Sneakers" && <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm shadow-red-200">50% off</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">Filter by</h3>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price</h4>
                <div className="space-y-2 text-sm text-zinc-600">
                  {PRICE_RANGES.map((range, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer hover:text-zinc-900">
                      <input 
                        type="checkbox" 
                        checked={priceRange === range}
                        onChange={() => setPriceRange(priceRange === range ? null : range)}
                        className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" 
                      />
                      {range}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Color</h4>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveColor(activeColor === color ? null : color)}
                      className={`w-6 h-6 rounded-full border-2 ${activeColor === color ? 'border-blue-500' : 'border-transparent'} ring-1 ring-zinc-200`} 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Size</h4>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Brand</h4>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setActiveCategory("All"); setPriceRange(null); setActiveColor(null); }}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 hover:-translate-y-0.5"
            >
              Clear Filters
            </button>
          </div>

          {/* Column B: Product Grid */}
          <div className="flex-1 flex flex-col bg-zinc-50/50 overflow-hidden relative">
            <div className="p-6 pb-2 shrink-0 flex items-center justify-between bg-zinc-50/50 z-10 backdrop-blur-sm">
              <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {activeSidebar !== "favorites" && ["New Arrival", "Trendy", "Popular", "Recommend"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab 
                        ? 'font-bold text-violet-700 border-b-2 border-violet-700' 
                        : 'text-zinc-500 hover:text-violet-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative hidden sm:block shrink-0 ml-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg border border-zinc-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="default">Sort by</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Top Rated</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="p-6 pt-2 shrink-0">
              <h2 className="text-xl font-bold">{activeSidebar === "favorites" ? "Your Favorites" : activeTab}</h2>
              <p className="text-sm text-zinc-500">{activeSidebar === "favorites" ? "Items you have saved" : "Step Into Style - Fresh Finds Just Landed!"}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-0">
              {activeSidebar !== "favorites" && activeTab === "Recommend" ? (
                <AIRecommendations />
              ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 h-[340px] animate-pulse">
                      <div className="w-full h-40 bg-zinc-100 rounded-xl mb-4"></div>
                      <div className="w-3/4 h-4 bg-zinc-100 mb-2"></div>
                      <div className="w-1/2 h-4 bg-zinc-100 mb-4"></div>
                      <div className="w-full h-10 bg-zinc-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-500">
                  No products found for the selected filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`group bg-white rounded-3xl p-4 border transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100 ${
                        selectedProduct?.id === product.id ? 'border-violet-500 shadow-md shadow-violet-100 ring-2 ring-violet-500/20' : 'border-zinc-100'
                      }`}
                    >
                      <div className="relative w-full aspect-[4/3] bg-zinc-50/50 rounded-2xl mb-4 flex items-center justify-center p-4 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                        />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 z-10 hover:scale-110 ${favorites.includes(product.id) ? 'bg-violet-50' : 'bg-white/80 backdrop-blur-sm'}`}
                        >
                          <Heart className={`w-4 h-4 transition-colors ${favorites.includes(product.id) ? 'fill-violet-600 text-violet-600 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]' : 'text-zinc-400 hover:text-violet-500'}`} />
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-sm line-clamp-1 mb-1 text-zinc-900 group-hover:text-violet-700 transition-colors" title={product.title}>{product.title}</h3>
                        <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
                          <span>Sold: {Math.floor(Math.random() * 200)}pcs</span>
                          <span className="bg-zinc-100 px-2 py-0.5 rounded-full font-medium">Avail: {Math.floor(product.rating.count)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-500 mb-4">
                          <div className="flex gap-1 items-center">
                            Color <span className="w-2.5 h-2.5 rounded-full inline-block ml-1 shadow-sm border border-zinc-200" style={{ backgroundColor: product.color }}></span>
                          </div>
                          <div className="flex gap-1 items-center bg-zinc-50 px-2 py-1 rounded-md">
                            Size <span className="font-bold text-zinc-900 ml-1">{product.size}</span>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100/80">
                          <div>
                            <p className="font-black text-lg text-zinc-900">${product.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/product/${product.id}`)
                            }}
                            className="bg-zinc-900 hover:bg-violet-600 text-white p-2.5 px-4 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-md shadow-zinc-200 hover:shadow-violet-200 hover:-translate-y-0.5"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden lg:inline">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column C: Detail Product (Right Sidebar) */}
          <div className="w-[380px] border-l border-zinc-100 bg-white overflow-y-auto hidden xl:block shrink-0">
            {selectedProduct ? (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-1">Detail Product</h2>
                  <p className="text-sm text-zinc-500 capitalize">{selectedProduct.category}</p>
                </div>

                <div className="w-full aspect-square bg-zinc-50 rounded-2xl mb-4 flex items-center justify-center p-8 border border-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                </div>

                <div className="flex gap-2 mb-6">
                  {[selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image].map((img, i) => (
                    <div key={i} className={`w-1/4 aspect-square bg-zinc-50 rounded-xl flex items-center justify-center p-2 border ${i === 0 ? 'border-blue-500' : 'border-zinc-200'}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="thumbnail" className="max-h-full object-contain opacity-70 hover:opacity-100" />
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3">{selectedProduct.title}</h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">Sale</span>
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-md">Top Rated</span>
                  <div className="ml-auto flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{selectedProduct.rating.rate}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-zinc-900 uppercase">Color:</span>
                    <span className="text-zinc-500">Available</span>
                  </div>
                  <div className="flex gap-2">
                     {["#d1d5db", "#000000", "#ef4444"].map((color, i) => (
                      <button key={i} className={`w-8 h-8 rounded-full border-2 ${i === 0 ? 'border-blue-500' : 'border-transparent'} ring-1 ring-zinc-200`} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold text-zinc-900 uppercase">Size: <span className="font-normal text-zinc-500">US 8 (Only One Left)</span></span>
                    <button className="text-zinc-500 underline text-xs">Size Chart</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((size) => (
                      <button 
                        key={size}
                        className={`py-2 text-xs font-medium rounded-md border ${
                          size === "US 8" 
                            ? 'bg-zinc-900 text-white border-zinc-900' 
                            : size === "US 6.5" ? 'bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed' : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {size.replace('US ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">Total Price</p>
                    <p className="text-3xl font-bold">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-3 mb-8">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-200">
                    <ShoppingBag className="w-4 h-4" />
                    Add to cart
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className="flex-1 bg-white hover:bg-zinc-50 text-blue-600 border border-blue-200 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                    {favorites.includes(selectedProduct.id) ? 'Remove wishlist' : 'Add to wishlist'}
                  </button>
                </div>

                <div className="space-y-4 border-t border-zinc-100 pt-6">
                  {[
                    { title: "DETAILS:", content: selectedProduct.description },
                    { title: "REVIEWS:", content: `${selectedProduct.rating.count} customer reviews.` },
                    { title: "SHIPPING & RETURN:", content: "Free shipping on orders over $50. Return within 30 days." },
                    { title: "CARE INSTRUCTIONS:", content: "Handle with care. Follow manufacturer guidelines." }
                  ].map((accordion, i) => (
                    <div key={i} className="border-b border-zinc-100 pb-4">
                      <button className="flex items-center justify-between w-full text-sm font-bold text-zinc-900">
                        {accordion.title}
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      </button>
                      {i === 0 && (
                        <div className="mt-3 text-sm text-zinc-500 leading-relaxed">
                          {accordion.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 p-6 text-center">
                <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a product to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
