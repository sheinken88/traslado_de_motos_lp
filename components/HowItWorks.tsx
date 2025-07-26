import { Package, Truck, MapPin, ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: "RETIRAMOS",
      subtitle: "Recolección Segura",
      description:
        "Coordinamos la recolección de tu motocicleta en el lugar que nos indiques, con todas las medidas de seguridad y documentación necesaria.",
      features: ["Inspección previa", "Documentación completa", "Fotos del estado"],
    },
    {
      icon: Truck,
      title: "TRANSPORTAMOS",
      subtitle: "Viaje Protegido",
      description:
        "Tu moto viaja segura en nuestros vehículos especializados con seguro completo, seguimiento GPS y sistemas de sujeción profesionales.",
      features: ["Seguro total", "GPS en tiempo real", "Vehículos especializados"],
    },
    {
      icon: MapPin,
      title: "ENTREGAMOS",
      subtitle: "Destino Final",
      description:
        "Recibís tu motocicleta en perfecto estado en el destino acordado, lista para tu aventura con toda la documentación en orden.",
      features: ["Estado perfecto", "Entrega puntual", "Documentación completa"],
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-black mb-6 tracking-tight">¿CÓMO FUNCIONA?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Proceso simple y transparente para que tu moto llegue segura a destino
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="stagger-item step-connector">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 elegant-hover relative z-10">
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-black" />
                    </div>
                    <div className="text-6xl font-oswald font-light text-gray-100">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-oswald font-bold text-black mb-2">{step.title}</h3>
                    <p className="text-yellow-600 font-semibold text-sm mb-4">{step.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                      style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Connection arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 z-20">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
