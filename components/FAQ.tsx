"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Qué documentación necesito para el transporte?",
      answer:
        "Necesitás la cédula verde o azul de la motocicleta, tu DNI y el comprobante de seguro vigente. Nosotros nos encargamos de toda la documentación del transporte.",
    },
    {
      question: "¿Cuánto tiempo demora el transporte?",
      answer:
        "Los tiempos varían según la distancia. Generalmente: hasta 500km (1-2 días), hasta 1000km (2-3 días), más de 1000km (3-5 días). Te confirmamos el tiempo exacto al cotizar.",
    },
    {
      question: "¿Qué pasa si mi moto sufre algún daño durante el transporte?",
      answer:
        "Todas nuestras motos viajan con seguro completo. En el improbable caso de daños, nos hacemos cargo de la reparación o reposición según corresponda.",
    },
    {
      question: "¿Puedo rastrear mi motocicleta durante el viaje?",
      answer:
        "Sí, todos nuestros vehículos tienen GPS y te enviamos actualizaciones regulares. También podés contactarnos en cualquier momento para conocer el estado del envío.",
    },
    {
      question: "¿Transportan cualquier tipo de motocicleta?",
      answer:
        "Transportamos la mayoría de motocicletas: deportivas, touring, adventure, cruiser, etc. Consultanos por modelos específicos o motos de gran cilindrada.",
    },
    {
      question: "¿Cómo se calcula el precio del transporte?",
      answer:
        "El precio se basa en la distancia, tipo de motocicleta, urgencia del envío y destino. Ofrecemos tarifas competitivas y transparentes sin costos ocultos.",
    },
    {
      question: "¿Realizan servicios de urgencia?",
      answer:
        "Sí, ofrecemos servicio express con recargo adicional. En casos de urgencia, podemos coordinar entregas en 24-48 horas según la distancia.",
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-sand-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bebas font-black text-navy-900 mb-4">PREGUNTAS FRECUENTES</h2>
          <p className="text-xl text-charcoal-700 max-w-2xl mx-auto font-light">
            Resolvemos las dudas más comunes sobre nuestro servicio
          </p>
          <p className="text-accent mt-2">Todo lo que necesitás saber para viajar tranquilo</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                className="w-full py-6 text-left flex justify-between items-center bg-white hover:bg-sand-100 px-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-navy-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-yellow-400 flex-shrink-0 transition-transform" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-charcoal-700 flex-shrink-0 transition-transform hover:text-yellow-400" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 animate-fadeInUp">
                  <p className="text-charcoal-700 leading-relaxed text-elegant pl-4 border-l-2 border-yellow-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
