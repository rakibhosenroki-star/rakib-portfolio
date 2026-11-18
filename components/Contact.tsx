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
  socials?: {
    whatsapp?: string;
    telegram?: string;
  };
}

// Custom Telegram Icon SVG for brand accuracy
function TelegramIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export default function Contact({ profile, socials = {} }: ContactProps) {
  const telegramUrl = socials.telegram || "https://t.me/rakibhasan";
  const whatsappUrl = socials.whatsapp || `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`;

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
            Available for new opportunities, contract engineering, and freelance development. Reach out directly through Telegram, WhatsApp, or Email.
          </p>
        </div>

        {/* Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Telegram Direct */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#229ED9]/30 hover:border-[#229ED9] transition-all duration-300 text-center flex flex-col items-center justify-between space-y-5 hover:shadow-[0_0_25px_rgba(34,158,217,0.35)] group">
            <div className="p-3.5 rounded-2xl bg-[#229ED9]/15 border border-[#229ED9]/40 text-[#229ED9] group-hover:shadow-[0_0_15px_#229ED9] transition-all">
              <TelegramIcon className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-mono font-bold text-base text-white">Telegram</h3>
              <p className="text-xs font-mono text-slate-400">
                Instant messaging & dispatch
              </p>
              <p className="font-mono text-xs text-[#229ED9] break-all pt-1 font-semibold">
                {telegramUrl.replace("https://t.me/", "@")}
              </p>
            </div>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-1.5 bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/50 hover:bg-[#229ED9] hover:text-[#060913] transition-all shadow-[0_0_15px_rgba(34,158,217,0.25)]"
            >
              <span>Open Telegram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: WhatsApp / Phone */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#00ff66]/20 hover:border-[#00ff66]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-5 hover:shadow-[0_0_25px_rgba(0,255,102,0.25)] group">
            <div className="p-3.5 rounded-2xl bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] group-hover:shadow-[0_0_15px_#00ff66] transition-all">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-mono font-bold text-base text-white">WhatsApp</h3>
              <p className="text-xs font-mono text-slate-400">
                Direct chat & voice call
              </p>
              <p className="font-mono text-xs text-[#00ff66] pt-1 font-semibold">
                {profile.phone}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-1.5 bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/40 hover:bg-[#00ff66] hover:text-[#060913] transition-all shadow-[0_0_15px_rgba(0,255,102,0.2)]"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Official Email */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-5 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] group">
            <div className="p-3.5 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
              <Mail className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-mono font-bold text-base text-white">Direct Email</h3>
              <p className="text-xs font-mono text-slate-400">
                Official project inquiry
              </p>
              <p className="font-mono text-xs text-[#00f0ff] break-all pt-1 font-semibold">
                {profile.email}
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="w-full cyber-btn-cyan py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-1.5"
            >
              <span>Send Email</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Location & Status */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#ff007f]/20 hover:border-[#ff007f]/60 transition-all duration-300 text-center flex flex-col items-center justify-between space-y-5 hover:shadow-[0_0_25px_rgba(255,0,127,0.25)] group">
            <div className="p-3.5 rounded-2xl bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] group-hover:shadow-[0_0_15px_#ff007f] transition-all">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-mono font-bold text-base text-white">Base Location</h3>
              <p className="text-xs font-mono text-slate-400">
                Timezone: GMT+6
              </p>
              <p className="font-mono text-xs text-[#ff007f] pt-1 font-semibold">
                {profile.location}
              </p>
            </div>
            <div className="w-full py-2.5 rounded-xl font-mono text-[11px] text-slate-300 border border-slate-800 bg-slate-900/60 inline-flex items-center justify-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
              <span>Open to Remote</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
