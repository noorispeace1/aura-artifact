"use client"

import { useEffect, useState } from "react"
import { Package, Trash2, Eye } from "lucide-react"

export function AdminProductsView() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchAllProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`)
      if (res.ok) {
        const data = await res.json()
        const mappedData = data.map((p: any) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          category: p.category,
          image: p.imageUrl,
          vendorEmail: p.vendorEmail || 'N/A'
        }))
        setProducts(mappedData)
      }
    } catch (error) {
      console.error("Failed to fetch all products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

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
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-500" />
            All Products
          </h1>
          <p className="text-zinc-500 mt-2">Manage all products available in the marketplace.</p>
        </div>
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
          <Package className="w-16 h-16 text-zinc-300 mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No products found</h3>
          <p className="text-zinc-500 max-w-sm">There are currently no products in the marketplace.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-6 font-bold w-[300px]">Product</th>
                  <th className="p-6 font-bold">Category</th>
                  <th className="p-6 font-bold">Vendor Email</th>
                  <th className="p-6 font-bold">Price</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-zinc-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image || undefined} alt={product.title} className="w-10 h-10 object-contain" />
                        </div>
                        <span className="font-bold text-zinc-900 line-clamp-2">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="text-zinc-600 text-xs font-medium bg-zinc-100 px-2 py-1 rounded-md">{product.vendorEmail}</span>
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
