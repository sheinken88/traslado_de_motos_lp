"use client";

import Link from "next/link";
import { ArrowRight, Award, Clock, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroStats() {
  const { t } = useLanguage();

  const stats = [
    { number: "150", suffix: "+", labelKey: "heroStats.transported", icon: TrendingUp },
    { number: "95", suffix: "%", labelKey: "heroStats.satisfaction", icon: Star },
    { number: "24", suffix: "/7", labelKey: "heroStats.support", icon: Clock },
    { number: "6", suffix: "+", labelKey: "heroStats.experience", icon: Award },
  ];

  return (
    <section className="border-b border-steel-300/70 bg-chalk-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 border-x border-steel-300/70 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className={`px-5 py-8 sm:px-7 lg:py-10 ${
                index % 2 ? "border-l border-steel-300/70" : ""
              } ${index > 1 ? "border-t border-steel-300/70 lg:border-t-0" : ""} ${
                index > 0 ? "lg:border-l lg:border-steel-300/70" : ""
              }`}
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-steel-300 text-copper-500">
                <stat.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="flex items-baseline tracking-[-0.05em]">
                <span className="text-4xl font-semibold text-ink-950 lg:text-5xl">{stat.number}</span>
                <span className="ml-1 text-xl font-medium text-copper-500">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm leading-5 text-steel-600">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-x border-t border-steel-300/70 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <h3 className="sentence-case text-xl font-semibold tracking-[-0.025em] text-ink-950">
              {t("heroStats.ctaTitle")}
            </h3>
            <p className="mt-1 text-sm text-steel-600">{t("heroStats.ctaSubtitle")}</p>
          </div>
          <Link
            href="#cotizacion"
            className="group inline-flex shrink-0 items-center text-sm font-semibold text-copper-600"
          >
            {t("heroStats.ctaButton")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
