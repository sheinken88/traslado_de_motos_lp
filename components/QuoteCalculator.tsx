"use client"

import { useState, useEffect } from "react"
import { Calculator, MapPin, Bike, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { fetchParsedSheetData } from "@/lib/sheets"
import { QuoteCalculator as QuoteCalculatorService } from "@/lib/quoteCalculations"
import { ParsedSheetData, QuoteCalculation } from "@/types/sheets"

export default function QuoteCalculator() {
  const { t } = useLanguage()
  
  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key)
    return Array.isArray(result) ? result[0] : result
  }
  
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [motorcycles, setMotorcycles] = useState([{ type: "", quantity: 1 }])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [waitingDays, setWaitingDays] = useState(3)
  const [additionalServices, setAdditionalServices] = useState({
    urgentDelivery: false,
    pickupService: false,
    insurance: true,
  })
  const [estimate, setEstimate] = useState<QuoteCalculation | null>(null)
  const [sheetData, setSheetData] = useState<ParsedSheetData | null>(null)
  const [calculator, setCalculator] = useState<QuoteCalculatorService | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load sheet data on component mount
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        setIsLoading(true)
        const parsedData = await fetchParsedSheetData()
        console.log('Parsed Google Sheets Data:', parsedData)
        
        setSheetData(parsedData)
        const calculatorInstance = new QuoteCalculatorService(
          parsedData.settings,
          parsedData.routes,
          parsedData.vehicles
        )
        setCalculator(calculatorInstance)
      } catch (error) {
        console.error('Error loading sheet data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSheetData()
  }, [])

  // Popular routes for quick selection (using actual sheet data)
  const popularRoutes = sheetData?.routes.slice(0, 4).map(route => ({
    from: route.origin,
    to: route.destination,
    distance: route.km
  })) || []

  // Calculate waiting days from start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
      setWaitingDays(diffDays)
    }
  }, [startDate, endDate])

  // Calculate estimate using the new service
  useEffect(() => {
    if (origin && destination && motorcycles.some(m => m.type) && calculator) {
      try {
        const validMotorcycles = motorcycles.filter(m => m.type)
        if (validMotorcycles.length === 0) {
          setEstimate(null)
          return
        }
        
        const quote = calculator.calculateQuoteMultipleVehicles(
          origin,
          destination,
          validMotorcycles.map(m => ({ type: m.type, quantity: m.quantity })),
          waitingDays
        )
        
        setEstimate(quote)
        console.log('Quote calculation:', quote)
      } catch (error) {
        console.error('Error calculating quote:', error)
        setEstimate(null)
      }
    } else {
      setEstimate(null)
    }
  }, [origin, destination, motorcycles, waitingDays, calculator])

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
            {getText('quoteCalculator.title')} <span className="text-yellow-400">{getText('quoteCalculator.titleAccent')}</span>
          </h2>
          <p className="text-xl text-charcoal-700 max-w-2xl mx-auto font-light">
            {getText('quoteCalculator.subtitle')}
          </p>
          <p className="text-accent mt-2">{getText('quoteCalculator.tagline')}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-hard p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    {getText('quoteCalculator.fields.route')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder={getText('quoteCalculator.fields.originPlaceholder')}
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 placeholder-charcoal-700/50 transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder={getText('quoteCalculator.fields.destinationPlaceholder')}
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
                    {getText('quoteCalculator.fields.bikeType')}
                  </label>
                  <div className="space-y-3">
                    {motorcycles.map((motorcycle, index) => (
                      <div key={index} className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <select
                            value={motorcycle.type}
                            onChange={(e) => {
                              const newMotorcycles = [...motorcycles]
                              newMotorcycles[index].type = e.target.value
                              setMotorcycles(newMotorcycles)
                            }}
                            className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                          >
                            <option value="">{getText('quoteCalculator.fields.bikeTypePlaceholder')}</option>
                            {sheetData?.vehicles.map((vehicle) => (
                              <option key={vehicle.category} value={vehicle.category}>
                                {vehicle.category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={motorcycle.quantity}
                            onChange={(e) => {
                              const newMotorcycles = [...motorcycles]
                              newMotorcycles[index].quantity = parseInt(e.target.value)
                              setMotorcycles(newMotorcycles)
                            }}
                            className="flex-1 px-3 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                          >
                            {[1, 2, 3, 4, 5].map(qty => (
                              <option key={qty} value={qty}>{qty}</option>
                            ))}
                          </select>
                          {motorcycles.length > 1 && (
                            <button
                              onClick={() => {
                                const newMotorcycles = motorcycles.filter((_, i) => i !== index)
                                setMotorcycles(newMotorcycles)
                              }}
                              className="px-3 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setMotorcycles([...motorcycles, { type: "", quantity: 1 }])}
                      className="w-full px-4 py-3 bg-yellow-100 text-navy-900 rounded-xl hover:bg-yellow-200 transition-colors font-medium"
                    >
                      + {getText('quoteCalculator.fields.addMotorcycle')}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      {getText('quoteCalculator.fields.startDate')}
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      {getText('quoteCalculator.fields.endDate')}
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    />
                  </div>
                </div>
                {startDate && endDate && (
                  <div className="text-sm text-charcoal-700 bg-sand-100 px-4 py-2 rounded-lg">
                    Duración del viaje: {waitingDays} día{waitingDays > 1 ? 's' : ''}
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-navy-900 mb-3 block">{getText('quoteCalculator.fields.additionalServices')}</label>
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
                        {getText('quoteCalculator.fields.urgentDelivery')}
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
                        {getText('quoteCalculator.fields.pickupService')}
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
                        {getText('quoteCalculator.fields.insurance')}
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
                      <h3 className="text-2xl font-oswald font-bold">{getText('quoteCalculator.estimate.title')}</h3>
                    </div>

                    {estimate ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sand-300 mb-2">{getText('quoteCalculator.estimate.range')}</p>
                          <div className="text-3xl font-bold text-yellow-400">
                            {formatPrice(estimate.finalPrice)}
                          </div>
                          <p className="text-xs text-sand-400 mt-1">
                            {estimate.totalKm} km • {motorcycles.reduce((sum, m) => sum + m.quantity, 0)} moto{motorcycles.reduce((sum, m) => sum + m.quantity, 0) > 1 ? 's' : ''} • {waitingDays} día{waitingDays > 1 ? 's' : ''}
                          </p>
                        </div>

                        <div className="border-t border-navy-700 pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-sm text-sand-300">{getText('quoteCalculator.estimate.includes')}</p>
                            <button 
                              className="text-xs text-yellow-400 hover:text-yellow-300"
                              onClick={() => {
                                const details = document.getElementById('quote-details');
                                if (details) {
                                  details.style.display = details.style.display === 'none' ? 'block' : 'none';
                                }
                              }}
                            >
                              Ver desglose
                            </button>
                          </div>
                          
                          <div id="quote-details" style={{display: 'none'}} className="space-y-2 text-xs mb-4 bg-navy-800 p-3 rounded-lg">
                            <div className="border-b border-navy-600 pb-2 mb-3">
                              <span className="text-sand-200 font-semibold block mb-2">{getText('quoteCalculator.fields.bikeType')}:</span>
                              {motorcycles.filter(m => m.type).map((motorcycle, index) => (
                                <div key={index} className="flex justify-between text-xs mb-1">
                                  <span className="text-sand-300">{motorcycle.quantity}x {motorcycle.type}:</span>
                                  <span className="text-white">
                                    {calculator && sheetData ? formatPrice(
                                      calculator.calculateInsurance(motorcycle.type, motorcycle.quantity)
                                    ) : '$0'}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-300">Combustible:</span>
                              <span className="text-white">{formatPrice(estimate.fuelCost)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-300">Chofer:</span>
                              <span className="text-white">{formatPrice(estimate.driverCost)}</span>
                            </div>
                            {estimate.accommodationCost > 0 && (
                              <div className="flex justify-between">
                                <span className="text-sand-300">Alojamiento:</span>
                                <span className="text-white">{formatPrice(estimate.accommodationCost)}</span>
                              </div>
                            )}
                            {estimate.mealCost > 0 && (
                              <div className="flex justify-between">
                                <span className="text-sand-300">Comidas:</span>
                                <span className="text-white">{formatPrice(estimate.mealCost)}</span>
                              </div>
                            )}
                            {estimate.airGarageCost > 0 && (
                              <div className="flex justify-between">
                                <span className="text-sand-300">Aéreo/Garage:</span>
                                <span className="text-white">{formatPrice(estimate.airGarageCost)}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-sand-300">Peajes:</span>
                              <span className="text-white">{formatPrice(estimate.tollCost)}</span>
                            </div>
                            <div className="border-t border-navy-600 pt-2">
                              <div className="flex justify-between font-semibold">
                                <span className="text-sand-200">Subtotal:</span>
                                <span className="text-yellow-300">{formatPrice(estimate.priceWithMargin)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sand-300">Seguro:</span>
                              <span className="text-white">{formatPrice(estimate.insuranceCost)}</span>
                            </div>
                          </div>

                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              {getText('quoteCalculator.estimate.safeTransport')}
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              {getText('quoteCalculator.estimate.gpsTracking')}
                            </li>
                            {additionalServices.insurance && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                {getText('quoteCalculator.estimate.premiumInsurance')}
                              </li>
                            )}
                            {additionalServices.urgentDelivery && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                {getText('quoteCalculator.estimate.expressDelivery')}
                              </li>
                            )}
                            {additionalServices.pickupService && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                {getText('quoteCalculator.fields.pickupService')} incluido
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-sand-300 mb-4">
                          {getText('quoteCalculator.estimate.placeholder')}
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
                        {getText('quoteCalculator.estimate.ctaButton')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <p className="text-xs text-sand-300 text-center mt-3">
                        {getText('quoteCalculator.estimate.disclaimer')}
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