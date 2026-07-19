"use client"

import { Plug2, CheckCircle2, XCircle } from "lucide-react"

export function AdminIntegrationsView() {
  const integrations = [
    { name: "Stripe", description: "Payment processing and subscriptions.", status: "Connected", icon: "💳", color: "bg-indigo-50" },
    { name: "Mailchimp", description: "Email marketing and newsletters.", status: "Not Connected", icon: "📧", color: "bg-yellow-50" },
    { name: "Google Analytics", description: "Traffic and user behavior tracking.", status: "Connected", icon: "📊", color: "bg-orange-50" },
    { name: "Shopify", description: "E-commerce platform sync.", status: "Not Connected", icon: "🛍️", color: "bg-emerald-50" },
    { name: "Slack", description: "Team notifications and alerts.", status: "Connected", icon: "💬", color: "bg-purple-50" },
    { name: "Zendesk", description: "Customer support ticketing.", status: "Not Connected", icon: "🎧", color: "bg-blue-50" },
  ]

  return (
    <div className="p-10 max-w-[1400px] w-full mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Plug2 className="w-8 h-8 text-teal-500" />
            Integrations
          </h1>
          <p className="text-zinc-500 mt-2">Connect third-party tools and services to your platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((app, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                  {app.icon}
                </div>
                {app.status === "Connected" ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md">
                    <XCircle className="w-3.5 h-3.5" /> Not Connected
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{app.name}</h3>
              <p className="text-zinc-500 text-sm mb-6">{app.description}</p>
            </div>
            
            <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${
              app.status === "Connected" 
                ? "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100" 
                : "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
            }`}>
              {app.status === "Connected" ? "Manage Configuration" : "Connect App"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
