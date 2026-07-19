"use client"

import { useState } from "react"
import { Sparkles, FileText, Share2, Package, BookOpen, Copy, Check, RotateCcw } from "lucide-react"

export function AIContentGeneratorView() {
  const [contentType, setContentType] = useState("blog")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState("medium")
  const [customPrompt, setCustomPrompt] = useState("")
  
  const [generating, setGenerating] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please provide a topic or subject to generate content.")
      return
    }

    setGenerating(true)
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          contentType,
          tone,
          length,
          customPrompt
        })
      })
      
      const data = await res.json()
      if (res.ok) {
        setOutput(data.content)
      } else {
        throw new Error(data.message || "Failed to generate content")
      }
    } catch (error) {
      console.error(error)
      alert("Error generating content.")
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-10 max-w-[1200px] w-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">AI Content Generator</h1>
          <p className="text-zinc-500 font-medium">Create high-quality content instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-3">Content Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "blog", icon: FileText, label: "Blog" },
                { id: "product-description", icon: Package, label: "Product" },
                { id: "social-media", icon: Share2, label: "Social" },
                { id: "documentation", icon: BookOpen, label: "Docs" }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    contentType === type.id 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <type.icon className={`w-6 h-6 ${contentType === type.id ? 'text-indigo-600' : 'text-zinc-400'}`} />
                  <span className="text-xs font-semibold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">Topic or Subject</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The benefits of minimalist decor in modern homes..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Tone of Voice</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="engaging">Engaging & Persuasive</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Length</label>
              <select 
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long & Detailed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-2">Custom Instructions (Optional)</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Include bullet points, mention our free shipping policy..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none h-24"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 mt-2"
          >
            {generating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating...
              </>
            ) : output ? (
              <>
                <RotateCcw className="w-5 h-5" /> Regenerate Response
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Content
              </>
            )}
          </button>
        </div>

        {/* Output Column */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8 flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <h2 className="text-lg font-bold text-zinc-900">Generated Output</h2>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          <div className="flex-1 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 overflow-y-auto">
            {generating ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                <Sparkles className="w-10 h-10 mb-4 animate-pulse text-indigo-300" />
                <p className="font-medium animate-pulse">Crafting your content...</p>
              </div>
            ) : output ? (
              <div className="prose prose-zinc prose-sm max-w-none whitespace-pre-wrap">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center">
                <FileText className="w-10 h-10 mb-4 opacity-20" />
                <p>Your generated content will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
