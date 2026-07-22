"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Globe, Instagram, Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "es" as const, name: "Español", flag: "🇦🇷" },
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "pt" as const, name: "Português", flag: "🇧🇷" },
  ];

  const navItems = [
    { href: "#hero", label: t("nav.home") },
    { href: "#calculadora", label: t("nav.calculator") },
    { href: "#como-funciona", label: t("nav.howItWorks") },
    { href: "#por-que-elegirnos", label: t("nav.services") },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-steel-300/70 bg-chalk-50/95 text-ink-950 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-steel-600 transition-colors hover:text-ink-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-steel-600 transition-colors hover:bg-chalk-200 hover:text-ink-950"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-expanded={isLangDropdownOpen}
                aria-label="Seleccionar idioma"
              >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-steel-300 bg-white p-1.5 shadow-medium">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-chalk-100 ${
                        currentLanguage === lang.code
                          ? "text-ink-950"
                          : "text-steel-600"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {currentLanguage === lang.code && (
                        <Check className="h-4 w-4 text-copper-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://www.instagram.com/motoonofftours/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-steel-600 transition-colors hover:bg-chalk-200 hover:text-ink-950 xl:flex"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <Link href="#cotizacion" className="btn-primary ml-2 !px-5 !py-2.5 text-sm">
              {t("nav.getQuote")}
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-steel-300 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-steel-300/70 py-5 md:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-steel-300/50 py-3.5 text-base font-medium text-ink-950"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        currentLanguage === lang.code
                          ? "border-copper-500 bg-copper-500 text-white"
                          : "border-steel-300 text-steel-600"
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1">
                  <a
                    href="https://www.instagram.com/motoonofftours/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-steel-600"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://wa.me/5491135939730?text=${encodeURIComponent(
                      String(t("whatsapp.message"))
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-steel-600"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <Link
                href="#cotizacion"
                className="btn-primary mt-5 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.getQuote")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
