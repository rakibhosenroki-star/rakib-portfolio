"use client";

import React from "react";
import { ProjectItem } from "@/lib/portfolio";
import { ExternalLink, Github, Terminal, Sparkles } from "lucide-react";

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
                SHOWCASE // PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              Featured <span className="text-neon-magenta">Projects</span>
            </h2>
            <p className="text-slate-400 font-mono text-sm max-w-xl">
              Real-world web systems and futuristic digital interfaces engineered for speed, responsiveness, and clean aesthetics.
            </p>
          </div>

          <div className="hidden md:block">
            <span className="font-mono text-xs text-[#00f0ff]/80 px-4 py-2 rounded-lg border border-[#00f0ff]/30 bg-[#00f0ff]/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              TOTAL DEPLOYED: {projects.length}
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const isAlt = idx % 2 === 1;
            return (
              <div
                key={project.id || idx}
                className="glass-panel rounded-2xl overflow-hidden border border-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              >
                {/* Image Container with Cyber Overlay */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-80" />
                  
                  {/* Category / ID Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#060913]/85 backdrop-blur-md border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase">
                    PROJ #{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-mono text-white group-hover:text-[#00f0ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/80 font-mono text-[11px] text-slate-300 group-hover:border-[#00f0ff]/30 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#00f0ff] hover:text-white transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Demo Private</span>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900/60 hover:bg-[#00f0ff]/10 text-slate-400 hover:text-[#00f0ff] transition-all border border-slate-800 hover:border-[#00f0ff]/40"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
