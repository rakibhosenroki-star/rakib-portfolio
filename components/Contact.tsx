"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, ExternalLink, Sparkles, Terminal } from "lucide-react";

interface ContactProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
            <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
              CONNECT // DIRECT CHANNELS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
            Get In <span className="text-neon-cyan">Touch</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto">
            Available for new opportunities, contract engineering, and freelance development. Reach out directly through any channel below.
          </p>
        </div>

        {/* Direct Contact Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Official Email */}
          <div className="glass-panel p-8 rounded-2xl border border-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] group">
            <div className="p-4 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
              <Mail className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-bold text-lg text-white">Direct Email</h3>
              <p className="text-xs font-mono text-slate-400">
                Send an official inquiry or dispatch
              </p>
              <p className="font-mono text-sm text-[#00f0ff] break-all pt-1">
                {profile.email}
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="w-full cyber-btn-cyan py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-2"
            >
              <span>Mail Directly</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: WhatsApp / Phone */}
          <div className="glass-panel p-8 rounded-2xl border border-[#00ff66]/20 hover:border-[#00ff66]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 hover:shadow-[0_0_25px_rgba(0,255,102,0.25)] group">
            <div className="p-4 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] group-hover:shadow-[0_0_15px_#00ff66] transition-all">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-bold text-lg text-white">WhatsApp & Phone</h3>
              <p className="text-xs font-mono text-slate-400">
                Instant chat & direct voice call
              </p>
              <p className="font-mono text-sm text-[#00ff66] pt-1">
                {profile.phone}
              </p>
            </div>
            <a
              href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-2 bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/40 hover:bg-[#00ff66] hover:text-[#060913] transition-all shadow-[0_0_15px_rgba(0,255,102,0.2)]"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Location & Status */}
          <div className="glass-panel p-8 rounded-2xl border border-[#ff007f]/20 hover:border-[#ff007f]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-6 hover:shadow-[0_0_25px_rgba(255,0,127,0.25)] group">
            <div className="p-4 rounded-2xl bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] group-hover:shadow-[0_0_15px_#ff007f] transition-all">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-bold text-lg text-white">Base Location</h3>
              <p className="text-xs font-mono text-slate-400">
                Operating time zone: GMT+6
              </p>
              <p className="font-mono text-sm text-[#ff007f] pt-1">
                {profile.location}
              </p>
            </div>
            <div className="w-full py-3 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 bg-slate-900/60 inline-flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
              <span>Available Globally (Remote)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
