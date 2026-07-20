"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"

export function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleLogout = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
    setIsLogoutModalOpen(false)
    router.push("/login")
    router.refresh()
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/about", label: "About" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-transparent backdrop-blur-md border-b border-white/10 shadow-sm" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50" onClick={closeMobileMenu}>
            <div className="w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo .png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-fuchsia-600 group-hover:to-violet-600 transition-all duration-500">
              Aura & Artifact
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-violet-700 bg-violet-100/70 shadow-sm shadow-violet-200/50"
                        : "text-gray-600 hover:text-violet-700 hover:bg-violet-50/80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gradient-to-r from-violet-100/80 to-indigo-100/60 rounded-full -z-10 shadow-inner"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
            {(!session?.user || session.user.role === "user") && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/become-vendor"
                  className="px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50/60 hover:bg-amber-100/80 hover:text-amber-800 rounded-full transition-all duration-300"
                >
                  Become a Vendor
                </Link>
              </motion.div>
            )}
          </nav>

          {/* Desktop Actions & Auth */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden relative z-50 p-2 -mr-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {session?.user ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/profile" title="View Profile">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm border border-violet-200 hover:border-violet-300 hover:shadow-md transition-all">
                      {session.user.image ? (
                        <img src={session.user.image || undefined} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="bg-zinc-100/80 text-zinc-900 hover:bg-zinc-200 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
                  >
                    Sign up <Sparkles className="w-3.5 h-3.5 opacity-70" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-violet-50 text-violet-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {(!session?.user || session.user.role === "user") && (
                  <Link
                    href="/become-vendor"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    Become a Vendor
                  </Link>
                )}
                
                <div className="h-px bg-gray-100 my-2" />
                
                {session?.user ? (
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-[10px] uppercase">
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                      Profile
                    </Link>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); setIsLogoutModalOpen(true); }}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="bg-zinc-100 text-zinc-900 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm hover:bg-zinc-200 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMobileMenu}
                      className="bg-gray-900 text-white px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && mounted && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sign out</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button 
                onClick={() => setIsLogoutModalOpen(false)} 
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Sign out
              </button>
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </>
  )
}
