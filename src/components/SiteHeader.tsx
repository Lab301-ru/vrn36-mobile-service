import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrandLockup } from "@/features/landing/BrandLogo";
import { navLinks, site } from "@/config/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-[#0b0c0e]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" aria-label={site.name} onClick={() => setMenuOpen(false)}>
          <BrandLockup />
        </Link>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} className="nav-link" to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a className="cta-glow hidden xs:inline-flex" href={site.phoneHref} aria-label="Позвонить">
            <span className="cta-glow-inner px-2.5 sm:px-4">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Позвонить
            </span>
          </a>
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            aria-label="Меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`menu-icon ${menuOpen ? "is-open" : ""}`} />
          </button>
        </div>
      </div>
      <div className={`mobile-menu md:hidden ${menuOpen ? "is-open" : ""}`}>
        <div className="space-y-1 px-5 pb-5 pt-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            className="btn btn-primary btn-md mt-2 w-full"
            href={site.phoneHref}
            onClick={() => setMenuOpen(false)}
          >
            Позвонить · {site.phone}
          </a>
        </div>
      </div>
    </nav>
  );
}
