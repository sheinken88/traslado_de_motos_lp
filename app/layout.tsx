import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trasladodemotos.com.ar"),
  title:
    "Traslado de Motos - Transporte de Motocicletas en Argentina | Servicio Profesional",
  description:
    "Servicio de transporte de motocicletas y traslado de motos por toda Argentina. Transportamos tu moto de forma segura con seguro incluido, seguimiento GPS y entrega puntual. Desde 2018 ofreciendo calidad y confiabilidad.",
  keywords:
    "transporte motocicletas, traslado de motos, envío motos Argentina, transporte motos, servicio traslado motocicletas, transporte seguro motos, envío motocicletas Argentina, turismo aventura, transporte profesional motos",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Traslado de Motos - Transporte de Motocicletas en Argentina",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
