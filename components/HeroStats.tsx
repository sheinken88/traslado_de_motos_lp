import Link from "next/link"
import { TrendingUp, Star, Clock, Award } from "lucide-react"

export default function HeroStats() {
  const stats = [
    { number: "5000", suffix: "+", label: "Motos Transportadas", icon: TrendingUp, color: "text-yellow-400" },
    { number: "98", suffix: "%", label: "Satisfacción", icon: Star, color: "text-yellow-400" },
    { number: "24", suffix: "/7", label: "Soporte", icon: Clock, color: "text-yellow-400" },
    { number: "5", suffix: "+", label: "Años de Experiencia", icon: Award, color: "text-yellow-400" },
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-white overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Stats row with modern layout */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-16 gap-y-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group flex items-center space-x-4 stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon with gradient background */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Text content */}
                <div className="text-left">
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl font-oswald font-bold text-white">
                      {stat.number}
                    </span>
                    <span className="text-2xl md:text-3xl font-oswald font-light text-yellow-400 ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-sand-200/70 text-sm mt-1 font-light tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section with modern design */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 blur-2xl" />
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-oswald font-bold text-white mb-4">
                ¿LISTO PARA TU PRÓXIMA AVENTURA?
              </h3>
              <p className="text-sand-200/80 mb-8 text-lg font-light leading-relaxed">
                Dejanos transportar tu moto mientras vos te enfocás en disfrutar el viaje
              </p>
              <Link 
                href="#cotizacion" 
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-charcoal-900 px-8 py-4 rounded-xl font-oswald font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 group"
              >
                COMENZAR AHORA
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
