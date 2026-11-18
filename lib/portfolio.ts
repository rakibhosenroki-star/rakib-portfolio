import fs from "fs";
import path from "path";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: string;
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    avatar: string;
    email: string;
    phone: string;
    location: string;
    status: string;
    resumeUrl: string;
  };
  socials: {
    github: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
    telegram?: string;
  };
  skills: SkillItem[];
  projects: ProjectItem[];
  messages: MessageItem[];
  admin: {
    password: string;
  };
}

const dataFilePath = path.join(process.cwd(), "data", "portfolio.json");

export function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading portfolio data:", error);
  }
  
  // Default fallback data
  return {
    profile: {
      name: "MD. Rakib Hasan",
      title: "Full Stack Developer & Node.js Specialist",
      tagline: "Crafting futuristic, high-performance web experiences with Tailwind CSS, Node.js & Cyberpunk Glassmorphism.",
      bio: "Hi, I am MD. Rakib Hasan. A dedicated Full Stack Web Developer focused on building blazing-fast, responsive web applications with modern architectures, clean code, and sleek cyberpunk neon aesthetics.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      email: "rakibhasan@example.com",
      phone: "+880 1700-000000",
      location: "Dhaka, Bangladesh",
      status: "Available for New Projects & Full-time Roles",
      resumeUrl: "#"
    },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      whatsapp: "https://wa.me/",
      telegram: "https://t.me/"
    },
    skills: [],
    projects: [],
    messages: [],
    admin: {
      password: "admin"
    }
  };
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return false;
  }
}
