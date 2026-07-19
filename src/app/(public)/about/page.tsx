"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { staggerChildren: 0.2 }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl flex items-center justify-center shadow-2xl mb-12"
          >
            <svg className="w-8 h-8 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="currentColor" />
            </svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-950 mb-6"
          >
            Form Meets Essence.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl tracking-tight"
          >
            Objects of substance. Aesthetics of intent.
          </motion.p>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="py-24 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-12">
            <motion.h2 variants={fadeInUp} className="text-sm font-bold tracking-widest uppercase text-zinc-400">
              The Philosophy
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl leading-relaxed text-zinc-800 font-medium tracking-tight">
              We believe the objects you surround yourself with should do more than simply exist. They should anchor your space, elevate your daily rituals, and reflect a deliberate choice to live beautifully. 
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-xl leading-relaxed text-zinc-600">
              Aiura & Artifact was born from a singular vision: to bridge the space between art and utility. <span className="text-zinc-900 italic font-semibold">Aiura</span> captures the intangible—the mood, the light, the unspoken elegance of a well-considered environment. <span className="text-zinc-900 italic font-semibold">Artifact</span> represents the physical—the tactile, the enduring, the meticulously crafted object.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-xl leading-relaxed text-zinc-600">
              We do not believe in excess; we believe in the essential. Our curation process is rigorous and uncompromising. Every piece we offer is selected not for passing trends, but for its enduring design, masterful craftsmanship, and the quiet statement it makes in a room. We exist for those who seek the exceptional in the everyday.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Standard */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={fadeInUp} 
            initial="initial" 
            whileInView="whileInView" 
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-16 text-center"
          >
            The Standard
          </motion.h2>

          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
          >
            {/* Block 1 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-start group">
              <span className="w-12 h-px bg-zinc-900 mb-6 group-hover:w-full transition-all duration-700 ease-out"></span>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Uncompromised Material</h3>
              <p className="text-zinc-500 leading-relaxed">
                We source only from creators and ateliers who honor the integrity of raw materials. Stone, metal, wood, and glass—shaped with purpose.
              </p>
            </motion.div>

            {/* Block 2 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-start group">
              <span className="w-12 h-px bg-zinc-900 mb-6 group-hover:w-full transition-all duration-700 ease-out"></span>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Enduring Form</h3>
              <p className="text-zinc-500 leading-relaxed">
                Design that outlives the season. We champion minimalist aesthetics characterized by clean lines, perfect proportions, and understated presence.
              </p>
            </motion.div>

            {/* Block 3 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-start group">
              <span className="w-12 h-px bg-zinc-900 mb-6 group-hover:w-full transition-all duration-700 ease-out"></span>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Seamless Experience</h3>
              <p className="text-zinc-500 leading-relaxed">
                From the moment of discovery to the tactile unwrapping of your acquisition, every touchpoint is designed to be as refined as the objects we curate.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-zinc-950 text-white flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Curated for the considered life.
          </h2>
          <Link 
            href="/product" 
            className="inline-block mt-8 px-8 py-4 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
