"use client"

import React, { useState, useMemo } from "react"
import { ChevronDown, Star, ShoppingBag, Heart, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useShop, EnrichedProduct } from "@/context/ShopContext"
import { AIRecommendations } from "@/components/AIRecommendations"

const CATEGORIES = ["All", "Men's", "Women's", "Jewelry", "Electronics", "Sneakers"]
const COLORS = ["#d1d5db", "#000000", "#ef4444", "#3b82f6", "#10b981", "#eab308"]
const SIZES = ["US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5"]
const PRICE_RANGES = ["$0 - 100", "$100 - 200", "$200 - 300", "$300 - 400", "Over $400"]

export default function DashboardPage() {
  const router = useRouter()
  const { products, loading, favorites, toggleFavorite, addToCart } = useShop()
  
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("New Arrival")
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("default")

  // Auto-select first product if none selected
  React.useEffect(() => {
    if (!selectedProduct && products.length > 0) {
      setSelectedProduct(products[0])
    }
  }, [products, selectedProduct])

  // Fetch and store JWT for backend integration
  React.useEffect(() => {
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
  }, [])

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (activeCategory !== "All") {
        if (activeCategory === "Men's" && p.category !== "men's clothing") return false
        if (activeCategory === "Women's" && p.category !== "women's clothing") return false
        if (activeCategory === "Jewelry" && p.category !== "jewelery") return false
        if (activeCategory === "Electronics" && p.category !== "electronics") return false
        if (activeCategory === "Sneakers") return false
      }
      if (activeColor && p.color !== activeColor) return false
      if (priceRange) {
        if (priceRange === "$0 - 100" && p.price > 100) return false
        if (priceRange === "$100 - 200" && (p.price <= 100 || p.price > 200)) return false
        if (priceRange === "$200 - 300" && (p.price <= 200 || p.price > 300)) return false
        if (priceRange === "$300 - 400" && (p.price <= 300 || p.price > 400)) return false
        if (priceRange === "Over $400" && p.price <= 400) return false
      }
      return true
    })

    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price)
    else if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price)
    else if (sortBy === "rating_desc") result.sort((a, b) => b.rating.rate - a.rating.rate)

    return result
  }, [products, activeCategory, activeColor, priceRange, sortBy])

  return (
    <div className="flex w-full h-full">
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
                    className="w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500" 
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
                  className={`w-6 h-6 rounded-full border-2 ${activeColor === color ? 'border-violet-500' : 'border-transparent'} ring-1 ring-zinc-200`} 
                  style={{ backgroundColor: color }} 
                />
              ))}
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
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="p-6 pb-2 shrink-0 flex items-center justify-between z-10 backdrop-blur-sm">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {["New Arrival", "Trendy", "Popular", "Recommend"].map((tab) => (
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
              className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg border border-zinc-200 text-sm text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
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
          <h2 className="text-xl font-bold">{activeTab}</h2>
          <p className="text-sm text-zinc-500">Step Into Style - Fresh Finds Just Landed!</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-0">
          {activeTab === "Recommend" ? (
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
                          addToCart(product)
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
                <div key={i} className={`w-1/4 aspect-square bg-zinc-50 rounded-xl flex items-center justify-center p-2 border ${i === 0 ? 'border-violet-500' : 'border-zinc-200'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="thumbnail" className="max-h-full object-contain opacity-70 hover:opacity-100" />
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-3">{selectedProduct.title}</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-semibold rounded-md border border-violet-100">Sale</span>
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
                  <button key={i} className={`w-8 h-8 rounded-full border-2 ${i === 0 ? 'border-violet-500' : 'border-transparent'} ring-1 ring-zinc-200`} style={{ backgroundColor: color }} />
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
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to cart
              </button>
              <button 
                onClick={() => toggleFavorite(selectedProduct.id)}
                className={`flex-1 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border ${
                  favorites.includes(selectedProduct.id) 
                  ? 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200' 
                  : 'bg-white hover:bg-zinc-50 text-zinc-600 border-zinc-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? 'fill-violet-600 text-violet-600' : ''}`} />
                {favorites.includes(selectedProduct.id) ? 'Saved' : 'Wishlist'}
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
  )
}
