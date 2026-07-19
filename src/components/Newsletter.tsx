"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { ScrollReveal } from "./ScrollReveal"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-8 py-16 md:px-16 text-center shadow-2xl shadow-violet-300/30">

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Mail className="w-7 h-7 text-white" />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                  Join Our Newsletter
                </h2>
                <p className="text-violet-100 md:text-lg">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-white bg-white/20 px-6 py-3 rounded-xl font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  You're subscribed! Thank you 🎉
                </motion.div>
              ) : (
                <form
                  className="flex w-full max-w-md flex-col sm:flex-row gap-3"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3 rounded-xl bg-white/20 placeholder:text-violet-200 text-white border border-white/30 focus:outline-none focus:border-white focus:bg-white/25 transition-all text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors text-sm shadow-lg"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}

              <p className="text-xs text-violet-200/70">
                By subscribing you agree to our Terms and Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
