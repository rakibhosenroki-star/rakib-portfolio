"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Shield, Terminal } from "lucide-react";

interface NavbarProps {
  name?: string;
}

export default function Navbar({ name = "MD. Rakib Hasan" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060913]/85 backdrop-blur-md border-b border-[#00f0ff]/20 shadow-[0_4px_30px_rgba(0,240,255,0.1)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Group: Logo + Menus Side by Side on the Left */}
          <div className="flex items-center space-x-8 lg:space-x-12">
            {/* Logo / Brand Name */}
            <Link href="/" className="group flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_20px_#00f0ff] transition-all duration-300">
                <Terminal className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-lg tracking-wider text-white group-hover:text-[#00f0ff] transition-colors">
                  {name.split(" ")[0]}
                  <span className="text-[#00f0ff]">.</span>
                  <span className="text-[#ff007f]">{name.split(" ").slice(1).join(" ")}</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#00f0ff]/70 uppercase">
                  &lt;CYBER_DEV /&gt;
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Left Aligned, Sequential (por por) */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 pl-4 border-l border-slate-800">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative font-mono text-sm uppercase tracking-wider text-slate-300 hover:text-[#00f0ff] transition-colors duration-200 py-1 flex items-center space-x-1.5 group"
                >
                  <span className="text-[11px] font-semibold text-[#00f0ff]">0{idx + 1}.</span>
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ff007f] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00f0ff]"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side: Admin Dashboard Discreet Controller Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono border border-[#00f0ff]/40 bg-[#00f0ff]/5 text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:shadow-[0_0_18px_rgba(0,240,255,0.4)]"
              title="Admin Dashboard Controller"
            >
              <Shield className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>ADMIN PORTAL</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/admin"
              className="p-2 rounded-md border border-[#00f0ff]/30 text-[#00f0ff]"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#060913]/95 backdrop-blur-xl border-b border-[#00f0ff]/30 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 font-mono text-base uppercase tracking-wider text-slate-200 hover:text-[#00f0ff] py-2 px-3 rounded-md hover:bg-[#00f0ff]/10 border-l-2 border-transparent hover:border-[#00f0ff] transition-all"
            >
              <span className="text-xs text-[#00f0ff] font-bold">0{idx + 1}.</span>
              <span>{link.name}</span>
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-xs uppercase tracking-wider hover:bg-[#00f0ff] hover:text-black transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
