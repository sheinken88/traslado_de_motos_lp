"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useLanguage } from "@/contexts/LanguageContext";

type Locale = "es" | "en" | "pt";

type TourCopy = {
  title: string;
  region: string;
  description: string;
  imageAlt: string;
};

type SectionCopy = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  cta: string;
  previous: string;
  next: string;
  days: string;
  gravel: string;
  tours: TourCopy[];
};

const TOUR_SITE_URLS: Record<Locale, string> = {
  es: "https://www.motoonofftours.com.ar/es",
  en: "https://www.motoonofftours.com.ar/en",
  pt: "https://www.motoonofftours.com.ar/pt",
};

const tourFacts = [
  {
    image: "/images/moto-tours/sobre-las-nubes.jpg",
    duration: 7,
    distance: "1.712 km",
    gravel: 50,
  },
  {
    image: "/images/moto-tours/volcanes-del-norte.jpg",
    duration: 7,
    distance: "1.917 km",
    gravel: 50,
  },
  {
    image: "/images/moto-tours/cruces-del-sur.jpg",
    duration: 7,
    distance: "2.321 km",
    gravel: 45,
  },
  {
    image: "/images/moto-tours/gigantes-del-oeste.jpg",
    duration: 8,
    distance: "2.400 km",
    gravel: 30,
  },
] as const;

const copy: Record<Locale, SectionCopy> = {
  es: {
    eyebrow: "Moto On/Off Tours",
    titleLead: "Tu moto llega.",
    titleAccent: "Tu próxima aventura empieza.",
    intro:
      "Después del traslado, empieza el camino. Descubrí cuatro travesías diseñadas y probadas para recorrer Argentina en moto.",
    cta: "Conocé todos los tours",
    previous: "Tour anterior",
    next: "Tour siguiente",
    days: "días",
    gravel: "ripio",
    tours: [
      {
        title: "Sobre las Nubes",
        region: "Salta y Jujuy",
        description:
          "Siete días entre asfalto, ripio, altura, selva y pueblos andinos. El Abra del Acay marca la vara: 4.895 metros sobre el nivel del mar.",
        imageAlt: "Motociclista en una ruta de montaña sobre las nubes en Salta y Jujuy",
      },
      {
        title: "Volcanes del Norte",
        region: "Catamarca",
        description:
          "Cuestas, salares, puna y volcanes en una ruta de altura que alterna ripio, asfalto y jornadas para riders con experiencia.",
        imageAlt: "Motociclistas recorriendo un paisaje volcánico de Catamarca",
      },
      {
        title: "Cruces del Sur",
        region: "Carretera Austral y Patagonia",
        description:
          "Pasos fronterizos y ripio patagónico para cruzar bosques, lagos y rutas que se recuerdan por todo lo que exigieron.",
        imageAlt: "Grupo de riders junto a sus motos en una travesía por la Patagonia",
      },
      {
        title: "Gigantes del Oeste",
        region: "Mendoza a La Rioja",
        description:
          "Cordillera, Laguna Brava, Mina La Mejicana y caminos de montaña entre asfalto y ripio a lo largo de tres provincias.",
        imageAlt: "Moto de aventura frente a la cordillera en el oeste argentino",
      },
    ],
  },
  en: {
    eyebrow: "Moto On/Off Tours",
    titleLead: "Your bike arrives.",
    titleAccent: "Your next adventure begins.",
    intro:
      "Once the transport ends, the road begins. Discover four tested journeys designed for riding across Argentina.",
    cta: "Explore all tours",
    previous: "Previous tour",
    next: "Next tour",
    days: "days",
    gravel: "gravel",
    tours: [
      {
        title: "Over the Clouds",
        region: "Salta and Jujuy",
        description:
          "Seven days of pavement, gravel, altitude, jungle, and Andean villages. Abra del Acay sets the bar at 4,895 metres above sea level.",
        imageAlt: "Motorcyclist on a high mountain road above the clouds in Salta and Jujuy",
      },
      {
        title: "Volcanoes of the North",
        region: "Catamarca",
        description:
          "Mountain passes, salt flats, puna, and volcanoes on a high-altitude route mixing gravel, pavement, and experienced riding.",
        imageAlt: "Motorcyclists crossing a volcanic landscape in Catamarca",
      },
      {
        title: "Southern Crossings",
        region: "Carretera Austral and Patagonia",
        description:
          "Border crossings and Patagonian gravel through forests, lakes, and roads remembered for everything they demanded.",
        imageAlt: "Group of riders with their motorcycles on a Patagonian journey",
      },
      {
        title: "Giants of the West",
        region: "Mendoza to La Rioja",
        description:
          "The cordillera, Laguna Brava, Mina La Mejicana, and mountain roads combining pavement and gravel across three provinces.",
        imageAlt: "Adventure motorcycle facing the Andes in western Argentina",
      },
    ],
  },
  pt: {
    eyebrow: "Moto On/Off Tours",
    titleLead: "A sua moto chega.",
    titleAccent: "A sua próxima aventura começa.",
    intro:
      "Depois do transporte, começa a estrada. Descubra quatro travessias desenhadas e testadas para percorrer a Argentina de moto.",
    cta: "Conheça todos os tours",
    previous: "Tour anterior",
    next: "Próximo tour",
    days: "dias",
    gravel: "ripio",
    tours: [
      {
        title: "Sobre as Nuvens",
        region: "Salta e Jujuy",
        description:
          "Sete dias entre asfalto, ripio, altitude, selva e povoados andinos. O Abra del Acay marca a medida: 4.895 metros de altitude.",
        imageAlt: "Motociclista em uma rota de montanha sobre as nuvens em Salta e Jujuy",
      },
      {
        title: "Vulcões do Norte",
        region: "Catamarca",
        description:
          "Cuestas, salares, puna e vulcões em uma rota de altitude que alterna ripio, asfalto e jornadas para riders experientes.",
        imageAlt: "Motociclistas percorrendo uma paisagem vulcânica de Catamarca",
      },
      {
        title: "Cruces do Sul",
        region: "Carretera Austral e Patagônia",
        description:
          "Passos de fronteira e ripio patagônico para cruzar bosques, lagos e rotas lembradas por tudo o que exigiram.",
        imageAlt: "Grupo de riders com suas motos em uma travessia pela Patagônia",
      },
      {
        title: "Gigantes do Oeste",
        region: "Mendoza a La Rioja",
        description:
          "Cordilheira, Laguna Brava, Mina La Mejicana e caminhos de montanha entre asfalto e ripio ao longo de três províncias.",
        imageAlt: "Moto de aventura diante da cordilheira no oeste argentino",
      },
    ],
  },
};

