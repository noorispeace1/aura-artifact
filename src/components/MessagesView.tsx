"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function MessagesView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am Aura, your AI assistant. I can answer any questions about our products. How can I help you today?" }
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
          history: history.slice(1) // skip the initial greeting
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
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later." }])
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
    "What products do you have?",
    "Show products under $50",
    "List electronics products"
  ]

  return (
    <div className="p-10 max-w-[1000px] w-full h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-tight">AI Assistant</h1>
          <p className="text-zinc-500 text-sm">Ask anything about the products on our platform</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-zinc-100 rounded-3xl shadow-sm flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user" ? "bg-zinc-900 text-white" : "bg-blue-100 text-blue-600"}`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-zinc-900 text-white rounded-tr-sm" 
                  : "bg-zinc-50 text-zinc-800 border border-zinc-100 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 bg-blue-100 text-blue-600">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 rounded-tl-sm flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-100 flex flex-wrap gap-2 shrink-0">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-zinc-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, prices, or categories..."
              disabled={isLoading}
              className="w-full pl-6 pr-14 py-4 bg-zinc-50 border border-zinc-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors disabled:opacity-50 shadow-sm shadow-blue-500/20"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
