"use client"

import { useState, Suspense, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { handleResetPassword } from "@/app/actions/auth"
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { toast } from "react-toastify"
import Link from "next/link"

function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const [manualToken, setManualToken] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlToken = searchParams.get("token")
  const urlEmail = searchParams.get("email")
  const activeToken = urlToken || manualToken
  
  useEffect(() => {
    if (urlEmail) setEmail(urlEmail)
  }, [urlEmail])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!activeToken || !email) {
      toast.error("Please enter your email and verification code")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    startTransition(async () => {
      try {
        const result = await handleResetPassword(email, activeToken, password)

        if (!result.success) {
          toast.error(result.error || "Failed to reset password")
        } else {
          setIsSuccess(true)
          toast.success("Password successfully reset!")
        }
      } catch (err: any) {
        toast.error(err.message || "An unexpected error occurred")
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-2">Password reset complete</h1>
        <p className="text-sm text-zinc-500 mb-8">
          Your password has been successfully reset. You can now use your new password to log in.
        </p>
        <Link 
          href="/login"
          className="w-full bg-zinc-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center h-10"
        >
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Set new password</h1>
        <p className="text-sm text-zinc-500 mt-2">
          {urlToken 
            ? "Please enter your new password below." 
            : "Please enter the verification code sent to your email, along with your new password."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!urlToken && (
          <>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700">Verification Code</label>
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Paste your verification code here"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20 font-mono"
              />
            </div>
          </>
        )}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={8}
              className="w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            minLength={8}
            className="w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20"
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending || !password || !confirmPassword || !activeToken || !email}
          className="w-full bg-zinc-900 text-white rounded-lg py-2.5 text-sm font-medium mt-6 hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center h-10"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset password"}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-200/60">
        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
