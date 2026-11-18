"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

interface ContactProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
            <MessageSquare className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
              TRANSMIT // GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
            Initiate <span className="text-neon-cyan">Connection</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto">
            Have an ambitious project in mind, need a full-stack engineer, or want to collaborate? Send a direct dispatch below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-[#00f0ff]/20 space-y-6">
              <h3 className="font-mono font-bold text-lg text-white uppercase tracking-wider flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"></span>
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400 uppercase">Official Email</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-mono text-white hover:text-[#00f0ff] transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400 uppercase">Direct Mobile</span>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-sm font-mono text-white hover:text-[#ff007f] transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-lg bg-[#9d4edd]/10 border border-[#9d4edd]/30 text-[#9d4edd]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400 uppercase">Based In</span>
                    <span className="text-sm font-mono text-white">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security info note */}
              <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20 font-mono text-xs text-slate-400 leading-relaxed">
                🛡️ All dispatches sent here are logged securely directly into the admin controller for review.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-2xl border border-[#00f0ff]/20 space-y-6 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Jensen"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-white font-mono text-sm placeholder-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-white font-mono text-sm placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Collaboration / Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-white font-mono text-sm placeholder-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Message Payload *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, and requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] text-white font-mono text-sm placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              {/* Status Feedback */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Message dispatched successfully! Rakib will respond shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full cyber-btn-cyan py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{status === "loading" ? "Transmitting..." : "Send Dispatch"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
