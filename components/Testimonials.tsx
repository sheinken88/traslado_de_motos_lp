"use client";

import { Star, Quote } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface TestimonialData {
  name: string;
  bike: string;
  brand: string;
  model: string;
  location: string;
  rating: number;
  comment: string;
}

export default function Testimonials() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  // Get testimonials from translations
  const testimonialsData = t("testimonials.data");
  const baseTestimonials = Array.isArray(testimonialsData)
    ? (testimonialsData as unknown as TestimonialData[])
    : [];

  // Add static image data to translation data with fallback
  const testimonials =
    baseTestimonials.length > 0
      ? baseTestimonials.map((testimonial, index) => ({
          ...testimonial,
          image:
            index === 0
              ? "https://ui-avatars.com/api/?name=Carlos+Mendoza&background=D5653E&color=FFFFFF&bold=true"
              : index === 1
              ? "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=D5653E&color=FFFFFF&bold=true"
              : "https://ui-avatars.com/api/?name=Roberto+Silva&background=D5653E&color=FFFFFF&bold=true",
          bikeImage:
            index === 0
              ? "/images/r10.jpg"
              : index === 1
              ? "/images/r5.jpeg"
              : "/images/r18.jpeg",
        }))
      : [
          // Fallback data if translations fail to load
          {
            name: "Carlos Mendoza",
            bike: "BMW R1250GS",
            brand: "BMW",
            model: "R1250GS",
            location: "Buenos Aires → Bariloche",
            rating: 5,
            comment:
              "Excelente servicio. Mi moto llegó en perfecto estado y pude comenzar mi viaje por la Patagonia sin problemas. Muy recomendable.",
            image:
              "https://ui-avatars.com/api/?name=Carlos+Mendoza&background=D5653E&color=FFFFFF&bold=true",
            bikeImage: "/images/r10.jpg",
          },
        ];

  return (
    <section className="section-padding overflow-hidden bg-chalk-50">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl md:mb-16">
          <div className="mb-5 flex items-center">
            <Quote className="mr-3 h-5 w-5 text-copper-500" />
            <h2 className="section-title">
              {getText("testimonials.title")}
            </h2>
          </div>
          <p className="section-copy max-w-3xl">
            {getText("testimonials.subtitle")}
          </p>
        </div>

        {/* Main testimonial display with Swiper */}
        <div className="max-w-6xl mx-auto mb-16">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveTestimonial(swiper.activeIndex)}
            className="!pb-0"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="relative overflow-hidden rounded-2xl border border-steel-300/80 bg-white p-6 sm:p-10 lg:p-12">
                  <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
                    {/* Testimonial content */}
                    <div className="order-2 md:order-1">
                      <div className="flex justify-start mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="mr-1 h-5 w-5 fill-current text-copper-500"
                          />
                        ))}
                      </div>

                      <blockquote className="mb-8 text-2xl font-medium leading-snug tracking-[-0.035em] text-ink-950 md:text-3xl">
                        &ldquo;{testimonial.comment}&rdquo;
                      </blockquote>

                      <div className="flex items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="mr-4 h-12 w-12 rounded-full border border-steel-300 object-cover"
                        />
                        <div>
                          <h4 className="text-base font-semibold text-ink-950">
                            {testimonial.name}
                          </h4>
                          <p className="mt-1 text-sm text-copper-600">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Motorcycle showcase */}
                    <div className="order-1 md:order-2 text-center">
                      <div className="relative">
                        <div className="overflow-hidden rounded-xl bg-chalk-100">
                        <img
                          src={testimonial.bikeImage}
                          alt={testimonial.bike}
                          className="mx-auto h-72 w-full object-cover"
                        />
                        </div>
                        <div className="absolute bottom-4 left-4 rounded-lg border border-white/20 bg-ink-950/85 px-4 py-2 backdrop-blur-sm">
                          <div className="text-center">
                            <div className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-copper-400">
                              {testimonial.brand}
                            </div>
                            <div className="text-white font-medium text-sm">
                              {testimonial.model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Testimonial navigation dots */}
        <div className="flex justify-center space-x-4 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => mainSwiper?.slideTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? "w-8 bg-copper-500"
                  : "w-2 bg-steel-300 hover:bg-steel-500"
              }`}
            />
          ))}
        </div>

        {/* All testimonials grid - Swiper horizontal slider */}
        <div className="relative -mx-4 md:mx-0">
          <div className="max-w-7xl mx-auto">
            <Swiper
              modules={[]}
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="!px-4 !py-4"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`h-full rounded-xl border bg-white p-6
                               transition-all duration-300 cursor-pointer
                               hover:border-copper-500/60
                               ${
                                 index === activeTestimonial
                                   ? "border-copper-500"
                                   : "border-steel-300/80"
                               }`}
                    onClick={() => mainSwiper?.slideTo(index)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="mr-3 h-11 w-11 rounded-full border border-steel-300 object-cover"
                        />
                        <div>
                          <h4 className="text-base font-semibold text-ink-950">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-steel-600">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-copper-600">
                          {testimonial.brand}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {testimonial.model}
                        </div>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current text-copper-500"
                        />
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-steel-600">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Modern gradient overlays for desktop */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 w-32
                          bg-gradient-to-r from-chalk-50 via-chalk-50/50 to-transparent
                          pointer-events-none z-10"
          />
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-32
                          bg-gradient-to-l from-chalk-50 via-chalk-50/50 to-transparent
                          pointer-events-none z-10"
          />
        </div>
      </div>
    </section>
  );
}
