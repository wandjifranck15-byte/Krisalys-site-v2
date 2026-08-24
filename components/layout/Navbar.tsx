"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sun, Moon, Monitor, Globe } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { useDictionary, useLocale, useNavLabel } from "@/lib/i18n/LocaleContext";
import { useTheme, type ThemeChoice } from "@/lib/theme/ThemeContext";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const dictionary = useDictionary();
  const [open, setOpen] = useState(false);

  const options: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
    { value: "light", label: dictionary.theme.light, icon: Sun },
    { value: "dark", label: dictionary.theme.dark, icon: Moon },
    { value: "system", label: dictionary.theme.system, icon: Monitor },
  ];
  const ActiveIcon = options.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={dictionary.theme.toggleLabel}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-krisalys-gray-light transition-colors hover:bg-white/5 hover:text-white"
      >
        <ActiveIcon className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-full z-20 mt-2 min-w-[160px] rounded-xl border border-white/10 bg-krisalys-charcoal p-1.5 shadow-xl">
            {options.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  theme === value
                    ? "bg-white/10 text-white"
                    : "text-krisalys-gray-light hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  const dictionary = useDictionary();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
      <Globe className="ml-1.5 h-3.5 w-3.5 text-krisalys-gray-light" aria-hidden />
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-label={dictionary.nav.language}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
            locale === l ? "bg-krisalys-blue-deep text-white" : "text-krisalys-gray-light hover:text-white"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const dictionary = useDictionary();
  const navLabel = useNavLabel();

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
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo variant="full" priority />

        <nav className="hidden items-center gap-1 xl:flex">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-krisalys-gray-light transition-colors hover:bg-white/5 hover:text-white"
              >
                {navLabel(item.href, item.label)}
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
                      {navLabel(child.href, child.label)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSelector />
          <ThemeSelector />
          <ButtonLink href="/contact" size="md">
            {dictionary.common.ctaPrimary}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSelector />
          <ThemeSelector />
          <button
            className="text-white"
            aria-label={mobileOpen ? dictionary.nav.menuClose : dictionary.nav.menuOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-krisalys-black xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between rounded-lg text-krisalys-gray-light hover:bg-white/5">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-3 py-3 text-left"
                  >
                    {navLabel(item.href, item.label)}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={dictionary.nav.menuOpen}
                      aria-expanded={openSubmenu === item.href}
                      onClick={() => setOpenSubmenu(openSubmenu === item.href ? null : item.href)}
                      className="px-3 py-3"
                    >
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", openSubmenu === item.href && "rotate-180")}
                      />
                    </button>
                  )}
                </div>
                {item.children && openSubmenu === item.href && (
                  <div className="ml-3 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-krisalys-gray-light hover:bg-white/5"
                      >
                        {navLabel(child.href, child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ButtonLink href="/contact" size="md" className="mt-3 w-full">
              {dictionary.common.ctaPrimary}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
