"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, HeadphonesIcon, RefreshCw } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

const features = [
  {
    id: 1, title: "Free Shipping",    description: "On all orders over $100 within the contiguous US.",
    icon: Truck,           gradient: "from-violet-500 to-indigo-500", bg: "bg-violet-50",  shadow: "shadow-violet-200",
  },
  {
    id: 2, title: "Secure Payments",  description: "We ensure your payment information is safely processed.",
    icon: ShieldCheck,     gradient: "from-teal-500 to-emerald-500",  bg: "bg-teal-50",    shadow: "shadow-teal-200",
  },
  {
    id: 3, title: "24/7 Support",     description: "Our team is here to help you around the clock.",
    icon: HeadphonesIcon,  gradient: "from-rose-500 to-pink-500",     bg: "bg-rose-50",    shadow: "shadow-rose-200",
  },
  {
    id: 4, title: "Easy Returns",     description: "30-day hassle-free return policy on all our items.",
    icon: RefreshCw,       gradient: "from-amber-500 to-orange-500",  bg: "bg-amber-50",   shadow: "shadow-amber-200",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="text-center mb-14 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full">
            Our Promise
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-zinc-500 max-w-[560px] mx-auto md:text-lg">
            We combine quality products with exceptional service to deliver the best experience.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 text-center flex flex-col items-center gap-4 hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.shadow}`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-zinc-900">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
