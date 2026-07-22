"use client";

import { useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Shield,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TransportGallery() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = useCallback((key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  }, [t]);

  const images = useMemo(
    () => [
      {
        src: "/images/r11.jpeg",
        title: getText("showcaseGallery.images.loading"),
        description: getText("showcaseGallery.images.loadingDesc"),
        category: getText("showcaseGallery.categories.loading"),
        icon: Truck,
      },
      {
        src: "/images/r17.jpeg",
        title: getText("showcaseGallery.images.security"),
        description: getText("showcaseGallery.images.securityDesc"),
        category: getText("showcaseGallery.categories.security"),
        icon: Shield,
      },
      {
        src: "/images/r1.jpg",
        title: getText("showcaseGallery.images.fleet"),
        description: getText("showcaseGallery.images.fleetDesc"),
        category: getText("showcaseGallery.categories.transport"),
        icon: Truck,
      },
      {
        src: "/images/r18.jpeg",
        title: getText("showcaseGallery.images.coverage"),
        description: getText("showcaseGallery.images.coverageDesc"),
        category: getText("showcaseGallery.categories.destinations"),
        icon: MapPin,
      },
      {
        src: "/images/r10.jpg",
        title: getText("showcaseGallery.images.documentation"),
        description: getText("showcaseGallery.images.documentationDesc"),
        category: getText("showcaseGallery.categories.control"),
        icon: Camera,
      },
      {
        src: "/images/r19.jpeg",
        title: getText("showcaseGallery.images.delivery"),
        description: getText("showcaseGallery.images.deliveryDesc"),
        category: getText("showcaseGallery.categories.delivery"),
        icon: MapPin,
      },
    ],
    [getText]
  );

  return (
    <section
      id="gallery"
      className="section-padding overflow-hidden bg-ink-950"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl md:mb-16">
          <p className="section-kicker !text-copper-400">
            {getText("showcaseGallery.tagline")}
          </p>
          <h2 className="section-title !text-white">
            {getText("showcaseGallery.title")}{" "}
            <span className="text-copper-400">
              {getText("showcaseGallery.titleAccent")}
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-300 md:text-xl">
            {getText("showcaseGallery.subtitle")}
          </p>
        </div>

        {/* Swiper Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-gallery",
              nextEl: ".swiper-button-next-gallery",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-gallery",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
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
            className="!pb-16"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`${image.src}-${index}`}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] transition-colors duration-300 hover:bg-white/[0.07]">
                  <div className="relative h-64 overflow-hidden sm:h-72">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/r1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 transform transition-transform duration-300 group-hover:scale-105">
                      <div className="flex items-center space-x-2 rounded-full border border-white/20 bg-ink-950/75 px-3 py-1.5 text-white backdrop-blur-sm">
                        <image.icon className="h-4 w-4 text-copper-400" />
                        <span className="text-xs font-medium">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="sentence-case mb-2 text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
                      {image.title}
                    </h3>
                    <p className="text-sand-200/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {image.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-gallery absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="swiper-button-next-gallery absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-gallery flex justify-center gap-2 mt-6"></div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-5 border-t border-white/15 pt-10 sm:flex-row">
            <p className="text-lg text-steel-300">
              {getText("showcaseGallery.cta.question")}
            </p>
            <a
              href="#cotizacion"
              className="inline-flex items-center text-sm font-semibold text-copper-400 transition-colors hover:text-copper-300"
            >
              {getText("showcaseGallery.cta.button")}
            </a>
          </div>
        </div>
      </div>

      {/* Custom Swiper styles */}
      <style jsx global>{`
        .swiper-pagination-gallery .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-gallery .swiper-pagination-bullet-active {
          width: 32px;
          height: 8px;
          border-radius: 4px;
          background: #d5653e;
        }
      `}</style>
    </section>
  );
}
