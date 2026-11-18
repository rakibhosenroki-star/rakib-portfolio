import React from "react";
import { getPortfolioData } from "@/lib/portfolio";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Force dynamic rendering so edits made via admin dashboard show up immediately
export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <main className="min-h-screen flex flex-col relative selection:bg-[#00f0ff] selection:text-[#060913]">
      {/* Navigation Header with 3 Menus */}
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
