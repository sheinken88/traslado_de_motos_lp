"use client";

import { Shield, Clock, MapPin, Award, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Clock,
      titleKey: "whyChooseUs.features.fastDelivery.title",
      descriptionKey: "whyChooseUs.features.fastDelivery.description",
      stat: "24-72hs",
    },
    {
      icon: MapPin,
      titleKey: "whyChooseUs.features.tracking.title",
      descriptionKey: "whyChooseUs.features.tracking.description",
      stat: "GPS",
    },
    {
      icon: Shield,
      titleKey: "whyChooseUs.features.professionalism.title",
      descriptionKey: "whyChooseUs.features.professionalism.description",
      stat: "100%",
    },
    {
      icon: Users,
      titleKey: "whyChooseUs.features.weareBikers.title",
      descriptionKey: "whyChooseUs.features.weareBikers.description",
      stat: "RIDERS",
    },
    {
      icon: Award,
      titleKey: "whyChooseUs.features.experience.title",
      descriptionKey: "whyChooseUs.features.experience.description",
      stat: "6+",
    },
  ];

  return (
    <section
      id="por-que-elegirnos"
      className="section-padding relative overflow-hidden bg-chalk-100"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl md:mb-16">
          <h2 className="section-title">
            {t("whyChooseUs.title")}{" "}
            <span className="text-copper-500">
              {t("whyChooseUs.titleAccent")}
            </span>
          </h2>
          <p className="section-copy mt-6 max-w-3xl">
            {t("whyChooseUs.subtitle")}
          </p>
        </div>

        {/* Auto-advancing infinite carousel with Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={8000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1280: {
                slidesPerView: 3.5,
              },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div className="group h-full rounded-xl border border-steel-300/80 bg-white p-8 transition-colors duration-300 hover:border-copper-500/60">
                  {/* Top section with icon and stat */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-steel-300 bg-chalk-100">
                        <feature.icon
                          className="h-5 w-5 text-copper-500"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-copper-600">
                      {feature.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="sentence-case mb-3 text-2xl font-semibold tracking-[-0.035em] text-ink-950">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="leading-relaxed text-steel-600">
                    {t(feature.descriptionKey)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-7 h-px w-10 bg-copper-500" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
