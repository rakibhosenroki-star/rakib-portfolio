"use client";

import React, { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/portfolio";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

interface HomePageClientProps {
  initialData: PortfolioData;
}

export default function HomePageClient({ initialData }: HomePageClientProps) {
  const [data, setData] = useState<PortfolioData>(initialData);

  // Sync with localStorage on client-side for instant updates
  useEffect(() => {
    try {
      const cached = localStorage.getItem("rakib_portfolio_data");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.profile?.name) {
          setData(parsed);
        }
      }
    } catch (e) {
      console.error("Local sync error:", e);
    }

    // Also fetch fresh from API
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((fresh) => {
        if (fresh && fresh.profile) {
          setData(fresh);
        }
      })
      .catch(() => {});

    // Listen to live update event across tabs
    const handleStorageUpdate = () => {
      try {
        const updated = localStorage.getItem("rakib_portfolio_data");
        if (updated) {
          setData(JSON.parse(updated));
        }
      } catch (e) {}
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("portfolio-updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("portfolio-updated", handleStorageUpdate);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-[#00f0ff] selection:text-[#060913]">
      {/* Navigation Header with 3 Menus aligned left */}
      <Navbar name={data.profile.name} />

      {/* Hero Section with Name, Tagline & Dark Neon LED Glow Avatar */}
      <Hero profile={data.profile} />

      {/* Skills Section with Glassmorphism Cards */}
      <Skills skills={data.skills} />

      {/* Featured Projects Section */}
      <Projects projects={data.projects} />

      {/* Contact Section with Direct Channels */}
      <Contact profile={data.profile} socials={data.socials} />

      {/* Full Professional Footer */}
      <Footer name={data.profile.name} socials={data.socials} />
    </main>
  );
}
