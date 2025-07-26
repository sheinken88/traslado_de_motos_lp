"use client"

import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Single tall background image for hero and stats sections */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mountain-road.png"
          alt="Argentina Route 40 mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="stagger-item">
              <h1 className="text-6xl md:text-8xl font-oswald font-bold text-white leading-none mb-8 tracking-tight">
                TU MOTO,
                <br />
                <span className="text-yellow-400">NUESTRO COMPROMISO</span>
              </h1>
            </div>

            <div className="stagger-item">
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-12 leading-relaxed font-light">
                Transportamos tu motocicleta de forma segura a cualquier destino en Argentina. Comenzá tu aventura sin
                preocupaciones.
              </p>
            </div>

            <div className="stagger-item flex flex-col sm:flex-row gap-6">
              <Link href="#cotizacion" className="btn-primary inline-flex items-center justify-center">
                SOLICITAR COTIZACIÓN
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>

              <button className="btn-secondary inline-flex items-center justify-center">
                <Play className="mr-3 w-5 h-5" />
                VER PROCESO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
