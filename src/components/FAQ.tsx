"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What types of artifacts do you sell?",
    answer: "We offer a curated collection of premium artifacts including vintage items, modern art pieces, handcrafted decor, and rare collectibles from around the world."
  },
  {
    question: "How do I know the artifacts are authentic?",
    answer: "All our items go through a rigorous authentication process by our expert curators. We provide certificates of authenticity for premium and rare pieces."
  },
  {
    question: <>Can I sell my own items on <span className="font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">Aura & Artifact</span>?</>,
    answer: "Yes! You can apply to become a vendor. Once approved, you can set up your store, list your items, and start selling to our community of collectors."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy for most items. If you're not completely satisfied with your purchase, you can return it in its original condition for a full refund."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally. Shipping costs and delivery times vary depending on the destination and the size of the artifact."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Have questions about our collection, shipping, or becoming a vendor? 
            Find the answers below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 hover:border-zinc-300 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-zinc-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-zinc-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
