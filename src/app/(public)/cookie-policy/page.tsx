"use client"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] py-32 px-6">
      <div className="max-w-3xl mx-auto bg-white p-12 md:p-16 rounded-3xl border border-zinc-100 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-8">
          Cookie Policy
        </h1>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            This Cookie Policy explains how Aura & Artifact uses cookies and similar technologies to recognize you when you visit our website. 
            It explains what these technologies are and why we use them.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
            They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">How we use cookies</h2>
          <p>
            We use cookies to remember your preferences, keep you logged in, understand how you interact with our site, and improve your overall experience.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">Managing cookies</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies.
          </p>
        </div>
      </div>
    </div>
  )
}
