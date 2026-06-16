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
        <div className="flex items-center gap-2">
          <a className="btn btn-primary btn-sm hidden sm:inline-flex" href={site.phoneHref}>
            Позвонить
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
