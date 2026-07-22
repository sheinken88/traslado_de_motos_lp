"use client";

import { MapPin, Package, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

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
  ];

  return (
    <section id="como-funciona" className="section-padding bg-chalk-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">{t("howItWorks.tagline")}</p>
            <h2 className="section-title">{t("howItWorks.title")}</h2>
            <p className="section-copy mt-6 max-w-lg">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="border-t border-steel-300">
            {steps.map((step, index) => (
              <article
                key={step.titleKey}
                className="grid gap-6 border-b border-steel-300 py-9 sm:grid-cols-[68px_1fr] sm:py-11"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-steel-300 bg-white text-copper-500">
                  <step.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="sentence-case text-2xl font-semibold tracking-[-0.035em] text-ink-950 md:text-3xl">
                      {t(step.titleKey)}
                    </h3>
                    <span className="font-mono text-xs text-steel-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl leading-7 text-steel-600">
                    {t(step.descriptionKey)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {(() => {
                      const features = t(step.featuresKey);
                      return Array.isArray(features)
                        ? features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="flex items-center text-sm text-ink-800"
                            >
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-copper-500" />
                              {feature}
                            </span>
                          ))
                        : null;
                    })()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
