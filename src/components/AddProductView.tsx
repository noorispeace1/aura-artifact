"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { ArrowLeft, Upload, Package, DollarSign, Tag, AlignLeft } from "lucide-react"

export function AddProductView({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  // AI Generator States
  const [generatingAi, setGeneratingAi] = useState(false)
  const [aiTone, setAiTone] = useState("professional")
  const [aiLength, setAiLength] = useState("medium")
  const [generatedDesc, setGeneratedDesc] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Electronics",
    imageUrl: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const imgFormData = new FormData()
    imgFormData.append("image", file)

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
      if (!apiKey) throw new Error("ImgBB API key not found in .env.local")

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: imgFormData
      })
      
      const data = await res.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.data.url }))
      } else {
        alert("Failed to upload image")
      }
    } catch (error) {
      console.error(error)
      alert("Error uploading image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          vendorEmail: session?.user?.email
        })
      })
      
      if (res.ok) {
        alert("Product added successfully!")
        onBack()
      } else {
        alert("Failed to add product.")
      }
    } catch (error) {
      console.error(error)
      alert("Error adding product.")
    } finally {
      setLoading(false)
    }
  }

  const handleAiGenerate = async () => {
    if (!formData.name) {
      alert("Please enter a product name first!")
      return
    }
    setGeneratingAi(true)
    setGeneratedDesc("")
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          tone: aiTone,
          length: aiLength
        })
      })
      const data = await res.json()
      if (res.ok && data.description) {
        setGeneratedDesc(data.description)
      } else {
        throw new Error(data.message || "Generation failed")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to generate description.")
    } finally {
      setGeneratingAi(false)
    }
  }

  return (
    <div className="p-10 max-w-[1000px] w-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-zinc-600" />
        </button>
        <h1 className="text-3xl font-bold text-zinc-900">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
                <Package className="w-4 h-4 text-blue-500" /> Product Name
              </label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Wireless Noise-Cancelling Headphones" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-500" /> Price
                </label>
                <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
                  <Package className="w-4 h-4 text-blue-500" /> Stock
                </label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
                <Tag className="w-4 h-4 text-blue-500" /> Category
              </label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white">
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty">Beauty</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                  <AlignLeft className="w-4 h-4 text-blue-500" /> Description
                </label>
                <div className="flex gap-2">
                  <select value={aiTone} onChange={(e) => setAiTone(e.target.value)} className="text-xs px-2 py-1 border border-zinc-200 bg-white rounded-md">
                    <option value="professional">Tone: Professional</option>
                    <option value="creative">Tone: Creative</option>
                    <option value="bold">Tone: Bold</option>
                    <option value="minimalist">Tone: Minimalist</option>
                  </select>
                  <select value={aiLength} onChange={(e) => setAiLength(e.target.value)} className="text-xs px-2 py-1 border border-zinc-200 bg-white rounded-md">
                    <option value="short">Length: Short</option>
                    <option value="medium">Length: Medium</option>
                    <option value="long">Length: Detailed</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={generatingAi}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1 rounded-md font-semibold transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    {generatingAi ? "Generating..." : "Generate AI"}
                  </button>
                </div>
              </div>
              <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Describe the product features and details..." rows={5} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"></textarea>
              
              {generatedDesc && (
                <div className="mt-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider animate-pulse">AI Generated Description</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, description: generatedDesc }))
                        setGeneratedDesc("")
                      }}
                      className="text-xs bg-zinc-900 hover:bg-zinc-800 text-white px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer"
                    >
                      Apply Text
                    </button>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{generatedDesc}</p>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
                <Upload className="w-4 h-4 text-blue-500" /> Product Image
              </label>
              
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                  disabled={uploadingImage}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer" 
                />
                {uploadingImage && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-blue-600 font-medium">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                )}
              </div>
            </div>
            
            {formData.imageUrl && (
              <div className="h-32 w-full bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.imageUrl} alt="Preview" className="h-full w-auto object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end gap-4">
          <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-70 shadow-lg shadow-blue-500/30">
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  )
}
