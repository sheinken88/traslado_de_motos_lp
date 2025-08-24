"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en" | "pt";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface Translations {
  [key: string]: any;
}

// Fallback translations in case the JSON files fail to load
const fallbackTranslations: { [key in Language]: Translations } = {
  es: {
    nav: {
      home: "Inicio",
      howItWorks: "Cómo Funciona",
      services: "Por Qué Elegirnos",
      calculator: "Presupuesto",
      destinations: "Destinos",
      contact: "Cotizar",
      getQuote: "Solicitar Cotización",
    },
    hero: {
      title: "TU MOTO,",
      titleAccent: "NUESTRO COMPROMISO",
      subtitle:
        "Servicio de transporte y traslado de motos por toda Argentina. Transportamos tu motocicleta de forma segura a cualquier destino. Comenzá tu aventura sin preocupaciones.",
      ctaPrimary: "SOLICITAR COTIZACIÓN",
      ctaSecondary: "CÓMO FUNCIONA",
    },
    heroStats: {
      transported: "Motos Transportadas",
      satisfaction: "Satisfacción",
      support: "Soporte",
      experience: "Años de Experiencia",
      ctaTitle: "¿LISTO PARA TU PRÓXIMA AVENTURA?",
      ctaSubtitle:
        "Dejanos transportar tu moto mientras vos te enfocás en disfrutar el viaje",
      ctaButton: "COMENZAR AHORA",
    },
    howItWorks: {
      title: "¿CÓMO FUNCIONA?",
      subtitle:
        "Proceso simple y transparente para que tu moto llegue segura a destino",
      tagline: "Realizando transporte de motos desde 2018",
      steps: {
        pickup: {
          title: "RETIRAMOS",
          description:
            "Coordinamos la entrega de tu motocicleta con todas las medidas de seguridad y documentación necesaria.",
          features: [
            "Inspección previa",
            "Documentación completa",
            "Carga de motocicletas",
          ],
        },
        transport: {
          title: "TRANSPORTAMOS",
          description:
            "Tu moto viaja segura en nuestros vehículos especializados, seguimiento constante y sistema de sujeción profesional.",
          features: [
            "Seguimiento en tiempo real",
            "Actualización constante",
            "Fotos de la moto",
          ],
        },
        delivery: {
          title: "ENTREGAMOS",
          description:
            "Recibís tu motocicleta en perfecto estado en el destino acordado, lista para tu aventura con toda la documentación en orden.",
          features: [
            "Retiro por el aeropuerto",
            "Entrega puntual",
            "Documentación completa",
          ],
        },
      },
    },
    whyChooseUs: {
      title: "¿POR QUÉ",
      titleAccent: "ELEGIRNOS?",
      subtitle:
        "Más de 6 años ofreciendo servicios de transporte de motos y traslado de motocicletas por toda Argentina con total confiabilidad y seguridad",
      features: {
        insurance: {
          title: "Seguro Incluido",
          description:
            "Cobertura completa durante todo el trayecto. Tu moto está protegida ante cualquier eventualidad.",
        },
        fastDelivery: {
          title: "Entrega Rápida",
          description:
            "Tiempos de entrega optimizados. Sabemos que querés comenzar tu aventura cuanto antes.",
        },
        tracking: {
          title: "Seguimiento en Tiempo Real",
          description:
            "Conocé la ubicación exacta de tu motocicleta durante todo el viaje con nuestro sistema GPS.",
        },
        support: {
          title: "Atención Personalizada",
          description:
            "Equipo dedicado disponible para resolver todas tus consultas durante el proceso.",
        },
        experience: {
          title: "Experiencia Comprobada",
          description:
            "Más de 5 años en el mercado con miles de motocicletas transportadas exitosamente.",
        },
        team: {
          title: "Equipo Profesional",
          description:
            "Personal capacitado y especializado en el manejo y transporte de motocicletas.",
        },
      },
    },
    testimonials: {
      title: "TESTIMONIOS",
      subtitle: "Lo que dicen nuestros clientes sobre nuestro servicio",
      data: [
        {
          name: "Carlos Mendoza",
          bike: "BMW R1250GS",
          brand: "BMW",
          model: "R1250GS",
          location: "Buenos Aires → Bariloche",
          rating: 5,
          comment:
            "Excelente servicio. Mi moto llegó en perfecto estado y pude comenzar mi viaje por la Patagonia sin problemas. Muy recomendable.",
        },
        {
          name: "María González",
          bike: "Honda Africa Twin",
          brand: "HONDA",
          model: "Africa Twin",
          location: "Córdoba → Salta",
          rating: 5,
          comment:
            "Profesionales de primera. El seguimiento fue constante y la entrega puntual. Definitivamente los volvería a elegir.",
        },
        {
          name: "Roberto Silva",
          bike: "KTM 790 Adventure",
          brand: "KTM",
          model: "790 Adventure",
          location: "Rosario → Mendoza",
          rating: 5,
          comment:
            "Servicio impecable. La comunicación fue excelente durante todo el proceso. Mi moto llegó como si la hubiera llevado yo mismo.",
        },
      ],
    },
    destinations: {
      title: "DESTINOS",
      titleAccent: "POPULARES",
      subtitle: "Rutas más solicitadas para comenzar tu aventura en moto",
      customQuote: "¿No encontrás tu destino?",
      customQuoteButton: "Solicitar Cotización Personalizada",
    },
    faq: {
      title: "PREGUNTAS FRECUENTES",
      subtitle: "Resolvemos las dudas más comunes sobre nuestro servicio",
      tagline: "Todo lo que necesitás saber para viajar tranquilo",
      questions: [
        {
          question: "¿Qué documentación necesito para el transporte?",
          answer:
            "Necesitás la cédula verde o azul de la motocicleta, tu DNI y el comprobante de seguro vigente. Nosotros nos encargamos de toda la documentación del transporte.",
        },
        {
          question: "¿Cuánto tiempo demora el transporte?",
          answer:
            "Los tiempos varían según la distancia. Generalmente: hasta 500km (1-2 días), hasta 1000km (2-3 días), más de 1000km (3-5 días). Te confirmamos el tiempo exacto al cotizar.",
        },
        {
          question:
            "¿Qué pasa si mi moto sufre algún daño durante el transporte?",
          answer:
            "Todas nuestras motos viajan con seguro completo. En el improbable caso de daños, nos hacemos cargo de la reparación o reposición según corresponda.",
        },
        {
          question: "¿Puedo rastrear mi motocicleta durante el viaje?",
          answer:
            "Sí, todos nuestros vehículos tienen GPS y te enviamos actualizaciones regulares. También podés contactarnos en cualquier momento para conocer el estado del envío.",
        },
        {
          question: "¿Transportan cualquier tipo de motocicleta?",
          answer:
            "Transportamos la mayoría de motocicletas: deportivas, touring, adventure, cruiser, etc. Consultanos por modelos específicos o motos de gran cilindrada.",
        },
        {
          question: "¿Cómo se calcula el precio del transporte?",
          answer:
            "El precio se basa en la distancia, tipo de motocicleta, urgencia del envío y destino. Ofrecemos tarifas competitivas y transparentes sin costos ocultos.",
        },
        {
          question: "¿Realizan servicios de urgencia?",
          answer:
            "Sí, ofrecemos servicio express con recargo adicional. En casos de urgencia, podemos coordinar entregas en 24-48 horas según la distancia.",
        },
      ],
    },
    quoteForm: {
      title: "SOLICITAR",
      titleAccent: "COTIZACIÓN",
      subtitle:
        "Completá el formulario y te enviaremos una cotización personalizada en menos de 2 horas",
      fields: {
        origin: "Ciudad de Origen",
        destination: "Ciudad de Destino",
        bikeType: "Tipo de Motocicleta",
        date: "Fecha Deseada",
        name: "Nombre Completo",
        phone: "Teléfono",
        email: "Email",
        comments: "Comentarios Adicionales",
      },
      submit: "ENVIAR COTIZACIÓN",
      required:
        "* Campos obligatorios. Te contactaremos dentro de las próximas 2 horas.",
    },
    quoteCalculator: {
      title: "CALCULÁ TU",
      titleAccent: "PRESUPUESTO",
      subtitle: "Obtené una estimación rápida del costo de transporte",
      tagline: "Respuesta instantánea, sin compromiso",
      fields: {
        route: "Ruta de Transporte",
        originPlaceholder: "Ciudad origen",
        destinationPlaceholder: "Ciudad destino",
        bikeType: "Tipo de Motocicleta",
        bikeTypePlaceholder: "Seleccionar tipo",
        startDate: "Fecha de inicio",
        endDate: "Fecha de fin",
        addMotorcycle: "Agregar otra motocicleta",
        additionalServices: "Servicios Adicionales",
        pickupService: "Retiro a domicilio",
        insurance: "Seguro premium incluido",
      },
      estimate: {
        title: "Estimación de Precio",
        range: "Rango estimado:",
        includes: "El precio incluye:",
        safeTransport: "Transporte seguro puerta a puerta",
        gpsTracking: "Seguimiento GPS en tiempo real",
        premiumInsurance: "Seguro premium todo riesgo",
        placeholder: "Completá los datos para ver una estimación instantánea",
        ctaButton: "Solicitar Cotización Detallada",
        disclaimer: "* Esta es una estimación. El precio final puede variar.",
      },
    },
    showcaseGallery: {
      title: "NUESTRO SERVICIO",
      titleAccent: "EN ACCIÓN",
      subtitle:
        "Galería de imágenes reales de nuestro proceso de transporte de motocicletas",
      tagline: "Calidad y profesionalismo en cada envío",
      images: {
        loading: "Proceso de Carga Profesional",
        loadingDesc:
          "Carga segura y profesional de motocicletas con equipos especializados",
        security: "Sistema de Sujeción Avanzado",
        securityDesc:
          "Sistemas de amarre profesionales que garantizan la seguridad de tu moto",
        fleet: "Flota de Vehículos Especializados",
        fleetDesc:
          "Camiones equipados específicamente para el transporte de motocicletas",
        coverage: "Cobertura Nacional Argentina",
        coverageDesc:
          "Llegamos a todos los destinos de Argentina con el mismo nivel de calidad",
        documentation: "Documentación y Seguimiento",
        documentationDesc:
          "Control total del proceso con documentación completa y seguimiento GPS",
        delivery: "Entrega en Destino",
        deliveryDesc: "Entrega puntual y segura en el destino acordado",
      },
      categories: {
        loading: "Carga",
        security: "Seguridad",
        transport: "Transporte",
        destinations: "Destinos",
        control: "Control",
        delivery: "Entrega",
      },
      cta: {
        question: "¿Querés ver tu moto transportada con la misma calidad?",
        button: "SOLICITAR COTIZACIÓN AHORA",
      },
    },
    footer: {
      description:
        "Transportamos tu motocicleta de forma segura por toda Argentina. Más de 5 años de experiencia respaldando las aventuras de miles de motociclistas.",
      contact: "Contacto",
      links: "Enlaces",
      copyright: "Todos los derechos reservados.",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
    },
    whatsapp: {
      message:
        "Hola! Me interesa el servicio de transporte de motocicletas. ¿Podrían darme más información sobre precios y disponibilidad?",
      ariaLabel: "Contactar por WhatsApp",
    },
  },
  en: {
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      services: "Why Choose Us",
      calculator: "Budget",
      destinations: "Destinations",
      contact: "Get Quote",
      getQuote: "Get Quote",
    },
    hero: {
      title: "YOUR BIKE,",
      titleAccent: "OUR COMMITMENT",
      subtitle:
        "We transport your motorcycle safely to any destination in Argentina. Start your adventure worry-free.",
      ctaPrimary: "GET QUOTE",
      ctaSecondary: "HOW IT WORKS",
    },
    heroStats: {
      transported: "Motorcycles Transported",
      satisfaction: "Satisfaction",
      support: "Support",
      experience: "Years of Experience",
      ctaTitle: "READY FOR YOUR NEXT ADVENTURE?",
      ctaSubtitle:
        "Let us transport your motorcycle while you focus on enjoying the journey",
      ctaButton: "START NOW",
    },
    howItWorks: {
      title: "HOW IT WORKS?",
      subtitle:
        "Simple and transparent process to get your motorcycle safely to destination",
      tagline: "Transporting motorcycles since 2018",
      steps: {
        pickup: {
          title: "WE PICK UP",
          description:
            "We coordinate the pickup of your motorcycle with all security measures and necessary documentation.",
          features: [
            "Previous inspection",
            "Complete documentation",
            "Motorcycle loading",
          ],
        },
        transport: {
          title: "WE TRANSPORT",
          description:
            "Your motorcycle travels safely in our specialized vehicles, constant tracking and professional restraint system.",
          features: [
            "Real-time tracking",
            "Constant updates",
            "Photos of the motorcycle",
          ],
        },
        delivery: {
          title: "WE DELIVER",
          description:
            "You receive your motorcycle in perfect condition at the agreed destination, ready for your adventure with all documentation in order.",
          features: [
            "Airport pickup",
            "Punctual delivery",
            "Complete documentation",
          ],
        },
      },
    },
    whyChooseUs: {
      title: "WHY",
      titleAccent: "CHOOSE US?",
      subtitle:
        "More than 6 years offering motorcycle transport services throughout Argentina with total reliability and security",
      features: {
        insurance: {
          title: "Insurance Included",
          description:
            "Complete coverage during the entire journey. Your motorcycle is protected against any eventuality.",
        },
        fastDelivery: {
          title: "Fast Delivery",
          description:
            "Optimized delivery times. We know you want to start your adventure as soon as possible.",
        },
        tracking: {
          title: "Real-time Tracking",
          description:
            "Know the exact location of your motorcycle during the entire trip with our GPS system.",
        },
        support: {
          title: "Personalized Attention",
          description:
            "Dedicated team available to resolve all your queries during the process.",
        },
        experience: {
          title: "Proven Experience",
          description:
            "More than 5 years in the market with thousands of motorcycles successfully transported.",
        },
        team: {
          title: "Professional Team",
          description:
            "Trained personnel specialized in handling and transporting motorcycles.",
        },
      },
    },
    testimonials: {
      title: "TESTIMONIALS",
      subtitle: "What our clients say about our service",
      data: [
        {
          name: "Carlos Mendoza",
          bike: "BMW R1250GS",
          brand: "BMW",
          model: "R1250GS",
          location: "Buenos Aires → Bariloche",
          rating: 5,
          comment:
            "Excellent service. My bike arrived in perfect condition and I was able to start my Patagonia trip without problems. Highly recommended.",
        },
        {
          name: "María González",
          bike: "Honda Africa Twin",
          brand: "HONDA",
          model: "Africa Twin",
          location: "Córdoba → Salta",
          rating: 5,
          comment:
            "First-class professionals. The tracking was constant and delivery was punctual. I would definitely choose them again.",
        },
        {
          name: "Roberto Silva",
          bike: "KTM 790 Adventure",
          brand: "KTM",
          model: "790 Adventure",
          location: "Rosario → Mendoza",
          rating: 5,
          comment:
            "Impeccable service. Communication was excellent throughout the process. My bike arrived as if I had taken it myself.",
        },
      ],
    },
    destinations: {
      title: "DESTINATIONS",
      titleAccent: "POPULAR",
      subtitle: "Most requested routes to start your motorcycle adventure",
      customQuote: "Can't find your destination?",
      customQuoteButton: "Request Custom Quote",
    },
    faq: {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "We solve the most common doubts about our service",
      tagline: "Everything you need to know to travel peacefully",
      questions: [
        {
          question: "What documentation do I need for transportation?",
          answer:
            "You need the green or blue motorcycle certificate, your ID and valid insurance proof. We handle all transportation documentation.",
        },
        {
          question: "How long does transportation take?",
          answer:
            "Times vary by distance. Generally: up to 500km (1-2 days), up to 1000km (2-3 days), over 1000km (3-5 days). We confirm exact time when quoting.",
        },
        {
          question: "What happens if my bike is damaged during transport?",
          answer:
            "All our motorcycles travel with full insurance. In the unlikely event of damage, we take care of repair or replacement as appropriate.",
        },
        {
          question: "Can I track my motorcycle during the trip?",
          answer:
            "Yes, all our vehicles have GPS and we send you regular updates. You can also contact us anytime to know the shipping status.",
        },
        {
          question: "Do you transport any type of motorcycle?",
          answer:
            "We transport most motorcycles: sport, touring, adventure, cruiser, etc. Ask us about specific models or large displacement bikes.",
        },
        {
          question: "How is the transportation price calculated?",
          answer:
            "Price is based on distance, motorcycle type, shipping urgency and destination. We offer competitive and transparent rates with no hidden costs.",
        },
        {
          question: "Do you provide emergency services?",
          answer:
            "Yes, we offer express service with additional charge. In emergency cases, we can coordinate deliveries in 24-48 hours depending on distance.",
        },
      ],
    },
    quoteForm: {
      title: "REQUEST",
      titleAccent: "QUOTE",
      subtitle:
        "Fill out the form and we'll send you a personalized quote in less than 2 hours",
      fields: {
        origin: "Origin City",
        destination: "Destination City",
        bikeType: "Motorcycle Type",
        date: "Desired Date",
        name: "Full Name",
        phone: "Phone",
        email: "Email",
        comments: "Additional Comments",
      },
      submit: "SEND QUOTE",
      required:
        "* Required fields. We will contact you within the next 2 hours.",
    },
    quoteCalculator: {
      title: "CALCULATE YOUR",
      titleAccent: "BUDGET",
      subtitle: "Get a quick estimate of transportation costs",
      tagline: "Instant response, no commitment",
      fields: {
        route: "Transport Route",
        originPlaceholder: "Origin city",
        destinationPlaceholder: "Destination city",
        bikeType: "Motorcycle Type",
        bikeTypePlaceholder: "Select type",
        startDate: "Start date",
        endDate: "End date",
        addMotorcycle: "Add another motorcycle",
        additionalServices: "Additional Services",
        pickupService: "Home pickup",
        insurance: "Premium insurance included",
      },
      estimate: {
        title: "Price Estimate",
        range: "Estimated range:",
        includes: "Price includes:",
        safeTransport: "Safe door-to-door transport",
        gpsTracking: "Real-time GPS tracking",
        premiumInsurance: "Premium all-risk insurance",
        placeholder: "Fill in the data to see an instant estimate",
        ctaButton: "Request Detailed Quote",
        disclaimer: "* This is an estimate. Final price may vary.",
      },
    },
    showcaseGallery: {
      title: "OUR SERVICE",
      titleAccent: "IN ACTION",
      subtitle: "Gallery of real images of our motorcycle transport process",
      tagline: "Quality and professionalism in every shipment",
      images: {
        loading: "Professional Loading Process",
        loadingDesc:
          "Safe and professional loading of motorcycles with specialized equipment",
        security: "Advanced Restraint System",
        securityDesc:
          "Professional tie-down systems that guarantee the safety of your motorcycle",
        fleet: "Specialized Vehicle Fleet",
        fleetDesc: "Trucks specifically equipped for motorcycle transport",
        coverage: "National Coverage Argentina",
        coverageDesc:
          "We reach all destinations in Argentina with the same level of quality",
        documentation: "Documentation and Tracking",
        documentationDesc:
          "Total process control with complete documentation and GPS tracking",
        delivery: "Destination Delivery",
        deliveryDesc: "Punctual and safe delivery at the agreed destination",
      },
      categories: {
        loading: "Loading",
        security: "Security",
        transport: "Transport",
        destinations: "Destinations",
        control: "Control",
        delivery: "Delivery",
      },
      cta: {
        question:
          "Want to see your motorcycle transported with the same quality?",
        button: "REQUEST QUOTE NOW",
      },
    },
    footer: {
      description:
        "We transport your motorcycle safely throughout Argentina. More than 5 years of experience supporting the adventures of thousands of motorcyclists.",
      contact: "Contact",
      links: "Links",
      copyright: "All rights reserved.",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
    },
    whatsapp: {
      message:
        "Hello! I'm interested in the motorcycle transport service. Could you give me more information about prices and availability?",
      ariaLabel: "Contact via WhatsApp",
    },
  },
  pt: {
    nav: {
      home: "Início",
      howItWorks: "Como Funciona",
      services: "Por Que Nos Escolher",
      calculator: "Orçamento",
      destinations: "Destinos",
      contact: "Orçamento",
      getQuote: "Solicitar Orçamento",
    },
    hero: {
      title: "SUA MOTO,",
      titleAccent: "NOSSO COMPROMISSO",
      subtitle:
        "Serviço de transporte e translado de motos por toda Argentina. Transportamos sua motocicleta de forma segura para qualquer destino. Comece sua aventura sem preocupações.",
      ctaPrimary: "SOLICITAR COTAÇÃO",
      ctaSecondary: "COMO FUNCIONA",
    },
    heroStats: {
      transported: "Motos Transportadas",
      satisfaction: "Satisfação",
      support: "Suporte",
      experience: "Anos de Experiência",
      ctaTitle: "PRONTO PARA SUA PRÓXIMA AVENTURA?",
      ctaSubtitle:
        "Deixe-nos transportar sua moto enquanto você se concentra em aproveitar a viagem",
      ctaButton: "COMEÇAR AGORA",
    },
    howItWorks: {
      title: "COMO FUNCIONA?",
      subtitle:
        "Processo simples e transparente para que sua moto chegue segura ao destino",
      tagline: "Transportando motos desde 2018",
      steps: {
        pickup: {
          title: "RETIRAMOS",
          description:
            "Coordenamos a entrega de sua motocicleta com todas as medidas de segurança e documentação necessária.",
          features: [
            "Inspeção prévia",
            "Documentação completa",
            "Carga de motocicletas",
          ],
        },
        transport: {
          title: "TRANSPORTAMOS",
          description:
            "Sua moto viaja segura em nossos veículos especializados, acompanhamento constante e sistema de fixação profissional.",
          features: [
            "Rastreamento em tempo real",
            "Atualização constante",
            "Fotos da moto",
          ],
        },
        delivery: {
          title: "ENTREGAMOS",
          description:
            "Você recebe sua motocicleta em perfeito estado no destino acordado, pronta para sua aventura com toda a documentação em ordem.",
          features: [
            "Retirada no aeroporto",
            "Entrega pontual",
            "Documentação completa",
          ],
        },
      },
    },
    whyChooseUs: {
      title: "POR QUE",
      titleAccent: "NOS ESCOLHER?",
      subtitle:
        "Mais de 6 anos oferecendo serviços de transporte de motos por toda Argentina com total confiabilidade e segurança",
      features: {
        insurance: {
          title: "Seguro Incluído",
          description:
            "Cobertura completa durante todo o trajeto. Sua moto está protegida contra qualquer eventualidade.",
        },
        fastDelivery: {
          title: "Entrega Rápida",
          description:
            "Tempos de entrega otimizados. Sabemos que você quer começar sua aventura o quanto antes.",
        },
        tracking: {
          title: "Rastreamento em Tempo Real",
          description:
            "Conheça a localização exata de sua motocicleta durante toda a viagem com nosso sistema GPS.",
        },
        support: {
          title: "Atendimento Personalizado",
          description:
            "Equipe dedicada disponível para resolver todas as suas dúvidas durante o processo.",
        },
        experience: {
          title: "Experiência Comprovada",
          description:
            "Mais de 5 anos no mercado com milhares de motocicletas transportadas com sucesso.",
        },
        team: {
          title: "Equipe Profissional",
          description:
            "Pessoal capacitado e especializado no manuseio e transporte de motocicletas.",
        },
      },
    },
    testimonials: {
      title: "DEPOIMENTOS",
      subtitle: "O que nossos clientes dizem sobre nosso serviço",
      data: [
        {
          name: "Carlos Mendoza",
          bike: "BMW R1250GS",
          brand: "BMW",
          model: "R1250GS",
          location: "Buenos Aires → Bariloche",
          rating: 5,
          comment:
            "Excelente serviço. Minha moto chegou em perfeito estado e pude começar minha viagem pela Patagônia sem problemas. Muito recomendado.",
        },
        {
          name: "María González",
          bike: "Honda Africa Twin",
          brand: "HONDA",
          model: "Africa Twin",
          location: "Córdoba → Salta",
          rating: 5,
          comment:
            "Profissionais de primeira. O acompanhamento foi constante e a entrega pontual. Definitivamente os escolheria novamente.",
        },
        {
          name: "Roberto Silva",
          bike: "KTM 790 Adventure",
          brand: "KTM",
          model: "790 Adventure",
          location: "Rosario → Mendoza",
          rating: 5,
          comment:
            "Serviço impecável. A comunicação foi excelente durante todo o processo. Minha moto chegou como se eu mesmo a tivesse levado.",
        },
      ],
    },
    destinations: {
      title: "DESTINOS",
      titleAccent: "POPULARES",
      subtitle: "Rotas mais solicitadas para começar sua aventura de moto",
      customQuote: "Não encontrou seu destino?",
      customQuoteButton: "Solicitar Cotação Personalizada",
    },
    faq: {
      title: "PERGUNTAS FREQUENTES",
      subtitle: "Resolvemos as dúvidas mais comuns sobre nosso serviço",
      tagline: "Tudo o que você precisa saber para viajar tranquilo",
      questions: [
        {
          question: "Que documentação preciso para o transporte?",
          answer:
            "Você precisa do certificado verde ou azul da motocicleta, sua identidade e comprovante de seguro válido. Cuidamos de toda a documentação do transporte.",
        },
        {
          question: "Quanto tempo demora o transporte?",
          answer:
            "Os tempos variam pela distância. Geralmente: até 500km (1-2 dias), até 1000km (2-3 dias), mais de 1000km (3-5 dias). Confirmamos o tempo exato na cotação.",
        },
        {
          question:
            "O que acontece se minha moto for danificada durante o transporte?",
          answer:
            "Todas as nossas motos viajam com seguro completo. No caso improvável de danos, cuidamos do reparo ou substituição conforme apropriado.",
        },
        {
          question: "Posso rastrear minha motocicleta durante a viagem?",
          answer:
            "Sim, todos os nossos veículos têm GPS e enviamos atualizações regulares. Você também pode nos contatar a qualquer momento para saber o status do envio.",
        },
        {
          question: "Vocês transportam qualquer tipo de motocicleta?",
          answer:
            "Transportamos a maioria das motocicletas: esportivas, touring, adventure, cruiser, etc. Consulte-nos sobre modelos específicos ou motos de grande cilindrada.",
        },
        {
          question: "Como é calculado o preço do transporte?",
          answer:
            "O preço é baseado na distância, tipo de motocicleta, urgência do envio e destino. Oferecemos tarifas competitivas e transparentes sem custos ocultos.",
        },
        {
          question: "Vocês oferecem serviços de emergência?",
          answer:
            "Sim, oferecemos serviço expresso com cobrança adicional. Em casos de emergência, podemos coordenar entregas em 24-48 horas dependendo da distância.",
        },
      ],
    },
    quoteForm: {
      title: "SOLICITAR",
      titleAccent: "COTAÇÃO",
      subtitle:
        "Preencha o formulário e enviaremos uma cotação personalizada em menos de 2 horas",
      fields: {
        origin: "Cidade de Origem",
        destination: "Cidade de Destino",
        bikeType: "Tipo de Motocicleta",
        date: "Data Desejada",
        name: "Nome Completo",
        phone: "Telefone",
        email: "Email",
        comments: "Comentários Adicionais",
      },
      submit: "ENVIAR COTAÇÃO",
      required:
        "* Campos obrigatórios. Entraremos em contato nas próximas 2 horas.",
    },
    quoteCalculator: {
      title: "CALCULE SEU",
      titleAccent: "ORÇAMENTO",
      subtitle: "Obtenha uma estimativa rápida do custo de transporte",
      tagline: "Resposta instantânea, sem compromisso",
      fields: {
        route: "Rota de Transporte",
        originPlaceholder: "Cidade de origem",
        destinationPlaceholder: "Cidade de destino",
        bikeType: "Tipo de Motocicleta",
        bikeTypePlaceholder: "Selecionar tipo",
        startDate: "Data de início",
        endDate: "Data de fim",
        addMotorcycle: "Adicionar outra motocicleta",
        additionalServices: "Serviços Adicionais",
        pickupService: "Retirada em domicílio",
        insurance: "Seguro premium incluído",
      },
      estimate: {
        title: "Estimativa de Preço",
        range: "Faixa estimada:",
        includes: "O preço inclui:",
        safeTransport: "Transporte seguro porta a porta",
        gpsTracking: "Rastreamento GPS em tempo real",
        premiumInsurance: "Seguro premium todos os riscos",
        placeholder: "Preencha os dados para ver uma estimativa instantânea",
        ctaButton: "Solicitar Cotação Detalhada",
        disclaimer: "* Esta é uma estimativa. O preço final pode variar.",
      },
    },
    showcaseGallery: {
      title: "NOSSO SERVIÇO",
      titleAccent: "EM AÇÃO",
      subtitle:
        "Galeria de imagens reais de nosso processo de transporte de motocicletas",
      tagline: "Qualidade e profissionalismo em cada envio",
      images: {
        loading: "Processo de Carregamento Profissional",
        loadingDesc:
          "Carregamento seguro e profissional de motocicletas com equipamentos especializados",
        security: "Sistema de Fixação Avançado",
        securityDesc:
          "Sistemas de amarração profissionais que garantem a segurança de sua moto",
        fleet: "Frota de Veículos Especializados",
        fleetDesc:
          "Caminhões equipados especificamente para o transporte de motocicletas",
        coverage: "Cobertura Nacional Argentina",
        coverageDesc:
          "Chegamos a todos os destinos da Argentina com o mesmo nível de qualidade",
        documentation: "Documentação e Rastreamento",
        documentationDesc:
          "Controle total do processo com documentação completa e rastreamento GPS",
        delivery: "Entrega no Destino",
        deliveryDesc: "Entrega pontual e segura no destino acordado",
      },
      categories: {
        loading: "Carregamento",
        security: "Segurança",
        transport: "Transporte",
        destinations: "Destinos",
        control: "Controle",
        delivery: "Entrega",
      },
      cta: {
        question: "Quer ver sua moto transportada com a mesma qualidade?",
        button: "SOLICITAR COTAÇÃO AGORA",
      },
    },
    footer: {
      description:
        "Transportamos sua motocicleta de forma segura por toda Argentina. Mais de 5 anos de experiência apoiando as aventuras de milhares de motociclistas.",
      contact: "Contato",
      links: "Links",
      copyright: "Todos os direitos reservados.",
      terms: "Termos e Condições",
      privacy: "Política de Privacidade",
    },
    whatsapp: {
      message:
        "Olá! Estou interessado no serviço de transporte de motocicletas. Poderiam me dar mais informações sobre preços e disponibilidade?",
      ariaLabel: "Contatar via WhatsApp",
    },
  },
};

