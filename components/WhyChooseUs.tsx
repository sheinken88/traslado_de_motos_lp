"use client";

import { useRef } from "react";
import { Shield, Clock, MapPin, Headphones, Award, Users } from "lucide-react";

export default function WhyChooseUs() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Shield,
      title: "Seguro Incluido",
      description:
        "Cobertura completa durante todo el trayecto. Tu moto está protegida ante cualquier eventualidad.",
      stat: "100% Cobertura",
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description:
        "Tiempos de entrega optimizados. Sabemos que querés comenzar tu aventura cuanto antes.",
      stat: "24-72hs",
    },
    {
      icon: MapPin,
      title: "Seguimiento GPS",
      description:
        "Conocé la ubicación exacta de tu motocicleta durante todo el viaje con nuestro sistema GPS.",
      stat: "Tiempo Real",
    },
    {
      icon: Headphones,
      title: "Atención 24/7",
      description:
        "Equipo dedicado disponible para resolver todas tus consultas durante el proceso.",
      stat: "Soporte Total",
    },
    {
      icon: Award,
      title: "Experiencia Comprobada",
      description:
        "Más de 5 años en el mercado con miles de motocicletas transportadas exitosamente.",
      stat: "5000+ Motos",
    },
    {
      icon: Users,
      title: "Equipo Profesional",
      description:
        "Personal capacitado y especializado en el manejo y transporte de motocicletas.",
      stat: "Certificado",
    },
  ];

  return (
    <section className="section-padding bg-charcoal-900 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #FFD100 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FFD100 0%, transparent 50%)' }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-6 tracking-tight">
            ¿POR QUÉ <span className="text-yellow-400">ELEGIRNOS?</span>
          </h2>
          <p className="text-xl text-sand-200 max-w-3xl mx-auto font-light">
            Más de 5 años transportando motocicletas por toda Argentina con
            total confiabilidad
          </p>
          <p className="text-accent mt-2">La elección de los verdaderos aventureros</p>
        </div>

        {/* Modern horizontal scrollable carousel */}
        <div className="relative -mx-4 px-4">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-6"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex-none w-[320px] md:w-[380px] snap-start"
              >
                <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-[1.02] hover:shadow-2xl group">
                  {/* Top section with icon and stat */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/25 transition-shadow duration-300">
                        <feature.icon className="w-7 h-7 text-charcoal-900" strokeWidth={2} />
                      </div>
                      <div className="absolute -inset-1 bg-yellow-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                      {feature.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-oswald font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-sand-200/80 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-yellow-400/20 via-yellow-400/40 to-transparent rounded-full group-hover:from-yellow-400/40 group-hover:via-yellow-400/60 transition-all duration-300" />
                </div>
              </div>
            ))}
            
            {/* Peek card to suggest more content */}
            <div className="flex-none w-20 md:w-32" />
          </div>

          {/* Gradient edges for visual cue */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-charcoal-900 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-charcoal-900 to-transparent pointer-events-none z-10" />
        </div>

        <div className="text-center mt-8">
          <p className="text-sand-300/60 text-sm">
            Deslizá para explorar más
          </p>
        </div>
      </div>
    </section>
  );
}
