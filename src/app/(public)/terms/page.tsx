"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] py-32 px-6">
      <div className="max-w-3xl mx-auto bg-white p-12 md:p-16 rounded-3xl border border-zinc-100 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Welcome to Aura & Artifact. By accessing or using our website, you agree to be bound by these Terms of Service. 
            Please read them carefully before using our platform.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Use of the Site</h2>
          <p>
            You agree to use our website for lawful purposes only and in a manner that does not infringe the rights of, 
            restrict, or inhibit anyone else's use and enjoyment of the site.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Product Descriptions</h2>
          <p>
            We strive to ensure that all details, descriptions, and prices of artifacts appearing on our website are accurate. 
            However, we do not warrant that product descriptions or other content are error-free.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, images, and software, is the property of Aura & Artifact 
            and is protected by international copyright laws.
          </p>
        </div>
      </div>
    </div>
  )
}
