"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Shield,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TransportGallery() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

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

  const images = useMemo(() => [
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
    }
  ], [randomImages, getText]);

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 400; // lg
      if (window.innerWidth >= 640) return 350; // sm
      return 300; // default
    }
    return 350;
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      const gap = 24; // 6 * 4px (gap-6 in tailwind)
      const scrollPosition = index * (cardWidth + gap);

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Manual scroll function
  const scroll = (direction: "left" | "right") => {
    let newIndex;
    if (direction === "left") {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      newIndex = (currentIndex + 1) % images.length;
    }
    scrollToIndex(newIndex);
  };

  // Update current index based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      // Calculate which card is most visible in the center of the viewport
      const cardWidth = getCardWidth();
      const gap = 24;
      const cardPlusGap = cardWidth + gap;

      // Find the card that's most centered in the viewport
      const centerPosition = scrollPosition + (containerWidth / 2);
      const centeredCardIndex = Math.floor(centerPosition / cardPlusGap);

      setCurrentIndex(Math.min(Math.max(0, centeredCardIndex), images.length - 1));
    }
  };

  // Auto-scroll functionality with continuous scrolling
  useEffect(() => {
    if (isPaused) {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    // Set up continuous scroll interval
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollAmount = 320; // Scroll by roughly one card width
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;

        // If we're at or near the end, reset to beginning
        if (currentScroll >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise, scroll forward by fixed amount
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
          });
        }
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
        autoScrollInterval.current = null;
      }
    };
  }, [isPaused]);

  // Pause auto-scroll when component unmounts
  useEffect(() => {
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

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

        {/* Image Carousel Container */}
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 ${
              showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            } hidden md:block`}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 ${
              showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            } hidden md:block`}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 px-4 -mx-4
                       scroll-smooth scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`} // Stable key using src and index
                className="flex-none w-[300px] sm:w-[350px] lg:w-[400px] snap-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl h-full">
                  <div className="relative h-64 overflow-hidden">
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

                  <div className="p-6">
                    <h3 className="text-xl font-oswald font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {image.title}
                    </h3>
                    <p className="text-sand-200/80 text-sm leading-relaxed line-clamp-3">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 h-2 bg-yellow-400'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}