import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ChatWidget } from "@/components/ChatWidget";
import { GlobalFooter } from "@/components/GlobalFooter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopProvider } from "@/context/ShopContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aura & Artifact",
  description: "Curated collection of premium artifacts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <AuthProvider>
          <ShopProvider>
            <Navbar />
            {children}
            <ChatWidget />
            <GlobalFooter />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="light" />
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
