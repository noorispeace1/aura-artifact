"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { handleForgotPassword } from "@/app/actions/auth"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "react-toastify"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    startTransition(async () => {
      try {
        const result = await handleForgotPassword(email)

        if (!result.success) {
          toast.error(result.error)
        } else {
          toast.success("Verification code sent to your email!")
          // Pass email via query string to auto-fill on the next page
          router.push(`/reset-password?email=${encodeURIComponent(email)}`)
        }
      } catch (err: any) {
        toast.error(err.message || "An unexpected error occurred")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
        </Link>
        
        <div className="flex flex-col mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Forgot password?</h1>
          <p className="text-sm text-zinc-500 mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending || !email}
            className="w-full bg-zinc-900 text-white rounded-lg py-2.5 text-sm font-medium mt-6 hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center h-10"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  )
}
