import type React from "react";
import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MotoTransfer - Transporte y Traslado de Motos en Argentina | Servicio Profesional",
  description:
    "Servicio de transporte de motocicletas y traslado de motos por toda Argentina. Transportamos tu moto de forma segura con seguro incluido, seguimiento GPS y entrega puntual. Desde 2018 ofreciendo calidad y confiabilidad.",
  keywords:
    "transporte motocicletas, traslado de motos, envío motos Argentina, transporte motos, servicio traslado motocicletas, transporte seguro motos, envío motocicletas Argentina, turismo aventura, transporte profesional motos",
  openGraph: {
    title: "MotoTransfer - Transporte y Traslado de Motos en Argentina",
    description:
      "Servicio profesional de transporte de motocicletas y traslado de motos por toda Argentina. Seguridad, confiabilidad y seguimiento GPS.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} font-sans bg-white`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
