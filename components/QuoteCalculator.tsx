"use client"

import { useState, useEffect } from "react"
import { Calculator, MapPin, Bike, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function QuoteCalculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [motorcycleType, setMotorcycleType] = useState("")
  const [tripDuration, setTripDuration] = useState("")
  const [additionalServices, setAdditionalServices] = useState({
    urgentDelivery: false,
    pickupService: false,
    insurance: true,
  })
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null)

  // Popular routes for quick selection
  const popularRoutes = [
    { from: "Buenos Aires", to: "Bariloche", distance: 1600 },
    { from: "Buenos Aires", to: "Mendoza", distance: 1050 },
    { from: "Córdoba", to: "Ushuaia", distance: 3200 },
    { from: "Buenos Aires", to: "Salta", distance: 1500 },
  ]

  // Calculate estimate based on inputs
  useEffect(() => {
    if (origin && destination && motorcycleType) {
      // Simplified calculation logic
      const basePrice = 50000 // Base price in ARS
      const distanceMultiplier = 30 // Price per km
      const typeMultipliers = {
        deportiva: 1.2,
        touring: 1.1,
        adventure: 1.15,
        cruiser: 1.1,
        naked: 1.0,
        scooter: 0.9,
      }

      // Find if it's a popular route
      const route = popularRoutes.find(
        (r) =>
          (r.from.toLowerCase() === origin.toLowerCase() && r.to.toLowerCase() === destination.toLowerCase()) ||
          (r.to.toLowerCase() === origin.toLowerCase() && r.from.toLowerCase() === destination.toLowerCase())
      )

      const estimatedDistance = route ? route.distance : 1000 // Default distance if not found
      const typeMultiplier = typeMultipliers[motorcycleType as keyof typeof typeMultipliers] || 1

      let calculatedPrice = basePrice + estimatedDistance * distanceMultiplier * typeMultiplier

      // Apply additional services
      if (additionalServices.urgentDelivery) calculatedPrice *= 1.5
      if (additionalServices.pickupService) calculatedPrice += 15000

      // Create price range
      const minPrice = Math.round(calculatedPrice * 0.9)
      const maxPrice = Math.round(calculatedPrice * 1.1)

      setEstimate({ min: minPrice, max: maxPrice })
    } else {
      setEstimate(null)
    }
  }, [origin, destination, motorcycleType, additionalServices])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-sand-100 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-yellow-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-900 mb-4">
            CALCULÁ TU <span className="text-yellow-400">PRESUPUESTO</span>
          </h2>
          <p className="text-xl text-charcoal-700 max-w-2xl mx-auto font-light">
            Obtené una estimación rápida del costo de transporte
          </p>
          <p className="text-accent mt-2">Respuesta instantánea, sin compromiso</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-hard p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    Ruta de Transporte
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ciudad origen"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 placeholder-charcoal-700/50 transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Ciudad destino"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 placeholder-charcoal-700/50 transition-all duration-300"
                    />
                  </div>
                  {/* Quick route buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularRoutes.map((route, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setOrigin(route.from)
                          setDestination(route.to)
                        }}
                        className="text-xs px-3 py-1 bg-sand-100 text-charcoal-700 rounded-full hover:bg-yellow-400 hover:text-navy-900 transition-all"
                      >
                        {route.from} → {route.to}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <Bike className="w-4 h-4 mr-2 text-yellow-400" />
                    Tipo de Motocicleta
                  </label>
                  <select
                    value={motorcycleType}
                    onChange={(e) => setMotorcycleType(e.target.value)}
                    className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="deportiva">Deportiva</option>
                    <option value="touring">Touring</option>
                    <option value="adventure">Adventure</option>
                    <option value="cruiser">Cruiser</option>
                    <option value="naked">Naked</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                    ¿Cuándo necesitás el transporte?
                  </label>
                  <input
                    type="date"
                    value={tripDuration}
                    onChange={(e) => setTripDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy-900 mb-3 block">Servicios Adicionales</label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalServices.urgentDelivery}
                        onChange={(e) =>
                          setAdditionalServices({ ...additionalServices, urgentDelivery: e.target.checked })
                        }
                        className="w-5 h-5 text-yellow-400 rounded border-sand-300 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-charcoal-700 group-hover:text-navy-900">
                        Entrega urgente (24-48hs)
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalServices.pickupService}
                        onChange={(e) =>
                          setAdditionalServices({ ...additionalServices, pickupService: e.target.checked })
                        }
                        className="w-5 h-5 text-yellow-400 rounded border-sand-300 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-charcoal-700 group-hover:text-navy-900">
                        Retiro a domicilio
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalServices.insurance}
                        onChange={(e) =>
                          setAdditionalServices({ ...additionalServices, insurance: e.target.checked })
                        }
                        className="w-5 h-5 text-yellow-400 rounded border-sand-300 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-charcoal-700 group-hover:text-navy-900">
                        Seguro premium incluido
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Result */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-navy-900 to-charcoal-900 rounded-2xl p-8 text-white h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <Calculator className="w-6 h-6 text-yellow-400 mr-3" />
                      <h3 className="text-2xl font-oswald font-bold">Estimación de Precio</h3>
                    </div>

                    {estimate ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sand-300 mb-2">Rango estimado:</p>
                          <div className="text-3xl font-bold text-yellow-400">
                            {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
                          </div>
                        </div>

                        <div className="border-t border-navy-700 pt-4">
                          <p className="text-sm text-sand-300 mb-3">El precio incluye:</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              Transporte seguro puerta a puerta
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              Seguimiento GPS en tiempo real
                            </li>
                            {additionalServices.insurance && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                Seguro premium todo riesgo
                              </li>
                            )}
                            {additionalServices.urgentDelivery && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                Entrega express garantizada
                              </li>
                            )}
                            {additionalServices.pickupService && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                Retiro a domicilio incluido
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-sand-300 mb-4">
                          Completá los datos para ver una estimación instantánea
                        </p>
                        <div className="w-20 h-20 mx-auto bg-navy-800 rounded-2xl flex items-center justify-center">
                          <Calculator className="w-10 h-10 text-sand-300" />
                        </div>
                      </div>
                    )}
                  </div>

                  {estimate && (
                    <div className="mt-8">
                      <Link
                        href="#cotizacion"
                        className="w-full bg-yellow-400 text-navy-900 px-6 py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-glow transition-all duration-300 flex items-center justify-center group"
                      >
                        Solicitar Cotización Detallada
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <p className="text-xs text-sand-300 text-center mt-3">
                        * Esta es una estimación. El precio final puede variar.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}