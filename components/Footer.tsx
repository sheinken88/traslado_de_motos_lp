"use client";

import {
  Phone,
  Mail,
  MapPin,
  Instagram,
} from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  return (
    <footer className="border-t border-white/10 bg-ink-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo inverse />
            <p className="mt-5 max-w-md leading-7 text-steel-300">
              {getText("footer.description")}
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/motoonofftours/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-steel-300 transition-colors hover:text-copper-400"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold">
              {getText("footer.contact")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="mr-3 h-4 w-4 text-copper-400" />
                <span className="text-steel-300">+54 9 11 3593-9730</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-4 w-4 text-copper-400" />
                <span className="text-steel-300">
                  info@trasladodemotos.com.ar
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-4 w-4 text-copper-400" />
                <span className="text-steel-300">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-base font-semibold">
              {getText("footer.links")}
            </h3>
            <div className="space-y-2">
              <a
                href="#hero"
                className="block text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("nav.home")}
              </a>
              <a
                href="#calculadora"
                className="block text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("nav.calculator")}
              </a>
              <a
                href="#como-funciona"
                className="block text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("nav.howItWorks")}
              </a>
              <a
                href="#por-que-elegirnos"
                className="block text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("nav.services")}
              </a>
              <a
                href="#cotizacion"
                className="block text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("nav.contact")}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-steel-300">
              © {new Date().getFullYear()} MotoTransfer.{" "}
              {getText("footer.copyright")}
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("footer.terms")}
              </a>
              <a
                href="#"
                className="text-sm text-steel-300 transition-colors hover:text-copper-400"
              >
                {getText("footer.privacy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
