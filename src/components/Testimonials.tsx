"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

const testimonials = [
  {
    id: 1, name: "Sarah Jenkins", role: "Interior Designer",
    content: "The quality of the artifacts I received was beyond my expectations. They truly elevated the space I was designing. Highly recommended!",
    rating: 5, avatar: "SJ", gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 2, name: "Michael Chen", role: "Art Collector",
    content: <> <span className="font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">Aura & Artifact</span> offers a curated selection that you simply can't find elsewhere. The shipping was fast and the packaging was extremely secure.</>,
    rating: 5, avatar: "MC", gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 3, name: "Elena Rodriguez", role: "Happy Customer",
    content: "I absolutely love my new minimalist vase. It's the perfect centerpiece for my dining table. Customer service was also very helpful and responsive.",
    rating: 4, avatar: "ER", gradient: "from-rose-500 to-pink-600",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal className="text-center mb-14 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-rose-600 bg-rose-50 border border-rose-200 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-zinc-500 max-w-[560px] mx-auto md:text-lg">
            Don't just take our word for it. Here's what some of our verified buyers have to say.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 flex flex-col gap-5 hover:shadow-xl transition-shadow h-full"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-violet-300" />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${idx < t.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200"}`}
                    />
                  ))}
                </div>

                <div className="text-sm text-zinc-600 leading-relaxed italic flex-1">
                  "{typeof t.content === 'string' ? t.content : t.content}"
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-violet-50">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
