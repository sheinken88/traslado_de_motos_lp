"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import Logo from "./Logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("ES")

  const languages = [
    { code: "ES", name: "Español" },
    { code: "EN", name: "English" },
    { code: "PT", name: "Português" },
  ]

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#inicio" className="hover:text-yellow-400 transition-colors">
              Inicio
            </Link>
            <Link href="#como-funciona" className="hover:text-yellow-400 transition-colors">
              Cómo Funciona
            </Link>
            <Link href="#servicios" className="hover:text-yellow-400 transition-colors">
              Servicios
            </Link>
            <Link href="#destinos" className="hover:text-yellow-400 transition-colors">
              Destinos
            </Link>
            <Link href="#contacto" className="hover:text-yellow-400 transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                <Globe className="w-4 h-4" />
                <span>{currentLang}</span>
              </button>
              {/* TODO: Implement language dropdown */}
            </div>

            <Link
              href="#cotizacion"
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Solicitar Cotización
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="#inicio" className="hover:text-yellow-400 transition-colors">
                Inicio
              </Link>
              <Link href="#como-funciona" className="hover:text-yellow-400 transition-colors">
                Cómo Funciona
              </Link>
              <Link href="#servicios" className="hover:text-yellow-400 transition-colors">
                Servicios
              </Link>
              <Link href="#destinos" className="hover:text-yellow-400 transition-colors">
                Destinos
              </Link>
              <Link href="#contacto" className="hover:text-yellow-400 transition-colors">
                Contacto
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang}</span>
                </div>
                <Link href="#cotizacion" className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold">
                  Cotizar
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
