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

        {/* Enhanced routes grid - horizontal overflow slider */}
        <div className="relative mb-16">
          <div 
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 -mx-4 scroll-smooth"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
          {routes.map((route, index) => (
            <div key={index} className="flex-none w-[300px] sm:w-[340px] lg:w-[360px] stagger-item" style={{ scrollSnapAlign: 'start' }}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden elegant-hover group h-full">
                {/* Route image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={`Ruta ${route.from} a ${route.to}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {route.popularity}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <h3 className="font-oswald font-bold text-lg">{route.from}</h3>
                      <div className="text-yellow-400">→</div>
                      <h3 className="font-oswald font-bold text-lg">{route.to}</h3>
                    </div>
                  </div>
                </div>

                {/* Route details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      <div>
                        <div className="text-lg font-oswald font-bold text-black">{route.price}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">{route.duration}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Truck className="w-4 h-4 mr-2" />
                      {route.distance}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ruta directa
                    </div>
                  </div>

                  <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-oswald font-bold hover:bg-yellow-300 transition-all duration-300 group-hover:shadow-lg">
                    COTIZAR RUTA
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
          {/* Gradient fade for overflow indication */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
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
