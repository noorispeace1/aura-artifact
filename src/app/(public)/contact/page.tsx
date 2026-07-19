"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] bg-[#FDFCFB] flex flex-col items-center justify-center py-32 px-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
            Contact Us
          </h1>
          <p className="text-zinc-500 text-lg">We are here to assist you with any inquiries regarding our collections or your orders.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-900">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Email</h3>
            <p className="text-sm text-zinc-500 mb-4">For general inquiries and support.</p>
            <a href="mailto:hello@aura-artifact.com" className="text-zinc-900 font-semibold hover:underline">hello@aura-artifact.com</a>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-900">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Phone</h3>
            <p className="text-sm text-zinc-500 mb-4">Available Mon-Fri, 9am - 5pm EST.</p>
            <a href="tel:+15551234567" className="text-zinc-900 font-semibold hover:underline">+1 (555) 123-4567</a>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 text-zinc-900">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-2">Studio</h3>
            <p className="text-sm text-zinc-500 mb-4">By appointment only.</p>
            <span className="text-zinc-900 font-semibold">123 Artifact Ave, NY 10001</span>
          </div>
        </div>
      </div>
    </div>
  )
}
