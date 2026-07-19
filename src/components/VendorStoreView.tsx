"use client"

import { useEffect, useState } from "react"
import { useSession } from "@/lib/auth-client"
import { ProductCard, ProductProps } from "@/components/ProductCard"
import { Store, Plus, Trash2, Eye, Edit } from "lucide-react"

export function VendorStoreView({ onAddProduct }: { onAddProduct: () => void }) {
  const { data: session } = useSession()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMyProducts = async () => {
    if (!session?.user?.email) return
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products?vendorEmail=${session.user.email}`)
      if (res.ok) {
        const data = await res.json()
        const mappedData = data.map((p: any) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          category: p.category,
          image: p.imageUrl,
          rating: { rate: 5.0, count: 0 }
        }))
        setProducts(mappedData)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchMyProducts()
    }
  }, [session])

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id))
      } else {
        alert("Failed to delete product.")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error deleting product.")
    }
  }

  return (
    <div className="p-10 max-w-[1400px] w-full">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Store className="w-8 h-8 text-blue-500" />
            My Store
          </h1>
          <p className="text-zinc-500 mt-2">Manage and view all the products you've added to <span className="font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">Aura & Artifact</span>.</p>
        </div>
        
        <button 
          onClick={onAddProduct}
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="bg-zinc-100 aspect-square rounded-2xl mb-4 w-full"></div>
              <div className="h-3 bg-zinc-100 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-zinc-100 rounded w-3/4 mb-4"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-zinc-50 rounded-3xl border border-zinc-100 border-dashed flex flex-col items-center justify-center">
          <Store className="w-16 h-16 text-zinc-300 mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Your store is empty</h3>
          <p className="text-zinc-500 mb-6 max-w-sm">You haven't added any products yet. Start adding products to showcase them in your store.</p>
          <button 
            onClick={onAddProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Product Now
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-6 font-bold w-[400px]">Product</th>
                  <th className="p-6 font-bold">Category</th>
                  <th className="p-6 font-bold">Price</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white border border-zinc-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image} alt={product.title} className="w-12 h-12 object-contain" />
                        </div>
                        <span className="font-bold text-zinc-900 line-clamp-2">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-6 font-bold text-zinc-900">${product.price.toFixed(2)}</td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
                          className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                          title="View Product"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
