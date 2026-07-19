"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp, signIn } from "@/lib/auth-client"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  
  const router = useRouter()

  const validate = () => {
    let isValid = true
    if (!name.trim()) {
      setNameError("Full name is required")
      isValid = false
    } else {
      setNameError("")
    }

    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      isValid = false
    } else {
      setPasswordError("")
    }
    
    return isValid
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      })
      if (error) {
        toast.error(error.message || "Failed to sign up with Google")
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsLoading(true)
    try {
      const { error } = await signUp.email({
        email,
        password,
        name,
        image: undefined
      })
      
      if (error) {
        toast.error(error.message || "Failed to register")
        setIsLoading(false)
        return
      }
      
      toast.success("Account created successfully!")
      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4 font-sans relative overflow-hidden">
      {/* Colorful decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-fuchsia-400/30 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[60%] rounded-full bg-cyan-400/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/50 relative z-10 my-8">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-6 group flex items-center justify-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo .png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 group-hover:brightness-110 drop-shadow-sm">
              Aura & Artifact
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight text-center">Create an Account</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm ${nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20'}`}
            />
            {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20'}`}
            />
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={`w-full px-3.5 py-2.5 rounded-lg border bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all text-sm ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/20'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white rounded-lg py-2.5 text-sm font-medium mt-6 hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center h-10"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign up"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-zinc-400 font-medium tracking-wider">Or</span>
          </div>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white text-zinc-700 rounded-lg py-2.5 text-sm font-medium border border-zinc-300 hover:bg-zinc-50 transition-colors disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 h-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Already have an account? <Link href="/login" className="font-medium text-zinc-900 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
