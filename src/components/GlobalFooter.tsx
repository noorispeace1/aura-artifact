"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./Footer"

export function GlobalFooter() {
  const pathname = usePathname()
  
  // Do not show footer on dashboard pages
  if (
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/vendor") || 
    pathname?.startsWith("/dashboard")
  ) {
    return null
  }
  
  return <Footer />
}
