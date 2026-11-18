"use client";

import React from "react";
import { SkillItem } from "@/lib/portfolio";
import { Code, Server, Sparkles, Layers, Cpu } from "lucide-react";

interface SkillsProps {
  skills: SkillItem[];
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category if desired, or show responsive cyber grid
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/30">
            <Cpu className="w-3.5 h-3.5 text-[#ff007f]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff007f]">
              TECH_STACK & CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
            Core <span className="text-neon-cyan">Technologies</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
            Engineered with modern full-stack architectures, high-performance Node.js backends & precision Tailwind CSS interfaces.
          </p>
        </div>

        {/* Skills Cyber Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const isMagenta = index % 2 === 1;
            return (
              <div
                key={skill.id || index}
                className={`glass-panel glass-card-hover p-6 rounded-2xl relative overflow-hidden group border ${
                  isMagenta
                    ? "border-[#ff007f]/20 hover:border-[#ff007f]/60 hover:shadow-[0_0_20px_rgba(255,0,127,0.3)]"
                    : "border-[#00f0ff]/20 hover:border-[#00f0ff]/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                }`}
              >
                {/* Neon accent corner */}
                <div
                  className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl ${
                    isMagenta
                      ? "from-[#ff007f]/30 to-transparent"
                      : "from-[#00f0ff]/30 to-transparent"
                  } rounded-bl-2xl`}
                />

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isMagenta
                        ? "bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f]"
                        : "bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]"
                    }`}
                  >
                    {skill.category === "Backend" ? (
                      <Server className="w-6 h-6" />
                    ) : skill.category === "Design" ? (
                      <Sparkles className="w-6 h-6" />
                    ) : (
                      <Code className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border ${
                      isMagenta
                        ? "text-[#ff007f] border-[#ff007f]/40 bg-[#ff007f]/5"
                        : "text-[#00f0ff] border-[#00f0ff]/40 bg-[#00f0ff]/5"
                    }`}
                  >
                    {skill.level || "Proficient"}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-mono text-white group-hover:text-[#00f0ff] transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                  {skill.category}
                </p>

                {/* Cyber Progress Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isMagenta
                          ? "bg-gradient-to-r from-[#ff007f] to-[#9d4edd] shadow-[0_0_8px_#ff007f]"
                          : "bg-gradient-to-r from-[#00f0ff] to-[#00ff66] shadow-[0_0_8px_#00f0ff]"
                      }`}
                      style={{
                        width:
                          skill.level === "Expert" || skill.level === "Specialist"
                            ? "95%"
                            : skill.level === "Advanced"
                            ? "85%"
                            : "75%",
                      }}
                    />
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
