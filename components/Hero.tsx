"use client";

import React from "react";
import { ArrowRight, Download, Terminal, Cpu, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

interface HeroProps {
  profile: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    avatar: string;
    location: string;
    status: string;
    resumeUrl: string;
  };
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background ambient neon glow spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#ff007f]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff66]"></span>
              </span>
              <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                {profile.status || "Open to Projects & Hiring"}
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="font-mono text-sm tracking-widest text-[#ff007f] uppercase flex items-center justify-center lg:justify-start space-x-2">
                <Cpu className="w-4 h-4 text-[#ff007f] animate-pulse" />
                <span>CYBER_IDENTITY // ONLINE</span>
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-mono">
                {profile.name}
              </h1>
              <h2 className="text-xl sm:text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-slate-200 to-[#ff007f] font-semibold">
                {profile.title}
              </h2>
            </div>

            {/* Tagline / Bio in Glassmorphism Card */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00f0ff] to-[#ff007f]" />
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {profile.bio}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5 text-[#00f0ff]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">Tailwind CSS & Node.js Specialist</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="cyber-btn-cyan px-7 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider uppercase inline-flex items-center space-x-2 shadow-lg"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="cyber-btn-magenta px-7 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider uppercase inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Initiate Contact</span>
                <Sparkles className="w-4 h-4" />
              </a>

              {profile.resumeUrl && profile.resumeUrl !== "#" && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-mono text-sm tracking-wider uppercase border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white inline-flex items-center space-x-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Profile Picture with Dark Neon LED Background Glow */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              
              {/* Outer Pulsing Dark Neon LED Halo */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-[#00f0ff] via-[#9d4edd] to-[#ff007f] opacity-75 blur-2xl group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-300" />

              {/* Second Dark Neon LED Ring Layer with Rotating Cyber Gradient */}
              <div className="absolute -inset-1.5 sm:-inset-2 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#ff007f] opacity-90 blur-sm animate-led-glow" />

              {/* Cyberpunk Scanner Orbit / HUD Ring */}
              <div className="absolute -inset-8 sm:-inset-10 rounded-full border border-[#00f0ff]/20 border-dashed animate-spin [animation-duration:25s] pointer-events-none" />
              <div className="absolute -inset-12 sm:-inset-14 rounded-full border border-[#ff007f]/10 border-dotted pointer-events-none" />

              {/* Corner Tech Badges */}
              <div className="absolute -top-3 -right-3 z-20 px-3 py-1 rounded-md bg-[#060913]/90 border border-[#00f0ff] shadow-[0_0_12px_#00f0ff] font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase backdrop-blur-md">
                NODE.JS
              </div>
              <div className="absolute -bottom-3 -left-3 z-20 px-3 py-1 rounded-md bg-[#060913]/90 border border-[#ff007f] shadow-[0_0_12px_#ff007f] font-mono text-[10px] text-[#ff007f] tracking-widest uppercase backdrop-blur-md">
                TAILWIND
              </div>

              {/* Profile Image Circular Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[#060913] bg-[#0a0e1a] shadow-[0_0_35px_rgba(0,240,255,0.6),inset_0_0_20px_rgba(0,0,0,0.8)]">
                {/* Fallback & Image */}
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center filter saturate-110 contrast-105 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to elegant cyber avatar if user's image URL is broken
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                
                {/* Subtle cyber scanlines overlay across image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
