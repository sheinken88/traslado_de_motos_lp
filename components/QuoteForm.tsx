"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    tipoMoto: "",
    fecha: "",
    nombre: "",
    telefono: "",
    email: "",
    comentarios: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Implement actual form submission
    console.log("Form data:", formData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <section id="cotizacion" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Send className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bebas font-black mb-4">¡COTIZACIÓN ENVIADA!</h2>
            <p className="text-xl text-gray-300 mb-8">
              Recibimos tu solicitud. Te contactaremos dentro de las próximas 2 horas con una cotización personalizada.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              Enviar Nueva Cotización
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cotizacion" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bebas font-black mb-4">
            SOLICITAR <span className="text-yellow-400">COTIZACIÓN</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Completá el formulario y te enviaremos una cotización personalizada en menos de 2 horas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="origen">
                Ciudad de Origen *
              </label>
              <input
                type="text"
                id="origen"
                name="origen"
                value={formData.origen}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
                placeholder="Ej: Buenos Aires"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="destino">
                Ciudad de Destino *
              </label>
              <input
                type="text"
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
                placeholder="Ej: Bariloche"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="tipoMoto">
                Tipo de Motocicleta *
              </label>
              <select
                id="tipoMoto"
                name="tipoMoto"
                value={formData.tipoMoto}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
              >
                <option value="">Seleccionar tipo</option>
                <option value="deportiva">Deportiva</option>
                <option value="touring">Touring</option>
                <option value="adventure">Adventure</option>
                <option value="cruiser">Cruiser</option>
                <option value="naked">Naked</option>
                <option value="scooter">Scooter</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="fecha">
                Fecha Deseada
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="nombre">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="telefono">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
                placeholder="Ej: +54 9 11 1234-5678"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white"
                placeholder="tu@email.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2" htmlFor="comentarios">
                Comentarios Adicionales
              </label>
              <textarea
                id="comentarios"
                name="comentarios"
                value={formData.comentarios}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none text-white resize-none"
                placeholder="Información adicional sobre tu motocicleta o requerimientos especiales..."
              />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-yellow-400 text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                ENVIAR COTIZACIÓN
                <Send className="ml-2 w-5 h-5" />
              </button>

              <p className="text-sm text-gray-400 mt-4">
                * Campos obligatorios. Te contactaremos dentro de las próximas 2 horas.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
