"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = "5491135939730";
    const message = String(t("whatsapp.message"));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#1f9d62] text-white shadow-medium transition duration-300 hover:-translate-y-0.5 hover:bg-[#188454] md:bottom-6 md:right-6"
      aria-label={String(
        t("whatsapp.ariaLabel") || "Contactar por WhatsApp"
      )}
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
