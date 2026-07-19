"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Send, Sparkles, HelpCircle } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AdminHelpView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello Admin! I'm Aura AI, your dashboard assistant. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: text }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: history.slice(1)
        })
      })

      const data = await res.json()
      
      if (res.ok && data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }])
      } else {
        throw new Error(data.message || "Failed to get response")
      }
    } catch (error) {
      console.warn("Chat error:", error)
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput("")
  }

  const SUGGESTED_PROMPTS = [
    "How do I manage vendor requests?",
    "Explain the conversion rate metrics.",
    "How to delete a product?",
    "Generate a weekly report summary."
  ]

  return (
    <div className="p-10 max-w-[1200px] w-full mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-100 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-indigo-500" />
            Help & Support
          </h1>
          <p className="text-zinc-500 mt-2">Get instant assistance from Aura AI for any dashboard-related queries.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-900">Aura AI Support</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-xs text-zinc-500 font-medium">Online & ready to help</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                msg.role === "user" ? "bg-zinc-900 text-white" : "bg-indigo-100 text-indigo-600"
              }`}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed ${
                msg.role === "user" 
                  ? "bg-zinc-900 text-white rounded-tr-sm" 
                  : "bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-sm shadow-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-6 py-5 rounded-3xl bg-zinc-50 border border-zinc-100 rounded-tl-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="px-8 py-3 bg-white border-t border-zinc-100 flex flex-wrap gap-2 shrink-0">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={isLoading}
              className="text-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 px-4 py-2 rounded-full font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-100 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the dashboard..."
              disabled={isLoading}
              className="w-full pl-6 pr-16 py-4 bg-white border border-zinc-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-[15px] transition-all disabled:opacity-50 shadow-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors disabled:opacity-50 shadow-md"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
