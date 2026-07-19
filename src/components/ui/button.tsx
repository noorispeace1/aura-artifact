import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function buttonStyles({ variant = "default", size = "default", className }: ButtonProps = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm": variant === "default",
      "bg-red-500 text-white hover:bg-red-600 shadow-sm": variant === "destructive",
      "border border-zinc-200 bg-transparent hover:bg-zinc-50 hover:border-zinc-300 text-zinc-900": variant === "outline",
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200": variant === "secondary",
      "hover:bg-zinc-100 hover:text-zinc-900": variant === "ghost",
      "text-zinc-900 underline-offset-4 hover:underline": variant === "link",
      "h-12 px-6 py-2": size === "default",
      "h-10 px-4": size === "sm",
      "h-14 px-8 text-base": size === "lg",
      "h-12 w-12": size === "icon",
    },
    className
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }: ButtonProps & { asChild?: boolean }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
