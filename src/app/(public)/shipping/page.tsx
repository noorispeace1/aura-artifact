"use client"

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-[70vh] bg-[#FDFCFB] flex flex-col items-center justify-center py-32 px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8 text-center">
          Shipping & Returns
        </h1>
        <div className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Shipping Policy</h2>
            <p className="text-zinc-500 leading-relaxed">
              We process all orders within 1-2 business days. Domestic shipping typically takes 3-5 business days. 
              Expedited options are available at checkout. You will receive a tracking link via email once your artifact has been dispatched.
            </p>
          </div>
          <div className="w-full h-px bg-zinc-100"></div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Returns & Exchanges</h2>
            <p className="text-zinc-500 leading-relaxed">
              We want you to be completely satisfied with your curation. If an item does not meet your expectations, 
              you may return it within 14 days of receipt. Please ensure the item is in unused, original condition.
              Return shipping costs are the responsibility of the customer unless the item arrived damaged.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
