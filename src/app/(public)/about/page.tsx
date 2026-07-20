"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Feather, ShieldCheck, Sparkles, Gem } from "lucide-react"
import { useRef } from "react"

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.15 }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop" 
            alt="Minimalist interior" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#FDFCFB]"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-sm"
          >
            Form Meets <br className="md:hidden" /> Essence.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-200 font-light max-w-2xl tracking-wide"
          >
            Objects of substance. Aesthetics of intent.
          </motion.p>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="py-32 md:py-48 px-6 bg-[#FDFCFB]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-12">
            <motion.div variants={fadeInUp} className="flex justify-center">
              <span className="px-4 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold tracking-widest uppercase text-zinc-500 bg-white shadow-sm">
                Our Philosophy
              </span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl leading-tight md:leading-[1.1] text-zinc-900 font-medium tracking-tight">
              &quot;We believe the objects you surround yourself with should do more than simply exist. They should anchor your space, elevate your daily rituals, and reflect a deliberate choice to live beautifully.&quot;
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="w-24 h-px bg-zinc-300 mx-auto"></motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-8">
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-zinc-600">
                <span className="text-zinc-900 font-semibold">Aura & Artifact</span> was born from a singular vision: to bridge the space between art and utility. <span className="italic">Aura</span> captures the intangible—the mood, the light, the unspoken elegance of a well-considered environment.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-zinc-600">
                <span className="italic">Artifact</span> represents the physical—the tactile, the enduring, the meticulously crafted object. We do not believe in excess; we believe in the essential. We exist for those who seek the exceptional in the everyday.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Showcase */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 h-[400px] md:h-full rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" alt="Living space" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
            </motion.div>
            
            <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[800px] md:h-full">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-3xl overflow-hidden relative group bg-zinc-100"
              >
                <img src="https://images.unsplash.com/photo-1490122417551-6ee9691429d0?q=80&w=1000&auto=format&fit=crop" alt="Artifacts" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-zinc-900 rounded-3xl p-10 lg:p-12 flex flex-col justify-center text-white"
              >
                <Gem className="w-10 h-10 mb-6 text-zinc-400" />
                <h3 className="text-2xl font-semibold mb-4">Curated Perfection</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Every piece we offer is selected not for passing trends, but for its enduring design and masterful craftsmanship.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Standard */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView" 
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
                The Standard
              </h2>
              <p className="text-xl text-zinc-500 leading-relaxed">
                Our commitment to quality is absolute. We partner exclusively with artisans who share our dedication to the extraordinary.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Block 1 */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-500 text-zinc-900">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Uncompromised Material</h3>
              <p className="text-zinc-500 leading-relaxed">
                We source only from creators and ateliers who honor the integrity of raw materials. Stone, metal, wood, and glass—shaped with purpose.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-500 text-zinc-900">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Enduring Form</h3>
              <p className="text-zinc-500 leading-relaxed">
                Design that outlives the season. We champion minimalist aesthetics characterized by clean lines, perfect proportions, and understated presence.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-500 text-zinc-900">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Seamless Experience</h3>
              <p className="text-zinc-500 leading-relaxed">
                From the moment of discovery to the tactile unwrapping of your acquisition, every touchpoint is designed to be as refined as the objects we curate.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-zinc-950 text-white overflow-hidden md:rounded-t-[4rem]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)]"></div>
        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Curated for the <br className="hidden md:block"/> considered life.
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Elevate your surroundings with pieces that bring intention and beauty to your everyday moments.
            </p>
            <Link 
              href="/product" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
            >
              Explore the Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
