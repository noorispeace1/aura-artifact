"use client"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] py-32 px-6">
      <div className="max-w-3xl mx-auto bg-white p-12 md:p-16 rounded-3xl border border-zinc-100 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At Aura & Artifact, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as your name, email address, shipping address, and payment details 
            when you place an order or sign up for our newsletter.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">How We Use Your Information</h2>
          <p>
            Your information is used solely to process orders, provide customer support, and improve our services. 
            We do not sell or rent your personal information to third parties.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Data Security</h2>
          <p>
            We implement advanced security measures to maintain the safety of your personal information. 
            All payment transactions are encrypted and processed through secure gateways.
          </p>
        </div>
      </div>
    </div>
  )
}
