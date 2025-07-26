import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MotoTransfer - Servicio de Transporte de Motocicletas en Argentina",
  description:
    "Transportamos tu motocicleta de forma segura a cualquier destino en Argentina. Servicio profesional con seguro incluido y seguimiento en tiempo real.",
  keywords:
    "transporte motocicletas, envío motos Argentina, traslado motocicletas, turismo aventura",
  openGraph: {
    title: "MotoTransfer - Tu moto, nuestro compromiso",
    description:
      "Servicio profesional de transporte de motocicletas en Argentina",
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
        className={`${inter.variable} ${oswald.variable} font-sans bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
