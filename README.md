# 🚀 MD. Rakib Hasan — Cyberpunk Glassmorphism Portfolio & Admin Controller

A futuristic, high-performance portfolio engineered with **Next.js 14**, **Tailwind CSS**, and **Node.js** architecture, featuring a Dark Cyberpunk aesthetic, Glassmorphism UI, Dark Neon LED Glow effects, and a password-protected `/admin` dashboard.

---

## ✨ Features

- **Cyberpunk + Glassmorphism UI**: High-tech neon cyan (`#00f0ff`) and neon magenta (`#ff007f`) accents on deep dark backgrounds with frosted glass panels (`backdrop-blur`).
- **Dark Neon LED Glow Profile Avatar**: Pulsing multi-ring neon halo with scanner orbits for the hero profile picture.
- **3-Menu Clean Header**: `About`, `Projects`, `Contact` + discreet Admin lock button.
- **All Devices Responsive**: Optimized for ultra-smooth responsiveness on mobile, tablet, and desktop screens with mobile drawer navigation.
- **Full Professional Footer**: Social media matrix (GitHub, LinkedIn, Facebook, Twitter, WhatsApp), system status indicator, quick links, and copyright.
- **Password-Protected `/admin` Controller**:
  - URL: `<your-domain>/admin` (Default password: `admin`)
  - Full control over:
    - Profile Information (Name, Title, Bio, Avatar image, Email, Phone, Location)
    - Skills (Add, edit, delete skills and proficiency levels)
    - Projects (Add, edit, delete projects with live URLs and GitHub repositories)
    - Social Links (GitHub, LinkedIn, Facebook, Twitter, WhatsApp)
    - Visitor Dispatches (Read contact messages submitted from the site)
    - Security (Update admin password, export full JSON configuration backup)
- **Vercel 1-Click Deployment Ready**: Zero configuration needed.

---

## 🛠️ Local Development

1. Open terminal in the project directory:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.
3. Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Dashboard.
   - **Default Password**: `admin`

---

## 🌐 Deploying to Vercel (Free Hosting)

### Method 1: Using GitHub & Vercel Dashboard (Recommended)
1. Initialize git and push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Rakib Hasan portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** -> **"Project"**.
4. Import your GitHub repository.
5. Click **"Deploy"**. Vercel will automatically detect Next.js and build it.
6. Your portfolio will be live at `https://your-project.vercel.app`!
7. Access your admin dashboard at `https://your-project.vercel.app/admin`.

---

## 🔒 Admin Security
- The default admin password is set to **`admin`**.
- You can change it anytime by visiting the `/admin` page -> **Security & Export** tab.
