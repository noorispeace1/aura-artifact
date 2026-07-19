"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type EnrichedProduct = Product & {
  color: string
  size: string
}

export type CartItem = EnrichedProduct & {
  quantity: number
  cartId: string
}

export type Order = {
  id: string
  date: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  items: CartItem[]
  total: number
}

type ShopContextType = {
  products: EnrichedProduct[]
  loading: boolean
  favorites: number[]
  cart: CartItem[]
  orders: Order[]
  toggleFavorite: (id: number) => void
  addToCart: (product: EnrichedProduct, quantity?: number) => void
  removeFromCart: (cartId: string) => void
  updateCartQuantity: (cartId: string, quantity: number) => void
  checkout: () => void
  cancelOrder: (orderId: string) => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

const COLORS = ["#d1d5db", "#000000", "#ef4444", "#3b82f6", "#10b981", "#eab308"]
const SIZES = ["US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5"]

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<EnrichedProduct[]>([])
  const [loading, setLoading] = useState(true)

  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  
  const [isClient, setIsClient] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    setIsClient(true)
    const savedFavorites = localStorage.getItem("aura_favorites")
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))

    const savedCart = localStorage.getItem("aura_cart")
    if (savedCart) setCart(JSON.parse(savedCart))

    const savedOrders = localStorage.getItem("aura_orders")
    if (savedOrders) setOrders(JSON.parse(savedOrders))
    else {
      // Create some mock orders
      setOrders([
        {
          id: "ORD-9831-2941",
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          status: "Processing",
          items: [],
          total: 129.99
        }
      ])
    }
  }, [])

  // Save to local storage on change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("aura_favorites", JSON.stringify(favorites))
      localStorage.setItem("aura_cart", JSON.stringify(cart))
      localStorage.setItem("aura_orders", JSON.stringify(orders))
    }
  }, [favorites, cart, orders, isClient])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const enriched = data.map(p => ({
          ...p,
          color: COLORS[p.id % COLORS.length],
          size: SIZES[p.id % SIZES.length]
        }))
        setProducts(enriched)
        
        // Update mock order items after products load if it's empty
        setOrders(prev => prev.map(o => {
          if (o.items.length === 0 && enriched.length > 0) {
            return {
              ...o,
              items: [{ ...enriched[0], quantity: 1, cartId: `mock-${enriched[0].id}` }]
            }
          }
          return o
        }))
        
        setLoading(false)
      })
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
  }

  const addToCart = (product: EnrichedProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === product.color && item.size === product.size)
      if (existing) {
        return prev.map(item => 
          item.cartId === existing.cartId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      }
      return [...prev, { ...product, quantity, cartId: `${product.id}-${Date.now()}` }]
    })
  }

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId))
  }

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId)
      return
    }
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item))
  }

  const checkout = () => {
    if (cart.length === 0) return
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      status: "Processing",
      items: [...cart],
      total
    }
    setOrders(prev => [newOrder, ...prev])
    setCart([])
  }

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "Cancelled" } : o))
  }

  return (
    <ShopContext.Provider value={{
      products, loading, favorites, cart, orders,
      toggleFavorite, addToCart, removeFromCart, updateCartQuantity, checkout, cancelOrder
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}
