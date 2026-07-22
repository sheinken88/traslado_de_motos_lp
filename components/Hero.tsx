"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="overflow-hidden border-b border-steel-300/70 bg-chalk-100">
      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1600px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="flex items-center px-5 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-20">
          <div className="max-w-2xl animate-fadeInUp">
            <p className="section-kicker">{t("howItWorks.tagline")}</p>
            <h1 className="sentence-case text-[clamp(3.35rem,6vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-ink-950">
              <span className="block">{t("hero.title")}</span>
              <span className="mt-2 block text-copper-500">{t("hero.titleAccent")}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-steel-600 md:text-xl md:leading-9">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10">
              <Link href="#cotizacion" className="btn-primary group">
                {t("hero.ctaPrimary")}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-ramp relative min-h-[55svh] overflow-hidden bg-steel-300 lg:min-h-full">
          <Image
            src="/images/r19.jpeg"
            alt="Motocicletas aseguradas para su traslado profesional"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-[8%] hidden w-px bg-white/45 lg:block" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-lg border border-white/30 bg-ink-950/80 px-4 py-3 text-white backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:min-w-[300px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel-300">
              MotoTransfer
            </span>
            <span className="ml-6 flex items-center gap-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-copper-400" />
              Argentina
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
