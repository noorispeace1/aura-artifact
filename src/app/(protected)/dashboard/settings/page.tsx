"use client";

import React, { useState } from "react";
import { Settings, User, Bell, Shield, Key, LucideIcon } from "lucide-react";

type TabId = "profile" | "notifications" | "privacy" | "password";

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const SETTINGS_TABS: Tab[] = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "password", label: "Password", icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
  };

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 max-w-5xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-sm">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Settings</h1>
          <p className="text-zinc-500 text-sm">Manage your account preferences and settings.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <nav className="md:col-span-1 space-y-2">
          {SETTINGS_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button 
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-white text-violet-700 shadow-sm border border-violet-100" 
                    : "text-zinc-500 hover:bg-white hover:text-zinc-900 border border-transparent"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? "text-violet-600" : ""}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="md:col-span-2">
          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-zinc-900">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-violet-700 border-2 border-white shadow-md">
                  GS
                </div>
                <div>
                  <button type="button" className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm mb-2">
                    Change Avatar
                  </button>
                  <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-bold text-zinc-700">First Name</label>
                    <input id="firstName" type="text" defaultValue="Gabriella" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-bold text-zinc-700">Last Name</label>
                    <input id="lastName" type="text" defaultValue="Shiaan" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-zinc-700">Email Address</label>
                  <input id="email" type="email" defaultValue="gabriellashiaan@example.com" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-bold text-zinc-700">Bio</label>
                  <textarea id="bio" rows={4} defaultValue="Premium artifact collector." className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all resize-none" />
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md shadow-violet-200 transition-all hover:-translate-y-0.5">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Placeholders for other tabs */}
          {activeTab !== "profile" && (
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-zinc-500 font-medium">Content for {SETTINGS_TABS.find(t => t.id === activeTab)?.label} is under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
