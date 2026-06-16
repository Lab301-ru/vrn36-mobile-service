import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileCta } from "./MobileCta";

/** Каркас сайта: общая шапка, футер и мобильная CTA вокруг любого маршрута. */
export function SiteLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#0b0c0e] text-white">
      <div className="landing-ambient" />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
