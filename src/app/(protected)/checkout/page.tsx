"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Button, buttonStyles } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"

const CART_ITEMS = [
  {
    id: 1,
    name: "Minimalist Ceramic Vase",
    price: 45.00,
    quantity: 1,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", // Sample placeholder
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg", // Sample placeholder
  }
]

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  })

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15.00
  const total = subtotal + shipping

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call and success
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-10 text-center shadow-sm border border-zinc-100">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Order Confirmed!</h1>
            <p className="text-zinc-500 mb-8">
              Thank you for your purchase. We've sent a confirmation email with your order details.
            </p>
            <Link href="/" className={buttonStyles({ className: "w-full h-12 text-base" })}>
              Return to Home
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-50 py-12 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          
          <div className="flex items-center text-sm font-medium text-zinc-400 mb-10">
            <Link href="/cart" className="hover:text-zinc-900 transition-colors">Cart</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-zinc-900">Checkout</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-3 space-y-10">
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Shipping Information</h2>
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">Full Name</label>
                      <Input 
                        required 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="John Doe" 
                        className="bg-zinc-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">Phone Number</label>
                      <Input 
                        required 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 (555) 000-0000" 
                        className="bg-zinc-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Delivery Address</label>
                    <Input 
                      required 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="123 Main St, Apt 4B, New York, NY 10001" 
                      className="bg-zinc-50"
                    />
                  </div>
                </form>
              </section>

              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Payment Method</h2>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-xl border-2 border-zinc-900 bg-zinc-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-4 border-zinc-900 bg-white"></div>
                      <span className="font-semibold text-zinc-900">Cash on Delivery</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-white opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-zinc-300"></div>
                      <span className="font-medium text-zinc-500">Credit Card (Unavailable)</span>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 sticky top-24">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Order Summary</h2>
                
                <div className="space-y-6 mb-8">
                  {CART_ITEMS.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-zinc-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                        <img src={item.image} alt={item.name} className="object-contain w-full h-full mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-semibold text-sm text-zinc-900 line-clamp-2">{item.name}</h4>
                          <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-zinc-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-100 mb-6 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span className="text-zinc-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Shipping</span>
                    <span className="text-zinc-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-zinc-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" form="checkout-form" className="w-full h-14 text-base shadow-lg">
                  Place Order
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
