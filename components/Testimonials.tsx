"use client"

import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Testimonials() {
  const { t } = useLanguage()
  
  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key)
    return Array.isArray(result) ? result[0] : result
  }
  
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Get testimonials from translations
  const testimonialsData = t('testimonials.data')
  const baseTestimonials = Array.isArray(testimonialsData) ? testimonialsData : []
  
  // Add static image data to translation data with fallback
  const testimonials = baseTestimonials.length > 0 ? baseTestimonials.map((testimonial, index) => ({
    ...testimonial,
    image: "/placeholder.svg?height=120&width=120",
    bikeImage: index === 0 ? "/images/bmw-r1250gs.png" : 
               index === 1 ? "/images/honda-africa-twin.png" : 
               "/images/ktm-790-adventure.png"
  })) : [
    // Fallback data if translations fail to load
    {
      name: "Carlos Mendoza",
      bike: "BMW R1250GS", 
      brand: "BMW",
      model: "R1250GS",
      location: "Buenos Aires → Bariloche",
      rating: 5,
      comment: "Excelente servicio. Mi moto llegó en perfecto estado y pude comenzar mi viaje por la Patagonia sin problemas. Muy recomendable.",
      image: "/placeholder.svg?height=120&width=120",
      bikeImage: "/images/bmw-r1250gs.png"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center mb-6">
            <Quote className="w-8 h-8 text-yellow-400 mr-4" />
            <h2 className="text-5xl md:text-6xl font-oswald font-bold text-black tracking-tight">{getText('testimonials.title')}</h2>
            <Quote className="w-8 h-8 text-yellow-400 ml-4 rotate-180" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            {getText('testimonials.subtitle')}
          </p>
        </div>

        {/* Main testimonial display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gray-50 rounded-3xl p-12 shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Testimonial content */}
              <div className="order-2 md:order-1">
                <div className="flex justify-start mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 font-light">
                  "{testimonials[activeTestimonial].comment}"
                </blockquote>

                <div className="flex items-center">
                  <img
                    src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-yellow-400 shadow-lg mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-oswald font-bold text-black">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-yellow-600 font-semibold">{testimonials[activeTestimonial].location}</p>
                  </div>
                </div>
              </div>

              {/* Motorcycle showcase */}
              <div className="order-1 md:order-2 text-center">
                <div className="relative">
                  <img
                    src={testimonials[activeTestimonial].bikeImage || "/placeholder.svg"}
                    alt={testimonials[activeTestimonial].bike}
                    className="w-full max-w-md mx-auto h-64 object-contain"
                  />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-2xl px-6 py-3">
                    <div className="text-center">
                      <div className="text-yellow-400 font-oswald font-bold text-lg">
                        {testimonials[activeTestimonial].brand}
                      </div>
                      <div className="text-white font-medium text-sm">{testimonials[activeTestimonial].model}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial navigation */}
        <div className="flex justify-center space-x-4 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === activeTestimonial ? "bg-yellow-400 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* All testimonials grid - modern horizontal slider */}
        <div className="relative -mx-4 md:mx-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
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
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-none w-[85vw] max-w-[340px] md:w-[380px] snap-center
                             transition-all duration-300`}
                >
                  <div 
                    className={`h-full bg-white rounded-2xl p-6 border-2 
                               transition-all duration-300 cursor-pointer
                               hover:shadow-xl hover:border-yellow-400 hover:-translate-y-1
                               ${index === activeTestimonial 
                                 ? "border-yellow-400 shadow-lg bg-gradient-to-br from-yellow-50 to-white" 
                                 : "border-gray-200 shadow-md"}`}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover mr-3 ring-4 ring-yellow-400/20"
                        />
                        <div>
                          <h4 className="font-oswald font-bold text-black text-base">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-600 font-oswald font-bold text-sm">{testimonial.brand}</div>
                        <div className="text-gray-500 text-xs">{testimonial.model}</div>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.comment}"</p>
                  </div>
                </div>
              ))}
              
              {/* Invisible spacer for right padding on mobile */}
              <div className="flex-none w-0 md:hidden" />
            </div>
          </div>
          
          {/* Modern gradient overlays for desktop */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 
                          bg-gradient-to-r from-white via-white/50 to-transparent 
                          pointer-events-none z-10" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 
                          bg-gradient-to-l from-white via-white/50 to-transparent 
                          pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
