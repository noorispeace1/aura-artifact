"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  name: string
  email: string
  role: "admin" | "vendor" | "user"
}

type AuthContextType = {
  user: User | null
  login: (email: string, pass: string, callbackUrl?: string) => Promise<void>
  register: (name: string, email: string, pass: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate checking for a saved session
    const storedUser = localStorage.getItem("aura_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, pass: string, callbackUrl?: string) => {
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass })
      });
      
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      
      const data = await res.json();
      const loggedInUser: User = data.user;
      
      setUser(loggedInUser);
      localStorage.setItem("aura_user", JSON.stringify(loggedInUser));
      
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push(loggedInUser.role === "admin" ? "/admin" : loggedInUser.role === "vendor" ? "/vendor" : "/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
      throw error;
    }
  }

  const register = async (name: string, email: string, pass: string) => {
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass })
      });
      
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      
      const data = await res.json();
      const newUser: User = data.user;
      
      setUser(newUser);
      localStorage.setItem("aura_user", JSON.stringify(newUser));
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed.");
      throw error;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aura_user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
