"use client";

import { useMemo } from "react";
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
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  // Generate random selection of images from r1-r18 - only once on mount
  const randomImages = useMemo(() => {
    const availableImages = [
      "r1.jpg",
      "r2.jpg",
      "r3.jpeg",
      "r4.jpeg",
      "r5.jpeg",
      "r6.jpeg",
      "r7.jpg",
      "r8.jpg",
      "r9.jpg",
      "r10.jpg",
      "r11.jpeg",
      "r14.jpg",
      "r15.jpg",
      "r17.jpeg",
      "r18.jpeg",
    ];

    // Shuffle and select 6 random images
    const shuffled = [...availableImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, []); // Empty dependency array ensures this only runs once

  const images = useMemo(
    () => [
      {
        src: `/images/${randomImages[0]}`,
        title: getText("showcaseGallery.images.loading"),
        description: getText("showcaseGallery.images.loadingDesc"),
        category: getText("showcaseGallery.categories.loading"),
        icon: Truck,
      },
      {
        src: `/images/${randomImages[1]}`,
        title: getText("showcaseGallery.images.security"),
        description: getText("showcaseGallery.images.securityDesc"),
        category: getText("showcaseGallery.categories.security"),
        icon: Shield,
      },
      {
        src: `/images/${randomImages[2]}`,
        title: getText("showcaseGallery.images.fleet"),
        description: getText("showcaseGallery.images.fleetDesc"),
        category: getText("showcaseGallery.categories.transport"),
        icon: Truck,
      },
      {
        src: `/images/${randomImages[3]}`,
        title: getText("showcaseGallery.images.coverage"),
        description: getText("showcaseGallery.images.coverageDesc"),
        category: getText("showcaseGallery.categories.destinations"),
        icon: MapPin,
      },
      {
        src: `/images/${randomImages[4]}`,
        title: getText("showcaseGallery.images.documentation"),
        description: getText("showcaseGallery.images.documentationDesc"),
        category: getText("showcaseGallery.categories.control"),
        icon: Camera,
      },
      {
        src: `/images/${randomImages[5]}`,
        title: getText("showcaseGallery.images.delivery"),
        description: getText("showcaseGallery.images.deliveryDesc"),
        category: getText("showcaseGallery.categories.delivery"),
        icon: MapPin,
      },
    ],
    [randomImages, getText]
  );

  return (
    <section
      id="gallery"
      className="section-padding bg-gradient-to-b from-charcoal-900 to-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-6 tracking-tight">
            {getText("showcaseGallery.title")}{" "}
            <span className="text-yellow-400">
              {getText("showcaseGallery.titleAccent")}
            </span>
          </h2>
          <p className="text-xl text-sand-200 max-w-3xl mx-auto font-light">
            {getText("showcaseGallery.subtitle")}
          </p>
          <p className="text-accent mt-2">
            {getText("showcaseGallery.tagline")}
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
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl h-full">
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/r1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 transform transition-transform duration-300 group-hover:scale-105">
                      <div className="flex items-center space-x-2 bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                        <image.icon className="w-4 h-4 text-charcoal-900" />
                        <span className="text-charcoal-900 text-sm font-semibold">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-oswald font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors duration-300">
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-sand-200 mb-6 text-lg">
              {getText("showcaseGallery.cta.question")}
            </p>
            <a
              href="#cotizacion"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-charcoal-900 px-8 py-4 rounded-xl font-oswald font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-lg"
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
          background: #ffd100;
        }
      `}</style>
    </section>
  );
}
