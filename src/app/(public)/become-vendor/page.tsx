"use client"

import { useState } from "react"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function BecomeVendorPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    website: "",
    organizationType: "Corporation",
    foundedYear: "",
    staffCount: "",
    taxId: "",
    businessRegNumber: "",
    legalInfo: "",
    productDescription: "",
    paymentMethod: "Bank Transfer",
    paymentDetails: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user) {
      alert("Please sign in to apply as a vendor.")
      router.push("/login?callbackUrl=/become-vendor")
      return
    }

    setLoading(true)

    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/vendor-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session.user.email,
          userName: session.user.name
        })
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        alert("Failed to submit application.")
      }
    } catch (error) {
      console.error(error)
      alert("Error submitting application.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-100 shadow-xl text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Application Received!</h2>
          <p className="text-zinc-500 mb-8">We have received your vendor application. Our team will review it and get back to you soon.</p>
          <button 
            onClick={() => router.push("/")}
            className="w-full bg-zinc-900 text-white font-medium py-3 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-zinc-900 mb-8">Become a Vendor</h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
            <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
          </div>

          {/* Office Address */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Office Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Office Address Line 1</label>
                <input required type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Office Address Line 2</label>
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">State/Province</label>
                <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Postal Code</label>
                <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Company Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Contact Person Name</label>
                <input required type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} placeholder="Enter the name of the contact person" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Contact Person Phone Number</label>
                <input required type="tel" name="contactPersonPhone" value={formData.contactPersonPhone} onChange={handleChange} placeholder="Enter the phone number of the contact person" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Contact Person Email Address</label>
                <input required type="email" name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} placeholder="Enter the email address of the contact person" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Website</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Enter your company website" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Organization Type</label>
                <select name="organizationType" value={formData.organizationType} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm bg-white">
                  <option value="Corporation">Corporation</option>
                  <option value="LLC">LLC</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">When Was the Company Founded?</label>
                <input required type="text" name="foundedYear" value={formData.foundedYear} onChange={handleChange} placeholder="Enter the year your company was founded" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Number of Staff</label>
                <input required type="number" name="staffCount" value={formData.staffCount} onChange={handleChange} placeholder="Enter the total number of staff" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Legal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Tax Identification Number</label>
                <input required type="text" name="taxId" value={formData.taxId} onChange={handleChange} placeholder="Enter your tax identification number" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Business Registration Number</label>
                <input required type="text" name="businessRegNumber" value={formData.businessRegNumber} onChange={handleChange} placeholder="Enter your business registration number" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-zinc-600 mb-1">Other Relevant Legal Information</label>
              <textarea name="legalInfo" value={formData.legalInfo} onChange={handleChange} placeholder="Provide any additional legal details" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Description of Products or Services</label>
              <textarea required name="productDescription" value={formData.productDescription} onChange={handleChange} placeholder="Describe your products or services" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm resize-none"></textarea>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Payment Information</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-zinc-600 mb-1">Accepted Payment Method</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm bg-white">
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Payment Method Details</label>
              <textarea required name="paymentDetails" value={formData.paymentDetails} onChange={handleChange} placeholder="Provide additional details for your selected payment method" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent text-sm resize-none"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-zinc-900 text-white font-medium py-3 px-8 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[150px]"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
