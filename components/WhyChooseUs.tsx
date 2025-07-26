"use client";

import { Shield, Clock, MapPin, Headphones, Award, Users } from "lucide-react";

export default function WhyChooseUs() {
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
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-black mb-6 tracking-tight">
            ¿POR QUÉ <span className="text-yellow-400">ELEGIRNOS?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Más de 5 años transportando motocicletas por toda Argentina con
            total confiabilidad
          </p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="carousel-container">
          <div className="carousel-track">
            {/* First set of features */}
            {features.map((feature, index) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 elegant-hover h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <span className="text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                      {feature.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-oswald font-bold text-black mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {features.map((feature, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-80 mx-4"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 elegant-hover h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <span className="text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                      {feature.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-oswald font-bold text-black mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Deslizá para ver más características
          </p>
        </div>
      </div>
    </section>
  );
}
