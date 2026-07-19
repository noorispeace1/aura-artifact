"use client"

export default function FAQPage() {
  return (
    <div className="min-h-[70vh] bg-[#FDFCFB] flex flex-col items-center justify-center py-32 px-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-12 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">How are your products sourced?</h3>
            <p className="text-zinc-500 leading-relaxed">We partner directly with independent artisans and small design studios globally. Every item is ethically sourced and meticulously vetted for quality.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Do you ship internationally?</h3>
            <p className="text-zinc-500 leading-relaxed">Yes, we provide worldwide shipping. Rates and times vary depending on the destination and the nature of the artifact.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">What is your return policy?</h3>
            <p className="text-zinc-500 leading-relaxed">We accept returns within 14 days of delivery for most items. The artifacts must be in their original condition and packaging.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
