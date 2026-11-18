import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MD. Rakib Hasan | Full Stack Developer Portfolio",
  description: "Official portfolio of MD. Rakib Hasan. Specializing in Node.js, Tailwind CSS, Responsive Web Applications, and Cyberpunk Glassmorphism UI.",
  keywords: ["MD. Rakib Hasan", "Rakib Hasan", "Portfolio", "Full Stack Developer", "Node.js", "Tailwind CSS", "Cyberpunk", "Glassmorphism"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#060913] text-slate-100 antialiased selection:bg-[#00f0ff] selection:text-[#060913]">
        {children}
      </body>
    </html>
  );
}
