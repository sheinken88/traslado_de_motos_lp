"use client";

import type React from "react";

import { useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuoteForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    tipoMoto: "",
    fecha: "",
    nombre: "",
    telefono: "",
    email: "",
    comentarios: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement actual form submission
    console.log("Form data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <section
        id="cotizacion"
        className="section-padding bg-navy-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-scaleIn">
              <Send className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bebas font-black mb-4">
              {t("quoteForm.success.title")}
            </h2>
            <p className="text-xl text-sand-200 mb-8">
              {t("quoteForm.success.message")}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-yellow-400 text-navy-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-glow transition-all duration-300"
            >
              {t("quoteForm.success.newQuote")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cotizacion"
      className="section-padding bg-navy-900 text-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-olive-600 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bebas font-black mb-4">
            {t("quoteForm.title")}{" "}
            <span className="text-yellow-400">
              {t("quoteForm.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-sand-200 max-w-2xl mx-auto font-light">
            {t("quoteForm.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="origen">
                {t("quoteForm.fields.origin")} *
              </label>
              <input
                type="text"
                id="origen"
                name="origen"
                value={formData.origen}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
                placeholder="Ej: Buenos Aires"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="destino">
                {t("quoteForm.fields.destination")} *
              </label>
              <input
                type="text"
                id="destino"
                name="destino"
                value={formData.destino}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
                placeholder="Ej: Bariloche"
              />
            </div>

            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="tipoMoto"
              >
                {t("quoteForm.fields.bikeType")} *
              </label>
              <select
                id="tipoMoto"
                name="tipoMoto"
                value={formData.tipoMoto}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
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
                {t("quoteForm.fields.date")}
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="nombre">
                {t("quoteForm.fields.name")} *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                {t("quoteForm.fields.phone")} *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
                placeholder="Ej: +54 9 11 1234-5678"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                {t("quoteForm.fields.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="comentarios"
              >
                {t("quoteForm.fields.comments")}
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
                className="bg-yellow-400 text-navy-900 px-12 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:shadow-glow transition-all transform hover:scale-105 flex items-center justify-center mx-auto group"
              >
                {t("quoteForm.submit")}
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-sand-300 mt-4 font-light">
                {t("quoteForm.required")}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
