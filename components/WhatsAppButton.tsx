"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = "5491135939730";
    const message = t("whatsapp.message");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl shadow-hard hover:shadow-glow transition-all transform hover:scale-110 z-50 animate-float"
      aria-label={t("whatsapp.ariaLabel") || "Contactar por WhatsApp"}
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
