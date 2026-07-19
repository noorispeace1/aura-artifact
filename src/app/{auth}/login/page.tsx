"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "@/lib/auth-client"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get("callbackUrl")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    if (email && password) {
      try {
        const { data, error } = await signIn.email({
          email,
          password
        })

        if (error) {
          setError(error.message || "Invalid email or password")
          return
        }

        router.push(callbackUrl || "/dashboard")
        router.refresh()
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9AC1FB] via-[#B2CFFD] to-[#E3C9FA] p-4 font-sans">
      <div className="w-full max-w-[380px] bg-white rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-purple-500/10">
        <h1 className="text-[22px] font-bold text-center text-zinc-900 mb-8 tracking-tight">Login Form</h1>
        
        {/* Toggle */}
        <div className="flex p-1.5 bg-zinc-50 rounded-full mb-8 border border-zinc-100 shadow-sm">
          <div className="w-1/2 bg-[#006FEE] text-white rounded-full py-2.5 text-sm font-semibold text-center shadow-md cursor-default">
            Login
          </div>
          <Link href="/register" className="w-1/2 text-zinc-500 rounded-full py-2.5 text-sm font-medium text-center hover:text-zinc-900 hover:bg-zinc-100 transition-all">
            Register
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-danger-50 text-danger-500 text-sm rounded-xl border border-danger-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:border-[#006FEE] focus:ring-1 focus:ring-[#006FEE] transition-all text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:border-[#006FEE] focus:ring-1 focus:ring-[#006FEE] transition-all text-sm"
            />
          </div>
          
          <div className="flex justify-start pt-1">
            <a href="#" className="text-[13px] text-[#006FEE] hover:underline font-medium">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#006FEE] text-white rounded-2xl py-3.5 text-[15px] font-medium mt-2 hover:bg-[#005BC4] transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-[13px] text-zinc-500 mt-8">
          Create an account <Link href="/register" className="font-medium text-[#006FEE] hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  )
}
