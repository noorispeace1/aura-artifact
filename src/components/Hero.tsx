"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown, Sparkles, ShoppingBag, ArrowRight } from "lucide-react"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80",
    badge: "New Collection",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    badge: "Top Rated",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    badge: "Premium Picks",
    badgeColor: "bg-amber-100 text-amber-700",
  },
]

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Products" },
  { value: "4.9★", label: "Average Rating" },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden w-full min-h-[68vh] flex items-center">
      {/* Background gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/40 to-indigo-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-rose-100/30 to-amber-100/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* ── LEFT: Text Content ──────────────────────────── */}
          <div className="flex flex-col justify-center space-y-8">

            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 text-sm font-semibold rounded-full border border-violet-200/60 shadow-sm">
                <Sparkles className="w-4 h-4 text-violet-500" />
                Curated Premium Collection
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.05]">
                Discover the
                <br />
                <span className="gradient-text">Perfect Aura</span>
                <br />
                <span className="text-zinc-800">& Artifact</span>
              </h1>
              <p className="max-w-[520px] text-zinc-500 md:text-lg/relaxed xl:text-xl/relaxed mt-4">
                Elevate your space with our curated collection of premium artifacts.
                Experience unparalleled design and craftsmanship.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex flex-col gap-3 min-[400px]:flex-row"
            >
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 btn-vibrant rounded-xl font-semibold text-base transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/80 backdrop-blur border border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl font-semibold text-base transition-all hover:border-violet-400"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex gap-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Image slider ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[540px] mx-auto"
          >
            {/* Floating glow ring */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-violet-400/20 to-indigo-400/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-2xl shadow-violet-200/50 bg-white group aspect-[4/3]">
              {/* Slide badge */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold rounded-full ${slides[currentSlide].badgeColor}`}
                >
                  {slides[currentSlide].badge}
                </motion.span>
              </AnimatePresence>

              {/* Slide images */}
              {slides.map((slide, index) => (
                <motion.img
                  key={index}
                  src={slide.image}
                  alt={`Hero slide ${index + 1}`}
                  className="absolute inset-0 object-cover w-full h-full"
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              ))}

              {/* Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[
                  { action: () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length), Icon: ChevronLeft },
                  { action: () => setCurrentSlide((p) => (p + 1) % slides.length), Icon: ChevronRight },
                ].map(({ action, Icon }, i) => (
                  <button
                    key={i}
                    onClick={action}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all group/btn"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      index === currentSlide ? "w-6 bg-violet-600" : "w-2 bg-white/70 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-violet-400">
        <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  )
}
