"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Facebook,
  Twitter,
  MessageCircle,
  ArrowUp,
  Terminal,
  Shield,
  Heart,
  Cpu,
} from "lucide-react";

interface FooterProps {
  name?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
  };
}

export default function Footer({
  name = "MD. Rakib Hasan",
  socials = {},
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#00f0ff]/20 bg-[#04060d]/90 backdrop-blur-xl relative overflow-hidden">
      {/* Subtle top neon line glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff]">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-mono font-bold text-lg text-white tracking-wider">
                {name}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-mono">
              Full Stack Web Engineer specialized in robust Node.js architectures, modern responsive Tailwind CSS design, and sleek cyberpunk aesthetics.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
              <span>SYSTEMS 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider text-[#00f0ff]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 font-mono text-sm">
              <li>
                <a href="#about" className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center space-x-2">
                  <span className="text-[#00f0ff] text-xs">&gt;</span>
                  <span>About & Bio</span>
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center space-x-2">
                  <span className="text-[#00f0ff] text-xs">&gt;</span>
                  <span>Tech Stack & Skills</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center space-x-2">
                  <span className="text-[#00f0ff] text-xs">&gt;</span>
                  <span>Featured Projects</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center space-x-2">
                  <span className="text-[#00f0ff] text-xs">&gt;</span>
                  <span>Contact Transceiver</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider text-[#ff007f]">
              Cyber Channels
            </h4>
            <p className="text-slate-400 text-xs font-mono">
              Connect with me on modern networks and developer platforms:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00f0ff] text-slate-400 hover:text-[#00f0ff] transition-all hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00f0ff] text-slate-400 hover:text-[#00f0ff] transition-all hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#ff007f] text-slate-400 hover:text-[#ff007f] transition-all hover:shadow-[0_0_12px_rgba(255,0,127,0.4)]"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00f0ff] text-slate-400 hover:text-[#00f0ff] transition-all hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socials.whatsapp && (
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#00ff66] text-slate-400 hover:text-[#00ff66] transition-all hover:shadow-[0_0_12px_rgba(0,255,102,0.4)]"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Admin & Security Section */}
          <div className="space-y-4">
            <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              System Admin
            </h4>
            <p className="text-slate-400 text-xs font-mono">
              Secure dashboard controller protected by authentication:
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-xs uppercase tracking-wider hover:bg-[#00f0ff] hover:text-[#060913] transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <Shield className="w-4 h-4" />
              <span>Enter /admin Dashboard</span>
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">{name}</span>. All Rights Reserved. Engineered with Next.js, Node.js & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00f0ff] text-slate-400 hover:text-[#00f0ff] transition-all group"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
