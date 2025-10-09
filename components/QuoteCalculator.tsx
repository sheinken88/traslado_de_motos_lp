"use client";

import { useState, useEffect } from "react";
import { Calculator, MapPin, Bike, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchParsedSheetData } from "@/lib/sheets";
import { QuoteCalculator as QuoteCalculatorService } from "@/lib/quoteCalculations";
import { ParsedSheetData, QuoteCalculation } from "@/types/sheets";

export default function QuoteCalculator() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [motorcycles, setMotorcycles] = useState([{ type: "", quantity: 1 }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [waitingDays, setWaitingDays] = useState(3);
  const [additionalServices, setAdditionalServices] = useState({
    pickupService: false,
    insurance: false,
  });
  const [estimate, setEstimate] = useState<QuoteCalculation | null>(null);
  const [sheetData, setSheetData] = useState<ParsedSheetData | null>(null);
  const [calculator, setCalculator] = useState<QuoteCalculatorService | null>(
    null
  );

  // Load sheet data on component mount
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        const parsedData = await fetchParsedSheetData();
        console.log("Parsed Google Sheets Data:", parsedData);

        setSheetData(parsedData);
        const calculatorInstance = new QuoteCalculatorService(
          parsedData.settings,
          parsedData.routes,
          parsedData.vehicles
        );
        setCalculator(calculatorInstance);
      } catch (error) {
        console.error("Error loading sheet data:", error);
      }
    };

    loadSheetData();
  }, []);

  // Popular routes for quick selection (using actual sheet data)
  const popularRoutes =
    sheetData?.routes.slice(0, 4).map((route) => ({
      from: route.origin,
      to: route.destination,
      distance: route.km,
    })) || [];

  // Calculate waiting days from start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setWaitingDays(diffDays);
    }
  }, [startDate, endDate]);

  // Calculate estimate using the new service
  useEffect(() => {
    if (
      origin &&
      destination &&
      motorcycles.some((m) => m.type) &&
      calculator
    ) {
      try {
        const validMotorcycles = motorcycles.filter((m) => m.type);
        if (validMotorcycles.length === 0) {
          setEstimate(null);
          return;
        }

        const quote = calculator.calculateQuoteMultipleVehicles(
          origin,
          destination,
          validMotorcycles.map((m) => ({ type: m.type, quantity: m.quantity })),
          waitingDays,
          additionalServices.insurance
        );

        setEstimate(quote);
      } catch (error) {
        console.error("Error calculating quote:", error);
        setEstimate(null);
      }
    } else {
      setEstimate(null);
    }
  }, [
    origin,
    destination,
    motorcycles,
    waitingDays,
    calculator,
    additionalServices.insurance,
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section
      id="calculadora"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-sand-50 to-white"
    >
      {/* Floating accent shapes */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-navy-900 mb-4">
            {getText("quoteCalculator.title")}{" "}
            <span className="text-yellow-500">
              {getText("quoteCalculator.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-charcoal-700 max-w-2xl mx-auto font-light">
            {getText("quoteCalculator.subtitle")}
          </p>
          <p className="text-yellow-600 mt-2 font-medium">
            {getText("quoteCalculator.tagline")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-hard p-4 sm:p-6 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                    {getText("quoteCalculator.fields.route")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    >
                      <option value="">
                        {getText("quoteCalculator.fields.originPlaceholder")}
                      </option>
                      {Array.from(
                        new Set(
                          sheetData?.routes.flatMap((r) => [
                            r.origin,
                            r.destination,
                          ]) || []
                        )
                      )
                        .sort()
                        .map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    >
                      <option value="">
                        {getText(
                          "quoteCalculator.fields.destinationPlaceholder"
                        )}
                      </option>
                      {Array.from(
                        new Set(
                          sheetData?.routes.flatMap((r) => [
                            r.origin,
                            r.destination,
                          ]) || []
                        )
                      )
                        .sort()
                        .map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* Quick route buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularRoutes.map((route, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setOrigin(route.from);
                          setDestination(route.to);
                        }}
                        className="text-xs px-3 py-1 bg-sand-100 text-charcoal-700 rounded-full hover:bg-yellow-400 hover:text-navy-900 transition-all"
                      >
                        {route.from} → {route.to}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                    <Bike className="w-4 h-4 mr-2 text-yellow-400" />
                    {getText("quoteCalculator.fields.bikeType")}
                  </label>
                  <div className="space-y-4">
                    {motorcycles.map((motorcycle, index) => (
                      <div key={index} className="space-y-3">
                        <div>
                          <select
                            value={motorcycle.type}
                            onChange={(e) => {
                              const newMotorcycles = [...motorcycles];
                              newMotorcycles[index].type = e.target.value;
                              setMotorcycles(newMotorcycles);
                            }}
                            className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                          >
                            <option value="">
                              {getText(
                                "quoteCalculator.fields.bikeTypePlaceholder"
                              )}
                            </option>
                            {sheetData?.vehicles.map((vehicle) => (
                              <option
                                key={vehicle.category}
                                value={vehicle.category}
                              >
                                {vehicle.category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-xs text-charcoal-600 mb-1">
                              Cantidad
                            </label>
                            <select
                              value={motorcycle.quantity}
                              onChange={(e) => {
                                const newMotorcycles = [...motorcycles];
                                newMotorcycles[index].quantity = parseInt(
                                  e.target.value
                                );
                                setMotorcycles(newMotorcycles);
                              }}
                              className="w-full px-3 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                            >
                              {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </div>
                          {motorcycles.length > 1 && (
                            <div className="flex items-end">
                              <button
                                onClick={() => {
                                  const newMotorcycles = motorcycles.filter(
                                    (_, i) => i !== index
                                  );
                                  setMotorcycles(newMotorcycles);
                                }}
                                className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-medium"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setMotorcycles([
                          ...motorcycles,
                          { type: "", quantity: 1 },
                        ])
                      }
                      className="w-full px-4 py-3 bg-yellow-100 text-navy-900 rounded-xl hover:bg-yellow-200 transition-colors font-medium"
                    >
                      + {getText("quoteCalculator.fields.addMotorcycle")}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      {getText("quoteCalculator.fields.startDate")}
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-semibold text-navy-900 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                      {getText("quoteCalculator.fields.endDate")}
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-sand-100 border border-sand-200 rounded-xl focus:border-yellow-400 focus:outline-none text-navy-900 transition-all duration-300"
                    />
                  </div>
                </div>
                {startDate && endDate && (
                  <div className="text-sm text-charcoal-700 bg-sand-100 px-4 py-2 rounded-lg">
                    Duración del viaje: {waitingDays} día
                    {waitingDays > 1 ? "s" : ""}
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-navy-900 mb-3 block">
                    {getText("quoteCalculator.fields.additionalServices")}
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalServices.pickupService}
                        onChange={(e) =>
                          setAdditionalServices({
                            ...additionalServices,
                            pickupService: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-yellow-400 rounded border-sand-300 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-charcoal-700 group-hover:text-navy-900">
                        {getText("quoteCalculator.fields.pickupService")}
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={additionalServices.insurance}
                        onChange={(e) =>
                          setAdditionalServices({
                            ...additionalServices,
                            insurance: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-yellow-400 rounded border-sand-300 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-charcoal-700 group-hover:text-navy-900">
                        {getText("quoteCalculator.fields.insurance")}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Result */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-navy-900 to-charcoal-900 rounded-2xl p-6 sm:p-8 text-white h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <Calculator className="w-6 h-6 text-yellow-400 mr-3" />
                      <h3 className="text-2xl font-oswald font-bold">
                        {getText("quoteCalculator.estimate.title")}
                      </h3>
                    </div>

                    {estimate ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sand-300 mb-2">
                            {getText("quoteCalculator.estimate.range")}
                          </p>
                          <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                            {formatPrice(estimate.finalPrice)}
                          </div>
                          <p className="text-xs text-sand-400 mt-1">
                            {estimate.totalKm} km •{" "}
                            {motorcycles.reduce(
                              (sum, m) => sum + m.quantity,
                              0
                            )}{" "}
                            moto
                            {motorcycles.reduce(
                              (sum, m) => sum + m.quantity,
                              0
                            ) > 1
                              ? "s"
                              : ""}{" "}
                            • {waitingDays} día{waitingDays > 1 ? "s" : ""}
                          </p>
                        </div>

                        <div className="border-t border-navy-700 pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-sm text-sand-300">
                              {getText("quoteCalculator.estimate.includes")}
                            </p>
                          </div>

                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              {getText(
                                "quoteCalculator.estimate.safeTransport"
                              )}
                            </li>
                            <li className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                              {getText("quoteCalculator.estimate.gpsTracking")}
                            </li>
                            {additionalServices.insurance && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                {getText(
                                  "quoteCalculator.estimate.premiumInsurance"
                                )}
                              </li>
                            )}
                            {additionalServices.pickupService && (
                              <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                                {getText(
                                  "quoteCalculator.fields.pickupService"
                                )}{" "}
                                incluido
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <p className="text-sand-300 mb-4 text-sm sm:text-base">
                          {getText("quoteCalculator.estimate.placeholder")}
                        </p>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-navy-800 rounded-2xl flex items-center justify-center">
                          <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-sand-300" />
                        </div>
                      </div>
                    )}
                  </div>

                  {estimate && (
                    <div className="mt-8">
                      <button
                        onClick={() => {
                          const quoteData = {
                            origin,
                            destination,
                            bikeType: motorcycles[0]?.type || "",
                            quantity: motorcycles.reduce(
                              (sum, m) => sum + m.quantity,
                              0
                            ),
                            startDate,
                            endDate,
                            insurance: additionalServices.insurance,
                            pickupService: additionalServices.pickupService,
                            estimatedPrice: estimate?.finalPrice || 0,
                            details:
                              motorcycles.length > 1
                                ? motorcycles
                                    .map((m) => `${m.quantity}x ${m.type}`)
                                    .join(", ")
                                : "",
                          };

                          console.log("Saving calculator data:", quoteData);

                          // Save to localStorage
                          localStorage.setItem(
                            "calculatorData",
                            JSON.stringify(quoteData)
                          );

                          // Clear any existing form state
                          window.dispatchEvent(
                            new Event("calculatorDataUpdated")
                          );

                          // Navigate to form
                          window.location.hash = "#cotizacion";

                          // Ensure smooth scroll to the form
                          setTimeout(() => {
                            const formElement =
                              document.getElementById("cotizacion");
                            if (formElement) {
                              formElement.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }, 100);
                        }}
                        className="w-full bg-yellow-400 text-navy-900 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:shadow-glow transition-all duration-300 flex items-center justify-center group text-sm sm:text-base"
                      >
                        {getText("quoteCalculator.estimate.ctaButton")}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-xs text-sand-300 text-center mt-3">
                        {getText("quoteCalculator.estimate.disclaimer")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
