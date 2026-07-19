"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Mail, Plus, ChevronDown } from "lucide-react";

export default function ProfilePage() {
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>("https://i.pravatar.cc/150?img=47"); // A default placeholder to look like the design
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm min-h-screen">
      {/* Cover Photo */}
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-blue-100 via-indigo-50 to-orange-50 overflow-hidden group">
        {coverPhoto && (
          <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        )}
        <button
          onClick={() => coverInputRef.current?.click()}
          className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full shadow transition-colors z-10 opacity-0 group-hover:opacity-100"
          title="Change Cover Photo"
        >
          <Camera className="w-5 h-5 text-gray-700" />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={coverInputRef}
          onChange={handleCoverPhotoChange}
        />
      </div>

      {/* Profile Info Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 -mt-16 mb-10 relative z-10">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shrink-0 group">
            {profilePhoto ? (
               <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">No Image</span>
               </div>
            )}
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={profileInputRef}
              onChange={handleProfilePhotoChange}
            />
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Alexa Rawles</h1>
            <p className="text-gray-500">alexarawles@gmail.com</p>
          </div>
        </div>
        <div className="mb-2 px-6 md:px-0 w-full md:w-auto flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 h-auto text-sm font-medium">
            Edit
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Nick Name</label>
            <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <div className="relative">
              <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11 pr-10" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Country</label>
            <div className="relative">
              <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11 pr-10" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Language</label>
            <div className="relative">
              <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11 pr-10" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Time Zone</label>
            <div className="relative">
              <Input placeholder="Your First Name" className="bg-gray-50/50 border-gray-100 h-11 pr-10" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="px-6 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">My email Address</h3>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <div className="bg-blue-600 rounded-full p-1.5">
               <Mail className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">alexarawles@gmail.com</p>
            <p className="text-gray-500 text-sm mt-0.5">1 month ago</p>
          </div>
        </div>

        <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Email Address
        </button>
      </div>
    </div>
  );
}
