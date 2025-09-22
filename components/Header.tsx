"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Check, MessageCircle, Instagram } from "lucide-react";
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
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-hard backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-6 py-4 max-w-full">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-8 xl:ml-12 space-x-6 xl:space-x-8 min-w-0">
            <Link
              href="#hero"
              className="hover:text-yellow-400 transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="#como-funciona"
              className="hover:text-yellow-400 transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.howItWorks")}
            </Link>
            <Link
              href="#por-que-elegirnos"
              className="hover:text-yellow-400 transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.services")}
            </Link>
            <Link
              href="#calculadora"
              className="hover:text-yellow-400 transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.calculator")}
            </Link>
            <Link
              href="#cotizacion"
              className="hover:text-yellow-400 transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {
                    languages.find((lang) => lang.code === currentLanguage)
                      ?.flag
                  }{" "}
                  {currentLanguage.toUpperCase()}
                </span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-[100]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </span>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-yellow-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Media Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/5491135939730?text=${encodeURIComponent(
                  String(t("whatsapp.message"))
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <Link
              href="#cotizacion"
              className="bg-yellow-400 text-navy-900 px-4 xl:px-5 py-2.5 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-glow transition-all duration-300 hover:scale-105 text-sm xl:text-base whitespace-nowrap"
            >
              {t("nav.getQuote")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-navy-800">
            <div className="flex flex-col space-y-4 mt-4">
              <Link
                href="#hero"
                className="hover:text-yellow-400 transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="#como-funciona"
                className="hover:text-yellow-400 transition-colors"
              >
                {t("nav.howItWorks")}
              </Link>
              <Link
                href="#por-que-elegirnos"
                className="hover:text-yellow-400 transition-colors"
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#calculadora"
                className="hover:text-yellow-400 transition-colors"
              >
                {t("nav.calculator")}
              </Link>
              <Link
                href="#cotizacion"
                className="hover:text-yellow-400 transition-colors"
              >
                {t("nav.contact")}
              </Link>
              <div className="pt-4 border-t border-navy-800 space-y-4">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {
                      languages.find((lang) => lang.code === currentLanguage)
                        ?.flag
                    }{" "}
                    {currentLanguage.toUpperCase()}
                  </span>
                </button>

                <div className="flex items-center space-x-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://wa.me/5491135939730?text=${encodeURIComponent(
                      String(t("whatsapp.message"))
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
                <Link
                  href="#cotizacion"
                  className="bg-yellow-400 text-navy-900 px-4 py-2 rounded-xl font-semibold w-full text-center"
                >
                  {t("nav.contact")}
                </Link>
              </div>

              {isLangDropdownOpen && (
                <div className="mt-2 space-y-2 bg-white border border-gray-200 rounded-lg p-2 shadow-xl z-[100]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-gray-800 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </span>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-yellow-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
