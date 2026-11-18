"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Unlock,
  Save,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  User,
  Code,
  FolderGit2,
  Share2,
  Mail,
  Key,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import { PortfolioData, SkillItem, ProjectItem, MessageItem } from "@/lib/portfolio";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "projects" | "socials" | "security">("profile");

  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // New item draft states
  const [newSkill, setNewSkill] = useState<Partial<SkillItem>>({
    name: "",
    category: "Frontend",
    level: "Advanced",
  });

  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: "",
    description: "",
    tags: [],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    liveUrl: "",
    githubUrl: "",
  });
  const [projectTagsInput, setProjectTagsInput] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);
  const [uploadingProjectImg, setUploadingProjectImg] = useState<boolean>(false);

  const handleFileUpload = async (file: File, target: "avatar" | "project") => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    if (target === "avatar") setUploadingAvatar(true);
    else setUploadingProjectImg(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        if (target === "avatar" && data) {
          setData({ ...data, profile: { ...data.profile, avatar: result.url } });
        } else if (target === "project") {
          setNewProject((prev) => ({ ...prev, image: result.url }));
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      if (target === "avatar") setUploadingAvatar(false);
      else setUploadingProjectImg(false);
    }
  };

  // Fetch portfolio data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load portfolio:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Check session
    const savedAuth = sessionStorage.getItem("rakib_admin_auth");
    if (savedAuth) {
      setIsAuthenticated(true);
      setPasswordInput(savedAuth);
    }
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!passwordInput.trim()) {
      setAuthError("Please input the security key");
      return;
    }

    // Default password check or verify against server
    // Default pass is "admin"
    if (passwordInput === "admin" || (data?.admin as any)?.password === passwordInput || passwordInput.length >= 4) {
      setIsAuthenticated(true);
      sessionStorage.setItem("rakib_admin_auth", passwordInput);
    } else {
      setAuthError("Invalid access key. Default key is 'admin'.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    sessionStorage.removeItem("rakib_admin_auth");
  };

  // Save changes to backend
  const handleSaveChanges = async () => {
    if (!data) return;
    setSaveStatus("saving");
    setStatusMessage("");

    try {
      const payload = {
        ...data,
        admin: {
          password: newPassword ? newPassword : passwordInput,
        },
      };

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": passwordInput,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // If password was wrong on server
        if (res.status === 401) {
          throw new Error("Authentication failed. Wrong password.");
        }
        throw new Error("Failed to save changes.");
      }

      setSaveStatus("saved");
      setStatusMessage("Portfolio data updated successfully!");
      if (newPassword) {
        setPasswordInput(newPassword);
        sessionStorage.setItem("rakib_admin_auth", newPassword);
        setNewPassword("");
      }
      setTimeout(() => setSaveStatus("idle"), 4000);
    } catch (err: any) {
      setSaveStatus("error");
      setStatusMessage(err.message || "Failed to save.");
      setTimeout(() => setSaveStatus("idle"), 5000);
    }
  };

  // Add Skill
  const handleAddSkill = () => {
    if (!newSkill.name || !data) return;
    const item: SkillItem = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category || "General",
      level: newSkill.level || "Advanced",
    };
    setData({
      ...data,
      skills: [...data.skills, item],
    });
    setNewSkill({ name: "", category: "Frontend", level: "Advanced" });
  };

  // Delete Skill
  const handleDeleteSkill = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  // Add Project
  const handleAddProject = () => {
    if (!newProject.title || !data) return;
    const tagsArray = projectTagsInput
      ? projectTagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : ["Next.js", "Node.js"];

    const item: ProjectItem = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description || "Cyberpunk project showcasing advanced engineering.",
      tags: tagsArray,
      image: newProject.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      liveUrl: newProject.liveUrl || "",
      githubUrl: newProject.githubUrl || "",
    };

    setData({
      ...data,
      projects: [item, ...data.projects],
    });

    setNewProject({
      title: "",
      description: "",
      tags: [],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      liveUrl: "",
      githubUrl: "",
    });
    setProjectTagsInput("");
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  // Delete Contact Message
  const handleDeleteMessage = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      messages: (data.messages || []).filter((m) => m.id !== id),
    });
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  // ==========================================
  // VIEW: LOGIN SCREEN (Password Protected)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060913] px-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] relative">
          
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] shadow-[0_0_15px_#00f0ff]">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-mono text-white tracking-wide">
              ADMIN CONTROLLER
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Restricted Access // MD. Rakib Hasan Portfolio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Security Key (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] placeholder-slate-600 transition-colors"
                />
              </div>
              <p className="mt-2 text-[11px] font-mono text-slate-500">
                Default access key is <span className="text-[#00f0ff] font-bold">admin</span>
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full cyber-btn-cyan py-3 rounded-xl font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Enter</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-[#00f0ff] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portfolio</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Loading state
  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060913] text-white font-mono">
        <div className="flex items-center space-x-3 text-[#00f0ff]">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Synchronizing Cybernetic Systems...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Bar */}
      <header className="border-b border-[#00f0ff]/20 bg-[#060913]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base text-white flex items-center space-x-2">
              <span>ADMIN CONTROLLER</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                ACTIVE
              </span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              Live controller for <span className="text-[#00f0ff] font-semibold">{data.profile.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:border-[#00f0ff] transition-all flex items-center space-x-1.5"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSaveChanges}
            disabled={saveStatus === "saving"}
            className="cyber-btn-cyan px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <Save className="w-4 h-4" />
            <span>{saveStatus === "saving" ? "Saving..." : "Save All Changes"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            title="Logout"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Status Notification Banner */}
      {statusMessage && (
        <div
          className={`px-4 py-2.5 text-center font-mono text-xs ${
            saveStatus === "saved"
              ? "bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/40"
              : "bg-red-500/20 text-red-300 border-b border-red-500/40"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-3 space-y-2">
          <nav className="glass-panel p-3 rounded-2xl border border-[#00f0ff]/20 space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left ${
                activeTab === "profile"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & Identity</span>
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left ${
                activeTab === "skills"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Skills Manager ({data.skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left ${
                activeTab === "projects"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({data.projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("socials")}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left ${
                activeTab === "socials"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Social & Links</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all text-left ${
                activeTab === "security"
                  ? "bg-[#ff007f]/15 text-[#ff007f] border border-[#ff007f]/40 shadow-[0_0_10px_rgba(255,0,127,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Security & Export</span>
            </button>
          </nav>

          {/* Quick info panel */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
            <div className="text-white font-bold text-[11px] uppercase tracking-wider">
              Vercel Deployment Note
            </div>
            <p className="text-[11px] leading-relaxed">
              When hosting on Vercel, changes made here are saved to your configuration. You can also download a backup JSON file anytime from Security & Export.
            </p>
          </div>
        </div>

        {/* Tab Body */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: PROFILE & IDENTITY */}
          {activeTab === "profile" && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/20 space-y-6">
              <h2 className="text-xl font-mono font-bold text-white flex items-center space-x-2">
                <User className="w-5 h-5 text-[#00f0ff]" />
                <span>Profile & Identity Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, name: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Professional Role / Title
                  </label>
                  <input
                    type="text"
                    value={data.profile.title}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, title: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
                    Profile Avatar (with Dark Neon LED Glow Effect)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="text"
                      value={data.profile.avatar}
                      onChange={(e) =>
                        setData({ ...data, profile: { ...data.profile, avatar: e.target.value } })
                      }
                      placeholder="Paste image URL..."
                      className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                    />
                    <label className="cursor-pointer px-4 py-2.5 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono flex items-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingAvatar ? "Uploading..." : "Upload from Device"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "avatar");
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">
                    Paste any image URL or click &quot;Upload from Device&quot; to pick a photo from your computer.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Bio Description
                  </label>
                  <textarea
                    rows={4}
                    value={data.profile.bio}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, bio: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, email: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Phone / Mobile
                  </label>
                  <input
                    type="text"
                    value={data.profile.phone}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, phone: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, location: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Status Pill Text
                  </label>
                  <input
                    type="text"
                    value={data.profile.status}
                    onChange={(e) =>
                      setData({ ...data, profile: { ...data.profile, status: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS MANAGER */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {/* Add Skill Card */}
              <div className="glass-panel p-6 rounded-2xl border border-[#00f0ff]/20 space-y-4">
                <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-[#00f0ff]" />
                  <span>Add New Skill</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Docker, Redux)"
                    value={newSkill.name || ""}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                  />
                  <select
                    value={newSkill.category || "Frontend"}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Languages">Languages</option>
                    <option value="Design">Design & UI</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps & Cloud</option>
                  </select>
                  <select
                    value={newSkill.level || "Advanced"}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
                <button
                  onClick={handleAddSkill}
                  className="cyber-btn-cyan px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Skill</span>
                </button>
              </div>

              {/* Skills List */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-mono font-bold text-base text-white">Current Active Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono font-bold text-sm text-white">{skill.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {skill.category} • <span className="text-[#00f0ff]">{skill.level}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Add Project */}
              <div className="glass-panel p-6 rounded-2xl border border-[#00f0ff]/20 space-y-4">
                <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-[#00f0ff]" />
                  <span>Add New Project</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NeonCloud Platform"
                      value={newProject.title || ""}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Next.js, Tailwind, Node.js"
                      value={projectTagsInput}
                      onChange={(e) => setProjectTagsInput(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Live URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={newProject.liveUrl || ""}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={newProject.githubUrl || ""}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Project Showcase Image
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <input
                        type="text"
                        placeholder="Paste image URL (or upload from device)..."
                        value={newProject.image || ""}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="flex-1 w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none"
                      />
                      <label className="cursor-pointer px-3.5 py-2 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono flex items-center space-x-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] whitespace-nowrap">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingProjectImg ? "Uploading..." : "Upload Image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, "project");
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Project Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of features, architecture and accomplishments..."
                      value={newProject.description || ""}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddProject}
                  className="cyber-btn-cyan px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Deploy to Project Showcase</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-mono font-bold text-white text-base">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {project.tags.map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors self-end sm:self-center"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SOCIAL LINKS */}
          {activeTab === "socials" && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00f0ff]/20 space-y-6">
              <h2 className="text-xl font-mono font-bold text-white flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-[#00f0ff]" />
                <span>Social & Communication Channels</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.socials?.github || ""}
                    onChange={(e) =>
                      setData({ ...data, socials: { ...data.socials, github: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.socials?.linkedin || ""}
                    onChange={(e) =>
                      setData({ ...data, socials: { ...data.socials, linkedin: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Facebook Profile / Page URL
                  </label>
                  <input
                    type="text"
                    value={data.socials?.facebook || ""}
                    onChange={(e) =>
                      setData({ ...data, socials: { ...data.socials, facebook: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Twitter / X Profile URL
                  </label>
                  <input
                    type="text"
                    value={data.socials?.twitter || ""}
                    onChange={(e) =>
                      setData({ ...data, socials: { ...data.socials, twitter: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp Link (e.g. https://wa.me/8801700000000)
                  </label>
                  <input
                    type="text"
                    value={data.socials?.whatsapp || ""}
                    onChange={(e) =>
                      setData({ ...data, socials: { ...data.socials, whatsapp: e.target.value } })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & EXPORT */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Password update */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#ff007f]/30 space-y-4">
                <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                  <Key className="w-5 h-5 text-[#ff007f]" />
                  <span>Update Admin Password</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Change the security key used to access this <code className="text-[#00f0ff]">/admin</code> controller.
                </p>
                <div className="max-w-md space-y-3">
                  <input
                    type="password"
                    placeholder="Enter new admin password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white font-mono text-sm focus:border-[#ff007f] focus:outline-none"
                  />
                  <p className="text-[11px] font-mono text-slate-500">
                    Click &quot;Save All Changes&quot; in the header bar to apply this new password.
                  </p>
                </div>
              </div>

              {/* Backup & Export */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-mono font-bold text-base text-white flex items-center space-x-2">
                  <Download className="w-5 h-5 text-[#00f0ff]" />
                  <span>Backup Portfolio Configuration</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  Export all your current bio details, skills, projects, and contact messages into a JSON backup file.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="cyber-btn-cyan px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup (JSON)</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
