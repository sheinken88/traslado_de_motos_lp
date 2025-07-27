"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Globe, Check } from "lucide-react"
import Logo from "./Logo"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const { currentLanguage, setLanguage, t } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'es' as const, name: "Español", flag: "🇦🇷" },
    { code: 'en' as const, name: "English", flag: "🇺🇸" },
    { code: 'pt' as const, name: "Português", flag: "🇧🇷" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-hard backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="hover:text-yellow-400 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="#como-funciona" className="hover:text-yellow-400 transition-colors font-medium">
              {t('nav.howItWorks')}
            </Link>
            <Link href="#servicios" className="hover:text-yellow-400 transition-colors font-medium">
              {t('nav.services')}
            </Link>
            <Link href="#destinos" className="hover:text-yellow-400 transition-colors font-medium">
              {t('nav.destinations')}
            </Link>
            <Link href="#contacto" className="hover:text-yellow-400 transition-colors font-medium">
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag} {currentLanguage.toUpperCase()}
                </span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-charcoal-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLangDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code ? 'bg-white/5' : ''
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

            <Link
              href="#cotizacion"
              className="bg-yellow-400 text-navy-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              {t('nav.getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-navy-800">
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="#inicio" className="hover:text-yellow-400 transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="#como-funciona" className="hover:text-yellow-400 transition-colors">
                {t('nav.howItWorks')}
              </Link>
              <Link href="#servicios" className="hover:text-yellow-400 transition-colors">
                {t('nav.services')}
              </Link>
              <Link href="#destinos" className="hover:text-yellow-400 transition-colors">
                {t('nav.destinations')}
              </Link>
              <Link href="#contacto" className="hover:text-yellow-400 transition-colors">
                {t('nav.contact')}
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-navy-800">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>{languages.find(lang => lang.code === currentLanguage)?.flag} {currentLanguage.toUpperCase()}</span>
                </button>
                <Link href="#cotizacion" className="bg-yellow-400 text-navy-900 px-4 py-2 rounded-xl font-semibold">
                  {t('nav.getQuote')}
                </Link>
              </div>
              
              {isLangDropdownOpen && (
                <div className="mt-2 space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLangDropdownOpen(false)
                        setIsMenuOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code ? 'bg-white/5' : ''
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
  )
}
