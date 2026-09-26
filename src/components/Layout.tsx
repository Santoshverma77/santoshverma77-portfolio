import type { ReactNode } from "react";
import Loader from "@/components/site/Loader";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import ScrollProgress from "@/components/site/ScrollProgress";
import PortfolioAI from "@/components/PortfolioAI";

/** Global shell: intro loader, nav, scroll progress, page content, footer, AI chat. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <SiteNav />
      <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">{children}</main>
      <SiteFooter />
      <PortfolioAI />
    </>
  );
}
