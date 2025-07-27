"use client"

import { Package, Truck, MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HowItWorks() {
  const { t } = useLanguage()
  
  const steps = [
    {
      icon: Package,
      titleKey: "howItWorks.steps.pickup.title",
      descriptionKey: "howItWorks.steps.pickup.description",
      featuresKey: "howItWorks.steps.pickup.features",
    },
    {
      icon: Truck,
      titleKey: "howItWorks.steps.transport.title",
      descriptionKey: "howItWorks.steps.transport.description",
      featuresKey: "howItWorks.steps.transport.features",
    },
    {
      icon: MapPin,
      titleKey: "howItWorks.steps.delivery.title",
      descriptionKey: "howItWorks.steps.delivery.description",
      featuresKey: "howItWorks.steps.delivery.features",
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-sand-100 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-navy-900 mb-6 tracking-tight">{t('howItWorks.title')}</h2>
          <p className="text-xl text-charcoal-700 max-w-2xl mx-auto font-light">
            {t('howItWorks.subtitle')}
          </p>
          <p className="text-accent mt-2 font-semibold">
            {t('howItWorks.tagline')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="stagger-item step-connector">
                <div className="card-elegant p-8 rounded-2xl hover:scale-105 transition-all duration-300 relative z-10">
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center shadow-medium hover:shadow-glow transition-all duration-300">
                      <step.icon className="w-8 h-8 text-navy-900" strokeWidth={1.5} />
                    </div>
                    <div className="text-7xl font-oswald font-light text-sand-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-oswald font-bold text-navy-900 mb-4">{t(step.titleKey)}</h3>
                    <p className="text-charcoal-700 leading-relaxed text-elegant mb-6">{t(step.descriptionKey)}</p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    {(() => {
                      const features = t(step.featuresKey);
                      if (Array.isArray(features)) {
                        return features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-charcoal-700 hover:text-navy-900 transition-colors">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3" />
                            {feature}
                          </div>
                        ));
                      }
                      return null;
                    })()}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 h-1 bg-sand-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                      style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Connection arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-4 z-20">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-glow animate-pulse">
                      <ArrowRight className="w-4 h-4 text-navy-900" strokeWidth={2} />
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
