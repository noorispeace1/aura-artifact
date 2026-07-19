"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export function ProfileView() {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  // Form State
  const [userId, setUserId] = useState("Kshiti123");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("123 456 7890");
  const [profession, setProfession] = useState("Web Developer and Designer");
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const profileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setProfilePhoto(user.image || null);
      setUserId(user.id?.substring(0, 8) || "user123");
      
      const savedPhone = localStorage.getItem(`phone_${user.id}`);
      if (savedPhone) setPhone(savedPhone);
      
      const savedProfession = localStorage.getItem(`prof_${user.id}`);
      if (savedProfession) setProfession(savedProfession);
    }
  }, [user]);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await authClient.updateUser({
        name: fullName,
        image: profilePhoto || undefined,
      });
      
      localStorage.setItem(`phone_${user.id}`, phone);
      localStorage.setItem(`prof_${user.id}`, profession);
      
      if (refetch) refetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto p-10 bg-white border-t-4 border-t-white shadow-sm font-sans mt-10">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column (Image & Links) */}
        <div className="w-full md:w-[35%] flex flex-col items-center md:items-start">
          {/* Profile Image */}
          <div className="relative group w-full max-w-[220px] aspect-square overflow-hidden bg-zinc-200">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-300 text-zinc-500 font-bold text-6xl uppercase">
                {fullName.charAt(0) || "U"}
              </div>
            )}
            
            {/* Change Photo Overlay */}
            <div 
              onClick={() => isEditing && profileInputRef.current?.click()}
              className={`absolute bottom-0 w-full bg-black/70 text-white text-center py-2.5 text-[13px] font-semibold transition-opacity duration-300 ${isEditing ? 'opacity-100 cursor-pointer hover:bg-black/90' : 'opacity-0'}`}
            >
              Change Photo
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={profileInputRef}
              onChange={handleProfilePhotoChange}
            />
          </div>

          <div className="mt-10 w-full max-w-[220px] hidden md:block">
            <h4 className="text-[11px] font-bold text-zinc-400 mb-4 tracking-wider">WORK LINK</h4>
            <div className="flex flex-col gap-3 text-[14px] text-zinc-800 font-bold mb-10">
              <a href="#" className="hover:text-blue-600 transition-colors">Website Link</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Bootsnipp Profile</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Bootply Profile</a>
            </div>

            <h4 className="text-[11px] font-bold text-zinc-400 mb-4 tracking-wider">SKILLS</h4>
            <div className="flex flex-col gap-3 text-[14px] text-zinc-800 font-bold">
              <span>Web Designer</span>
              <span>Web Developer</span>
              <span>WordPress</span>
              <span>WooCommerce</span>
              <span>PHP, .Net</span>
            </div>
          </div>
        </div>

        {/* Right Column (Info & Tabs) */}
        <div className="w-full md:w-[65%]">
          {/* Header Info */}
          <div className="flex justify-between items-start mb-6 border-b border-zinc-100 pb-8">
            <div>
              <h1 className="text-[28px] font-bold text-zinc-800 mb-1 leading-tight">{fullName || "User"}</h1>
              <h2 className="text-[16px] font-bold text-blue-600 mb-4">{profession}</h2>
              <p className="text-[11px] font-bold text-zinc-400 tracking-wider">RANKINGS : <span className="text-zinc-800">8/10</span></p>
            </div>
            
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-5 py-2 rounded-full text-xs font-bold transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-10 mb-8 border-b border-zinc-100 relative">
            <button 
              onClick={() => setActiveTab("about")}
              className={`pb-4 text-[15px] font-bold transition-colors relative ${activeTab === "about" ? "text-zinc-800" : "text-blue-600 hover:text-blue-700"}`}
            >
              About
              {activeTab === "about" && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-500"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab("timeline")}
              className={`pb-4 text-[15px] font-bold transition-colors relative ${activeTab === "timeline" ? "text-zinc-800" : "text-blue-600 hover:text-blue-700"}`}
            >
              Timeline
              {activeTab === "timeline" && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-500"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            {activeTab === "about" && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[140px_1fr] items-center">
                  <span className="text-[15px] font-bold text-zinc-800">User Id</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={userId} 
                      onChange={e => setUserId(e.target.value)}
                      className="border border-zinc-300 rounded px-3 py-1.5 text-[15px] text-blue-600 font-bold focus:outline-none focus:border-blue-500 w-full max-w-[300px]"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-blue-600">{userId}</span>
                  )}
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center">
                  <span className="text-[15px] font-bold text-zinc-800">Name</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)}
                      className="border border-zinc-300 rounded px-3 py-1.5 text-[15px] text-blue-600 font-bold focus:outline-none focus:border-blue-500 w-full max-w-[300px]"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-blue-600">{fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center">
                  <span className="text-[15px] font-bold text-zinc-800">Email</span>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="border border-zinc-300 rounded px-3 py-1.5 text-[15px] text-blue-600 font-bold focus:outline-none focus:border-blue-500 w-full max-w-[300px]"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-blue-600">{email}</span>
                  )}
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center">
                  <span className="text-[15px] font-bold text-zinc-800">Phone</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={e => setPhone(e.target.value)}
                      className="border border-zinc-300 rounded px-3 py-1.5 text-[15px] text-blue-600 font-bold focus:outline-none focus:border-blue-500 w-full max-w-[300px]"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-blue-600">{phone}</span>
                  )}
                </div>

                <div className="grid grid-cols-[140px_1fr] items-start">
                  <span className="text-[15px] font-bold text-zinc-800 mt-1">Profession</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={profession} 
                      onChange={e => setProfession(e.target.value)}
                      className="border border-zinc-300 rounded px-3 py-1.5 text-[15px] text-blue-600 font-bold focus:outline-none focus:border-blue-500 w-full max-w-[300px]"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-blue-600 leading-snug max-w-[200px] block">{profession}</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="text-zinc-500 text-[15px] font-bold py-4">
                No timeline data available yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