export default function MotoToursCarousel() {
  const { currentLanguage } = useLanguage();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const content = copy[currentLanguage];
  const tourSiteUrl = TOUR_SITE_URLS[currentLanguage];

  const syncCarouselState = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      id="moto-tours"
      aria-labelledby="moto-tours-title"
      className="section-padding overflow-hidden border-t border-steel-300/70 bg-chalk-50"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-end gap-8 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]">
          <div className="max-w-3xl">
            <p className="section-kicker">{content.eyebrow}</p>
            <h2 id="moto-tours-title" className="section-title !normal-case">
              {content.titleLead}{" "}
              <span className="text-copper-600">{content.titleAccent}</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="text-lg leading-8 text-steel-600">{content.intro}</p>
        <a
              href={tourSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 gap-2"
            >
              {content.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncCarouselState(swiper);
          }}
          onSlideChange={syncCarouselState}
          slidesPerView={1}
          spaceBetween={16}
          speed={650}
          slidesPerGroup={1}
          watchOverflow
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="moto-tours-swiper !overflow-visible"
        >
          {tourFacts.map((tour, index) => {
            const tourCopy = content.tours[index];

            return (
              <SwiperSlide key={tour.image} className="!h-auto">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-steel-300/80 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden bg-chalk-200">
                    <Image
                      src={tour.image}
                      alt={tourCopy.imageAlt}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 38vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink-950/85 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.16em] text-white backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-2 text-sm text-copper-600">
                      <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="font-medium">{tourCopy.region}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-ink-950">
                      {tourCopy.title}
                    </h3>
                    <p className="mt-4 flex-1 leading-7 text-steel-600">
                      {tourCopy.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-steel-300/70 pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-steel-600">
                      <span>
                        {tour.duration} {content.days}
                      </span>
                      <span>{tour.distance}</span>
                      <span>
                        {tour.gravel}% {content.gravel}
                      </span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-9 flex items-center gap-4 sm:gap-6">
          <span className="w-6 font-mono text-xs text-ink-950">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-steel-300" aria-hidden="true">
            <span
              className="absolute inset-y-0 left-0 bg-copper-500 transition-[width] duration-500"
              style={{
                width: `${isEnd ? 100 : ((activeIndex + 1) / tourFacts.length) * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-xs text-steel-600">
            {String(tourFacts.length).padStart(2, "0")}
          </span>

          <div className="ml-1 flex gap-2 sm:ml-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-steel-300 bg-white text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-steel-300 disabled:hover:bg-white disabled:hover:text-ink-950"
              aria-label={content.previous}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-steel-300 bg-white text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-steel-300 disabled:hover:bg-white disabled:hover:text-ink-950"
              aria-label={content.next}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
