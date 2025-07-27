"use client"

import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Layered background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mountain-road.png"
          alt="Argentina Route 40 mountain landscape"
          className="w-full h-full object-cover filter-cinematic scale-110"
        />
        <div className="absolute inset-0 overlay-adventure" />
      </div>
      
      {/* Floating accent shapes */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-olive-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl relative">
            {/* Decorative element */}
            <div className="absolute -left-8 top-0 w-1 h-32 bg-yellow-400 hidden lg:block" />
            <div className="stagger-item">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-oswald font-bold text-white leading-none mb-8 tracking-tight">
                TU MOTO,
                <br />
                <span className="text-yellow-400 relative">
                  NUESTRO COMPROMISO
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
                    <path d="M0 8 Q 150 0 300 8" stroke="#FFD100" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
            </div>

            <div className="stagger-item">
              <p className="text-xl md:text-2xl text-sand-200 max-w-2xl mb-12 leading-relaxed font-light">
                Transportamos tu motocicleta de forma segura a cualquier destino en Argentina. 
                <span className="font-playfair italic text-sand-300 block mt-2">Comenzá tu aventura sin preocupaciones.</span>
              </p>
            </div>

            <div className="stagger-item flex flex-col sm:flex-row gap-6 mb-16">
              <Link href="#cotizacion" className="btn-primary inline-flex items-center justify-center group">
                SOLICITAR COTIZACIÓN
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="btn-secondary inline-flex items-center justify-center group">
                <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                VER PROCESO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
