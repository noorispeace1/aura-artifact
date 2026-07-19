"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Star, ArrowLeft, ShoppingBag, Heart, ChevronDown } from "lucide-react"
import { ProductCard, ProductProps } from "@/components/ProductCard"

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

const COLORS = ["#d1d5db", "#000000", "#ef4444", "#3b82f6", "#10b981", "#eab308"]
const SIZES = ["US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5"]

export default function ProductDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let data;
        
        // If ID is a 24 character MongoDB ObjectId, fetch from our backend
        if (typeof id === 'string' && id.length > 10) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${id}`)
          if (!response.ok) throw new Error("Failed to fetch custom product")
          const dbData = await response.json()
          data = {
            id: dbData._id,
            title: dbData.name,
            price: dbData.price,
            description: dbData.description,
            category: dbData.category,
            image: dbData.imageUrl,
            rating: { rate: 5.0, count: 0 }
          }
        } else {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`)
          if (!response.ok) throw new Error("Failed to fetch")
          data = await response.json()
        }
        
        setProduct(data)
        // Set default mock selections
        // Use string length to avoid NaN if id is string
        const hash = typeof id === 'string' ? id.length : data.id
        setSelectedColor(COLORS[hash % COLORS.length])
        setSelectedSize(SIZES[hash % SIZES.length])
        
        // Fetch related products
        try {
          const fakeRes = await fetch("https://fakestoreapi.com/products")
          const fakeData = fakeRes.ok ? await fakeRes.json() : []
          let dbData = []
          try {
            const dbRes = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/products")
            if (dbRes.ok) dbData = await dbRes.json()
          } catch(e) {}
          
          const mappedDbData = dbData.map((p: any) => ({
            id: p._id,
            title: p.name,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.imageUrl,
            rating: { rate: 5.0, count: 0 }
          }))
          
          const allProds = [...mappedDbData, ...fakeData]
          const categoryProds = allProds.filter(p => p.category === data.category && String(p.id) !== String(data.id))
          setRelatedProducts(categoryProds.slice(0, 4))
        } catch(e) {
          console.error("Error fetching related products", e)
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details.")
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white space-y-4">
        <p className="text-zinc-500">{error || "Product not found."}</p>
        <button onClick={() => router.push("/dashboard")} className="px-4 py-2 border rounded-md">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-zinc-50 rounded-3xl p-12 flex items-center justify-center border border-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image} 
                alt={product.title} 
                className="object-contain w-full h-full drop-shadow-xl"
              />
            </div>
            
            <div className="flex gap-4">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className={`w-1/4 aspect-square bg-zinc-50 rounded-2xl flex items-center justify-center p-4 border ${i === 0 ? 'border-blue-500' : 'border-zinc-200'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="thumbnail" className="max-h-full object-contain opacity-70 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">Sale</span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-md">Top Rated</span>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-100 text-sm font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating.rate}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-semibold text-zinc-900 uppercase">Color:</span>
                <span className="text-zinc-500">Available</span>
              </div>
              <div className="flex gap-3">
                  {["#d1d5db", "#000000", "#ef4444"].map((color, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-transparent'} ring-1 ring-zinc-200`} 
                    style={{ backgroundColor: color }} 
                  />
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between text-sm mb-4">
                <span className="font-semibold text-zinc-900 uppercase">
                  Size: <span className="font-normal text-zinc-500">{selectedSize} (Only One Left)</span>
                </span>
                <button className="text-zinc-500 underline text-xs">Size Chart</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {SIZES.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium rounded-lg border ${
                      selectedSize === size 
                        ? 'bg-zinc-900 text-white border-zinc-900' 
                        : size === "US 6.5" ? 'bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed' : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {size.replace('US ', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Total Price</p>
                <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-200 text-lg">
                <ShoppingBag className="w-5 h-5" />
                Add to cart
              </button>
              <button className="px-6 bg-white hover:bg-zinc-50 text-blue-600 border border-blue-200 font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="hidden sm:inline">Wishlist</span>
              </button>
            </div>

            <div className="space-y-6 border-t border-zinc-100 pt-8">
              {[
                { title: "DETAILS:", content: product.description },
                { title: "REVIEWS:", content: `${product.rating.count} customer reviews verify the exceptional quality of this product.` },
                { title: "SHIPPING & RETURN:", content: "Free standard shipping on orders over $50. Return unworn items within 30 days for a full refund." },
                { title: "CARE INSTRUCTIONS:", content: "Handle with care. Follow manufacturer guidelines for longevity." }
              ].map((accordion, i) => (
                <div key={i} className="border-b border-zinc-100 pb-6">
                  <button className="flex items-center justify-between w-full text-base font-bold text-zinc-900">
                    {accordion.title}
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  </button>
                  {i === 0 && (
                    <div className="mt-4 text-base text-zinc-500 leading-relaxed">
                      {accordion.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Related Items Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Related Items</h2>
              <button onClick={() => router.push("/product")} className="text-sm font-medium text-blue-600 hover:underline">
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} {...rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
