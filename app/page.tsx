import React from "react";
import { getPortfolioData } from "@/lib/portfolio";
import HomePageClient from "@/components/HomePageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const data = getPortfolioData();

  return <HomePageClient initialData={data} />;
}
