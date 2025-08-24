"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Shield,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShowcaseGallery() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "/images/showcase-1.mp4",
      title: getText("showcaseGallery.images.loading"),
      description: getText("showcaseGallery.images.loadingDesc"),
      category: getText("showcaseGallery.categories.loading"),
      icon: Truck,
    },
    {
      src: "/images/showcase-2.jpg",
      title: getText("showcaseGallery.images.security"),
      description: getText("showcaseGallery.images.securityDesc"),
      category: getText("showcaseGallery.categories.security"),
      icon: Shield,
    },
    {
      src: "/images/showcase-3.jpg",
      title: getText("showcaseGallery.images.fleet"),
      description: getText("showcaseGallery.images.fleetDesc"),
      category: getText("showcaseGallery.categories.transport"),
      icon: Truck,
    },
    {
      src: "/images/showcase-4.jpg",
      title: getText("showcaseGallery.images.coverage"),
      description: getText("showcaseGallery.images.coverageDesc"),
      category: getText("showcaseGallery.categories.destinations"),
      icon: MapPin,
    },
    {
      src: "/images/showcase-5.jpg",
      title: getText("showcaseGallery.images.documentation"),
      description: getText("showcaseGallery.images.documentationDesc"),
      category: getText("showcaseGallery.categories.control"),
      icon: Camera,
    },
    {
      src: "/images/showcase-6.jpg",
      title: getText("showcaseGallery.images.delivery"),
      description: getText("showcaseGallery.images.deliveryDesc"),
      category: getText("showcaseGallery.categories.delivery"),
      icon: MapPin,
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="videos"
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

        {/* Image Carousel */}
        <div className=" max-w-7xl mx-auto">
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6  pb-6 px-4 -mx-4 
                       scroll-smooth cursor-grab active:cursor-grabbing
                       scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
            onMouseDown={(e) => {
              const container = e.currentTarget as HTMLDivElement;
              const startX = e.pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;

              const handleMouseMove = (mouseEvent: MouseEvent) => {
                const x = mouseEvent.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-none w-[300px] sm:w-[350px] lg:w-[380px] group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1 shadow-lg">
                        <image.icon className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-oswald font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {image.title}
                    </h3>
                    <p className="text-sand-200/80 text-sm leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-charcoal-900 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-charcoal-900 to-transparent pointer-events-none z-10" />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-sand-200 mb-6 text-lg">
              {getText("showcaseGallery.cta.question")}
            </p>
            <a
              href="#cotizacion"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-charcoal-900 px-8 py-4 rounded-xl font-oswald font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              {getText("showcaseGallery.cta.button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
