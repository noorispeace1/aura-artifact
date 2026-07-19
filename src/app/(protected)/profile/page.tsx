"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { ProfileView } from "@/components/ProfileView"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F8F9FA] pt-12 pb-24">
        <ProfileView />
      </div>
    </ProtectedRoute>
  )
}