const translations: { [key in Language]: Translations } = {
  es: fallbackTranslations.es,
  en: fallbackTranslations.en,
  pt: fallbackTranslations.pt,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es");
  const [isLoaded, setIsLoaded] = useState(true); // Start with fallback translations loaded
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after hydration
    setIsClient(true);

    // Load external translations
    const loadTranslations = async () => {
      try {
        const languages: Language[] = ["es", "en", "pt"];

        for (const lang of languages) {
          try {
            const response = await fetch(`/locales/${lang}/translation.json`);
            if (response.ok) {
              const data = await response.json();
              translations[lang] = { ...translations[lang], ...data };
              console.log(`Loaded ${lang} translations successfully`);
            } else {
              console.warn(
                `Failed to load ${lang} translations:`,
                response.status
              );
            }
          } catch (error) {
            console.warn(`Failed to load ${lang} translations:`, error);
          }
        }

        // Mark as loaded after all translations are processed
        setIsLoaded(true);
        console.log("Translations loaded, current language:", currentLanguage);
      } catch (error) {
        console.warn("Failed to load translations:", error);
        // Still mark as loaded so we can use fallbacks
        setIsLoaded(true);
      }
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    // Only access localStorage on client side after hydration
    if (isClient && typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang && ["es", "en", "pt"].includes(savedLang)) {
        setCurrentLanguage(savedLang);
      }
    }
  }, [isClient]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    if (isClient && typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string | string[] => {
    if (!isLoaded) {
      console.log("Translation not loaded yet for key:", key);
      return key;
    }

    const keys = key.split(".");
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Try fallback language (Spanish) if current language doesn't have the key
        if (currentLanguage !== "es") {
          let fallbackValue: any = translations.es;
          for (const fallbackK of keys) {
            if (
              fallbackValue &&
              typeof fallbackValue === "object" &&
              fallbackK in fallbackValue
            ) {
              fallbackValue = fallbackValue[fallbackK];
            } else {
              console.log("Key not found in fallback language:", key);
              return key;
            }
          }
          if (
            typeof fallbackValue === "string" ||
            Array.isArray(fallbackValue)
          ) {
            return fallbackValue;
          }
        }
        console.log("Key not found:", key, "in language:", currentLanguage);
        return key;
      }
    }

    if (typeof value === "string" || Array.isArray(value)) {
      return value;
    }

    console.log("Unexpected value type for key:", key, "value:", value);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
