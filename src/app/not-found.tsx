import Link from "next/link"
import { Search, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 font-sans overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-[8rem] md:text-[12rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none mb-4 drop-shadow-2xl">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Artifact Not Found
        </h2>
        
        <p className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed">
          The page or product you&apos;re looking for seems to have vanished from our collection. It might have been moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-300 rounded-2xl font-bold hover:text-white hover:border-violet-500 transition-all flex items-center justify-center gap-2 hover:bg-zinc-800"
          >
            <Search className="w-5 h-5" />
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  )
}
