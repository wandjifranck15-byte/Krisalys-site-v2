"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-krisalys-black/90 shadow-lg backdrop-blur-md" : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo variant="full" priority />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-krisalys-gray-light transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-10 min-w-[260px] rounded-xl border border-white/10 bg-krisalys-charcoal p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-4 py-2 text-sm text-krisalys-gray-light hover:bg-white/5 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" size="md">
            Demander une simulation gratuite
          </ButtonLink>
        </div>

        <button
          className="text-white lg:hidden"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-krisalys-black lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <div key={item.href}>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-krisalys-gray-light hover:bg-white/5"
                  onClick={() => {
                    if (item.children) {
                      setOpenSubmenu(openSubmenu === item.href ? null : item.href);
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                >
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", openSubmenu === item.href && "rotate-180")}
                    />
                  )}
                </button>
                {item.children && openSubmenu === item.href && (
                  <div className="ml-3 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-krisalys-gray-light hover:bg-white/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ButtonLink href="/contact" size="md" className="mt-3 w-full">
              Demander une simulation gratuite
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
