import Link from "next/link"
export default function HeroStats() {
  const stats = [
    { number: "500+", label: "Motos Transportadas", icon: "🏍️" },
    { number: "98%", label: "Satisfacción del Cliente", icon: "⭐" },
    { number: "24/7", label: "Soporte Disponible", icon: "📞" },
    { number: "3+", label: "Años de Experiencia", icon: "🏆" },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center stagger-item">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20 elegant-hover">
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-oswald font-bold text-black mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto shadow-sm border border-white/20">
            <h3 className="text-xl font-oswald font-bold text-black mb-4">¿LISTO PARA TU PRÓXIMA AVENTURA?</h3>
            <p className="text-gray-600 mb-6 font-light">
              Dejanos transportar tu moto mientras vos te enfocás en disfrutar el viaje
            </p>
            <Link href="#cotizacion" className="btn-primary font-oswald">
              COMENZAR AHORA
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
