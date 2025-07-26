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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bebas font-black text-black mb-4">PREGUNTAS FRECUENTES</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestro servicio
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full py-6 text-left flex justify-between items-center hover:bg-gray-50 px-4 rounded-lg"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-bold text-black pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-4 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
