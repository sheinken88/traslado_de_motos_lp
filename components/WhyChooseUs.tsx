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
      className="section-padding bg-charcoal-900 overflow-hidden relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #FFD100 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FFD100 0%, transparent 50%)",
          }}
        />
      </div>
      <div className=" mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-6 tracking-tight">
            {t("whyChooseUs.title")}{" "}
            <span className="text-yellow-400">
              {t("whyChooseUs.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-sand-200 max-w-3xl mx-auto font-light">
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
                <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-[1.02] hover:shadow-2xl group">
                  {/* Top section with icon and stat */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/25 transition-shadow duration-300">
                        <feature.icon
                          className="w-7 h-7 text-charcoal-900"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="absolute -inset-1 bg-yellow-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                      {feature.stat}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-oswald font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {t(feature.titleKey)}
                  </h3>

                  <p className="text-sand-200/80 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-yellow-400/20 via-yellow-400/40 to-transparent rounded-full group-hover:from-yellow-400/40 group-hover:via-yellow-400/60 transition-all duration-300" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient edges for visual depth */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-charcoal-900 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-charcoal-900 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
