"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isPending && !session?.user) {
      // Redirect to login and save the current location
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, isPending, router, pathname])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session?.user) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}
