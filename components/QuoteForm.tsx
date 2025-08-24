"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchParsedSheetData } from "@/lib/sheets";
import { ParsedSheetData } from "@/types/sheets";

export default function QuoteForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    tipoMoto: "",
    cantidad: 1,
    fecha: "",
    fechaFin: "",
    seguro: false,
    recoleccion: false,
    nombre: "",
    telefono: "",
    email: "",
    comentarios: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sheetData, setSheetData] = useState<ParsedSheetData | null>(null);
  const [isFromCalculator, setIsFromCalculator] = useState(false);

  // Debug: Log when form data changes
  useEffect(() => {
    if (isFromCalculator) {
      console.log("Form data updated from calculator:", formData);
    }
  }, [formData, isFromCalculator]);

  // Load sheet data on component mount
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        const parsedData = await fetchParsedSheetData();
        setSheetData(parsedData);
      } catch (error) {
        console.error("Error loading sheet data:", error);
      }
    };

    loadSheetData();
  }, []);

  // Listen for hash changes and check localStorage when navigating to form
  useEffect(() => {
    const checkAndLoadData = () => {
      // Only load data if we're at the cotizacion hash
      if (window.location.hash === "#cotizacion") {
        const savedData = localStorage.getItem("calculatorData");
        if (savedData) {
          try {
            const data = JSON.parse(savedData);
            console.log("Loading calculator data:", data);
            
            // Check if data is different from current form data
            const isDifferent = 
              data.origin !== formData.origen ||
              data.destination !== formData.destino ||
              data.bikeType !== formData.tipoMoto ||
              data.quantity !== formData.cantidad ||
              data.startDate !== formData.fecha ||
              data.endDate !== formData.fechaFin ||
              data.insurance !== formData.seguro ||
              data.pickupService !== formData.recoleccion;
            
            // Only update if data is different or not loaded from calculator yet
            if (isDifferent || !isFromCalculator) {
              setIsFromCalculator(true);
              setFormData((prev) => ({
                ...prev,
                origen: data.origin || "",
                destino: data.destination || "",
                tipoMoto: data.bikeType || "",
                cantidad: data.quantity || 1,
                fecha: data.startDate || "",
                fechaFin: data.endDate || "",
                seguro: data.insurance || false,
                recoleccion: data.pickupService || false,
                comentarios: data.details ? `Motos: ${data.details}\n` : "",
              }));
            }
          } catch (error) {
            console.error("Error parsing calculator data:", error);
            localStorage.removeItem("calculatorData");
          }
        }
      } else {
        // Reset calculator flag when not on the form
        if (isFromCalculator) {
          setIsFromCalculator(false);
        }
      }
    };

    // Check on mount
    checkAndLoadData();

    // Listen for hash changes
    const handleHashChange = () => {
      setTimeout(checkAndLoadData, 50); // Small delay to ensure hash is updated
    };
    window.addEventListener("hashchange", handleHashChange);
    
    // Listen for custom calculator data update events
    const handleCalculatorDataUpdate = () => {
      setTimeout(checkAndLoadData, 100);
    };
    window.addEventListener("calculatorDataUpdated", handleCalculatorDataUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("calculatorDataUpdated", handleCalculatorDataUpdate);
    };
  }, [isFromCalculator, formData.origen, formData.destino, formData.tipoMoto, formData.cantidad, formData.fecha, formData.fechaFin, formData.seguro, formData.recoleccion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Clear calculator data from localStorage after successful submission
      localStorage.removeItem("calculatorData");

      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
              onClick={() => {
                setIsSubmitted(false);
                // Clear any remaining calculator data
                localStorage.removeItem("calculatorData");
                setIsFromCalculator(false);
                // Reset form
                setFormData({
                  origen: "",
                  destino: "",
                  tipoMoto: "",
                  cantidad: 1,
                  fecha: "",
                  fechaFin: "",
                  seguro: false,
                  recoleccion: false,
                  nombre: "",
                  telefono: "",
                  email: "",
                  comentarios: "",
                });
              }}
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
          {isFromCalculator && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-400/30 rounded-xl">
              <div className="flex items-center justify-between text-green-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">
                    Datos importados del calculador
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("calculatorData");
                    setIsFromCalculator(false);
                    setFormData({
                      origen: "",
                      destino: "",
                      tipoMoto: "",
                      cantidad: 1,
                      fecha: "",
                      fechaFin: "",
                      seguro: false,
                      recoleccion: false,
                      nombre: "",
                      telefono: "",
                      email: "",
                      comentarios: "",
                    });
                  }}
                  className="text-xs text-green-400 hover:text-white underline"
                >
                  Limpiar formulario
                </button>
              </div>
            </div>
          )}
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
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.origen
                    ? "border-yellow-400/30"
                    : ""
                }`}
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
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.destino
                    ? "border-yellow-400/30"
                    : ""
                }`}
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
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.tipoMoto
                    ? "border-yellow-400/30"
                    : ""
                }`}
              >
                <option value="">Seleccionar tipo</option>
                {sheetData?.vehicles.map((vehicle) => (
                  <option key={vehicle.category} value={vehicle.category}>
                    {vehicle.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="cantidad"
              >
                Cantidad de motos *
              </label>
              <select
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.cantidad > 1
                    ? "border-yellow-400/30"
                    : ""
                }`}
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="fecha">
                Fecha de inicio
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.fecha
                    ? "border-yellow-400/30"
                    : ""
                }`}
              />
            </div>

            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="fechaFin"
              >
                Fecha de fin (opcional)
              </label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                min={formData.fecha || new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white placeholder-sand-300/50 transition-all duration-300 ${
                  isFromCalculator && formData.fechaFin
                    ? "border-yellow-400/30"
                    : ""
                }`}
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
              <label className="text-sm font-bold text-white mb-3 block">
                Servicios adicionales
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="seguro"
                    checked={formData.seguro}
                    onChange={handleChange}
                    className="w-5 h-5 text-yellow-400 rounded border-navy-600 focus:ring-yellow-400 bg-navy-800"
                  />
                  <span className="ml-3 text-sand-200 group-hover:text-white">
                    Seguro premium{" "}
                    {isFromCalculator && formData.seguro && (
                      <span className="text-yellow-400 text-xs">
                        (del calculador)
                      </span>
                    )}
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="recoleccion"
                    checked={formData.recoleccion}
                    onChange={handleChange}
                    className="w-5 h-5 text-yellow-400 rounded border-navy-600 focus:ring-yellow-400 bg-navy-800"
                  />
                  <span className="ml-3 text-sand-200 group-hover:text-white">
                    Servicio de recolección{" "}
                    {isFromCalculator && formData.recoleccion && (
                      <span className="text-yellow-400 text-xs">
                        (del calculador)
                      </span>
                    )}
                  </span>
                </label>
              </div>
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
                className={`w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl focus:border-yellow-400 focus:outline-none text-white resize-none ${
                  isFromCalculator && formData.comentarios
                    ? "border-yellow-400/30"
                    : ""
                }`}
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
