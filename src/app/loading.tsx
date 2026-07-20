import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50/80 backdrop-blur-sm fixed inset-0 z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          {/* Outer glowing ring */}
          <div className="absolute w-16 h-16 rounded-full border-t-2 border-r-2 border-violet-500 animate-spin" />
          {/* Inner ring */}
          <div className="absolute w-12 h-12 rounded-full border-b-2 border-l-2 border-indigo-500 animate-[spin_1.5s_linear_reverse]" />
          {/* Center icon */}
          <Loader2 className="w-6 h-6 text-zinc-900 animate-pulse" />
        </div>
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs animate-pulse">Loading Artifacts...</p>
      </div>
    </div>
  )
}
