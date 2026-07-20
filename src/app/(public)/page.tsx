"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, ShoppingBag, TrendingUp, Sparkles, ShieldCheck, Truck, Clock, Quote, Mail, Award, Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useShop } from "@/context/ShopContext"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { products, loading, addToCart } = useShop()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Fallback products if context hasn't loaded or is empty
  const displayProducts = products.length > 0 ? products : []

  const filteredProducts = displayProducts.filter(p => {
    if (activeTab === "all") return true
    if (activeTab === "men") return p.category === "men's clothing"
    if (activeTab === "women") return p.category === "women's clothing"
    if (activeTab === "electronics") return p.category === "electronics" || p.category === "jewelery"
    return true
  }).slice(0, 8)

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 overflow-hidden">
      <main className="flex-1 relative z-[1]">
        
        {/* 1. HERO SECTION (Limited to ~65vh) */}
        <section className="relative pt-8 pb-12 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="relative min-h-[75vh] flex flex-col items-center justify-center rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-800">
              
              {/* Animated Slider Images Constrained to Container */}
              {heroImages.map((src, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="w-full h-full object-cover scale-105" alt="Hero Background" />
                  {/* Dark Gradient Overlay to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-zinc-950/90"></div>
                </div>
              ))}
              
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] z-0 animate-pulse pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] z-0 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
              
              <div className="relative z-10 flex justify-center w-full px-6 py-12">
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-3xl flex flex-col items-center text-center mx-auto"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-md text-violet-400 text-sm font-bold mb-8 border border-violet-500/30 shadow-xl">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>Discover Premium Artifacts</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                    Elevate Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg">
                      Everyday Style.
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                    Curated collections of premium clothing, exquisite jewelry, and cutting-edge electronics. 
                    Experience the pinnacle of quality and design in 2026.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard" className="px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-900 rounded-2xl font-bold shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1">
                      Shop Collection
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="#categories" className="px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center hover:bg-zinc-800 hover:-translate-y-1">
                      View Categories
                    </Link>
                  </div>
                </motion.div>
                
              </div>

              {/* Scroll Down Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-20">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Scroll</span>
                <motion.a 
                  href="#features"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-12 rounded-full border-2 border-zinc-200 flex justify-center pt-2 hover:border-violet-300 transition-colors"
                >
                  <div className="w-1.5 h-3 bg-violet-500 rounded-full" />
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE FEATURES BANNER */}
        <section id="features" className="py-12">
          <div className="container mx-auto px-6">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Truck, title: "Free Global Shipping", desc: "On all orders over $150. Fast and reliable delivery worldwide.", color: "from-cyan-400 to-blue-500" },
                  { icon: ShieldCheck, title: "Secure Payments", desc: "100% protected transactions with end-to-end encryption.", color: "from-emerald-400 to-teal-500" },
                  { icon: Clock, title: "24/7 Premium Support", desc: "Our dedicated team is at your service anytime, anywhere.", color: "from-violet-400 to-fuchsia-500" },
                  { icon: Star, title: "Authenticity Guaranteed", desc: "Every artifact is verified for quality and originality.", color: "from-amber-400 to-orange-500" }
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700 cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white shadow-lg bg-gradient-to-br ${feature.color}`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h4 className={`font-black text-xl mb-3 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                      {feature.title}
                    </h4>
                    <p className="text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. SHOP BY CATEGORY */}
        <section id="categories" className="py-20 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-white mb-4">Shop by Category</h2>
              <p className="text-zinc-400">Discover exactly what you're looking for by browsing through our expertly curated categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category 1 */}
              <Link href="/dashboard" className="group relative h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/40 transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1887&auto=format&fit=crop" alt="Men's Fashion" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Men's Fashion</h3>
                  <div className="flex items-center gap-2 text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>Shop Now</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              {/* Category 2 */}
              <Link href="/dashboard" className="group relative h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-800">
                <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/60 transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" alt="Women's Fashion" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Women's Fashion</h3>
                  <div className="flex items-center gap-2 text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>Shop Now</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              {/* Category 3 */}
              <Link href="/dashboard" className="group relative h-[350px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/40 transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop" alt="Electronics & Tech" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Tech & Accessories</h3>
                  <div className="flex items-center gap-2 text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>Shop Now</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. DYNAMIC PRODUCT SHOWCASE */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-zinc-900 relative rounded-[3rem] p-8 md:p-12 shadow-2xl border border-zinc-800">
              <div className="flex flex-col items-center text-center gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-black text-white mb-4">Trending Now</h2>
                <p className="text-zinc-400 max-w-xl mx-auto">Explore our hand-picked selection of top-rated products that everyone is talking about.</p>
              </div>
              
              <div className="flex gap-3 flex-wrap justify-center overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: "all", label: "All Products" },
                  { id: "men", label: "Men's Fashion" },
                  { id: "women", label: "Women's Fashion" },
                  { id: "electronics", label: "Tech & Jewelry" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id 
                        ? "bg-white text-zinc-900 shadow-md" 
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-zinc-800 aspect-[4/5] rounded-3xl mb-4 border border-zinc-700"></div>
                    <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={product.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/dashboard`)}
                    >
                      <div className="relative aspect-[4/5] bg-zinc-800 rounded-3xl mb-4 overflow-hidden border border-zinc-700 shadow-sm group-hover:shadow-xl group-hover:shadow-violet-500/20 transition-all duration-500 flex items-center justify-center p-6">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                              router.push('/dashboard/cart');
                            }}
                            className="w-full bg-white/95 backdrop-blur-md hover:bg-zinc-900 hover:text-white text-zinc-900 font-bold py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-1">
                          <h3 className="font-bold text-white line-clamp-1 group-hover:text-violet-400 transition-colors">
                            {product.title}
                          </h3>
                          <p className="font-black text-white">${product.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-zinc-400 capitalize">{product.category}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            
            <div className="mt-16 text-center">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-zinc-700 text-zinc-300 font-bold hover:border-violet-500 hover:text-white transition-all group hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-zinc-800">
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          </div>
        </section>

        {/* 5. PROMOTIONAL HIGHLIGHT (SALE) */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="bg-zinc-900 relative overflow-hidden rounded-[3rem] border border-zinc-800 shadow-2xl py-24">
              {/* Decorative shapes */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
              
              <div className="max-w-3xl mx-auto text-center text-white relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-bold tracking-widest uppercase mb-8">
                  Limited Time Offer
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Summer Collection <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Up to 40% Off</span>
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
                  Refresh your wardrobe and upgrade your tech with our massive summer clearance event. Premium quality, unbeatable prices.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/dashboard" className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    Shop the Sale
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. STATISTICS / IMPACT */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="border-b border-zinc-800 pb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
              {[
                { label: "Happy Customers", value: "25k+", icon: CheckCircle2, color: "from-orange-400 to-rose-400" },
                { label: "Premium Brands", value: "150+", icon: Award, color: "from-fuchsia-400 to-purple-500" },
                { label: "Items Sold", value: "1.2M", icon: ShoppingBag, color: "from-blue-400 to-indigo-500" },
                { label: "Fast Delivery", value: "24hr", icon: Zap, color: "from-emerald-400 to-teal-500" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center p-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push('/dashboard')}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} text-white rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className={`text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>{stat.value}</h3>
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section className="py-24 bg-transparent overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-white mb-4">Loved by Thousands</h2>
              <p className="text-zinc-400">Don&apos;t just take our word for it. Here is what our community of shoppers has to say.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Jenkins", role: "Fashion Enthusiast", text: <> <span className="font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">Aura & Artifact</span> completely changed how I shop. The quality of the products and the incredibly fast shipping make it my go-to store.</>, rating: 5, color: "from-pink-500 to-rose-500" },
                { name: "David Chen", role: "Tech Reviewer", text: "I bought my last three gadgets from here. Not only are the prices competitive, but the 24/7 support team is exceptionally helpful.", rating: 5, color: "from-blue-500 to-indigo-500" },
                { name: "Emily Rodriguez", role: "Verified Buyer", text: "The UI of the website is stunning, and finding exactly what I need is so easy. Highly recommend their premium jewelry collection!", rating: 4, color: "from-violet-500 to-fuchsia-500" }
              ].map((review, i) => (
                <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-violet-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer" onClick={() => router.push('/dashboard')}>
                  <Quote className={`absolute top-8 right-8 w-10 h-10 text-transparent bg-clip-text bg-gradient-to-br ${review.color} opacity-20`} />
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-current' : 'text-zinc-700'}`} />
                    ))}
                  </div>
                  <div className="text-zinc-300 mb-8 relative z-10 leading-relaxed font-medium">&quot;{typeof review.text === 'string' ? review.text : review.text}&quot;</div>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full overflow-hidden p-1 bg-gradient-to-br ${review.color}`}>
                      <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt={review.name} className="w-full h-full rounded-full border-2 border-zinc-900 object-cover" />
                    </div>
                    <div>
                      <h4 className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${review.color}`}>{review.name}</h4>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. NEWSLETTER SUBSCRIPTION */}
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-6">
            <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col items-center text-center border border-zinc-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/30 rounded-full blur-[80px]"></div>
              
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Join the Aura Club</h2>
              <p className="text-zinc-400 max-w-lg mb-10">
                Subscribe to our newsletter and get 10% off your first purchase. Plus, receive exclusive access to new drops and private sales.
              </p>
              
              <form 
                className="w-full max-w-md flex flex-col sm:flex-row gap-3 relative z-10" 
                onSubmit={(e) => {
                  e.preventDefault();
                  import("react-toastify").then(module => {
                    module.toast.success("Successfully subscribed to newsletter!");
                  });
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  required
                />
                <button type="submit" className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-violet-100 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-zinc-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
