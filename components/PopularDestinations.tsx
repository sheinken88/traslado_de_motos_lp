"use client"

import { MapPin, Clock, DollarSign, Truck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function PopularDestinations() {
  const { t } = useLanguage()
  
  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key)
    return Array.isArray(result) ? result[0] : result
  }
  
  const routes = [
    {
      from: "Buenos Aires",
      to: "Bariloche",
      price: "Desde $45.000",
      duration: "2-3 días",
      distance: "1.634 km",
      popularity: "Muy Popular",
      image: "/images/route-bariloche.png",
    },
    {
      from: "Córdoba",
      to: "Salta",
      price: "Desde $38.000",
      duration: "2 días",
      distance: "692 km",
      popularity: "Popular",
      image: "/images/route-salta.png",
    },
    {
      from: "Rosario",
      to: "Mendoza",
      price: "Desde $35.000",
      duration: "1-2 días",
      distance: "658 km",
      popularity: "Frecuente",
      image: "/images/route-mendoza.png",
    },
    {
      from: "Buenos Aires",
      to: "Ushuaia",
      price: "Desde $85.000",
      duration: "4-5 días",
      distance: "3.079 km",
      popularity: "Aventura",
      image: "/images/route-ushuaia.png",
    },
    {
      from: "Mendoza",
      to: "San Martín de los Andes",
      price: "Desde $42.000",
      duration: "2-3 días",
      distance: "1.156 km",
      popularity: "Turística",
      image: "/images/route-san-martin.png",
    },
    {
      from: "Salta",
      to: "Cafayate",
      price: "Desde $25.000",
      duration: "1 día",
      distance: "183 km",
      popularity: "Regional",
      image: "/images/route-cafayate.png",
    },
  ]

  return (
    <section id="destinos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-black mb-6 tracking-tight">
            {getText('destinations.title')} <span className="text-yellow-400">{getText('destinations.titleAccent')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            {getText('destinations.subtitle')}
          </p>
        </div>

        {/* Enhanced map visualization */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
            <img
              src="/images/argentina-routes-map.png"
              alt="Mapa de rutas de Argentina con destinos populares"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="text-center mt-8">
              <h3 className="text-2xl font-oswald font-bold text-black mb-2">COBERTURA NACIONAL</h3>
              <p className="text-gray-600 font-light">
                Conectamos las principales ciudades y destinos turísticos de Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Modern routes grid - horizontal overflow slider */}
        <div className="relative -mx-4 md:mx-0 mb-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div 
              className="flex gap-4 md:gap-6 overflow-x-auto pb-6 
                         scroll-smooth snap-x snap-mandatory
                         no-scrollbar"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              {/* Invisible spacer for left padding on mobile */}
              <div className="flex-none w-0 md:hidden" />
              
              {routes.map((route, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[85vw] max-w-[360px] md:w-[380px] snap-center" 
                >
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden group h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    {/* Route image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={route.image || "/placeholder.svg"}
                        alt={`Ruta ${route.from} a ${route.to}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide">
                          {route.popularity}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <h3 className="font-oswald font-bold text-xl drop-shadow-lg">{route.from}</h3>
                          <div className="text-yellow-400 text-2xl animate-pulse">→</div>
                          <h3 className="font-oswald font-bold text-xl drop-shadow-lg">{route.to}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Route details */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center text-green-500 mb-1">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <div className="text-xl font-oswald font-bold text-black">{route.price}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center text-blue-500 mb-1">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="text-base font-medium text-gray-700">{route.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6 py-3 border-t border-b border-gray-100">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Truck className="w-4 h-4 mr-2 text-gray-400" />
                          {route.distance}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          Ruta directa
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3.5 rounded-xl font-oswald font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                        COTIZAR RUTA
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Invisible spacer for right padding on mobile */}
              <div className="flex-none w-0 md:hidden" />
            </div>
          </div>
          
          {/* Modern gradient overlays for desktop */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-40 
                          bg-gradient-to-r from-white via-white/60 to-transparent 
                          pointer-events-none z-10" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-40 
                          bg-gradient-to-l from-white via-white/60 to-transparent 
                          pointer-events-none z-10" />
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-3xl max-w-2xl mx-auto border border-yellow-200">
            <p className="text-gray-700 mb-6 font-light">{getText('destinations.customQuote')}</p>
            <button className="btn-primary font-oswald">{getText('destinations.customQuoteButton')}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
