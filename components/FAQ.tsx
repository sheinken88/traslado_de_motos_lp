"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useLanguage();

  // Helper function to ensure we get a string from translation
  const getText = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get FAQs from translations and ensure proper typing
  const faqsData = t("faq.questions");
  const faqs = Array.isArray(faqsData) ? faqsData : [];

  // Filter and validate FAQ items
  const validFaqs = faqs.filter(
    (faq) =>
      faq && typeof faq === "object" && "question" in faq && "answer" in faq
  ) as unknown as FAQItem[];

  // Show loading state if no FAQs are available yet
  if (validFaqs.length === 0) {
    return (
      <section
        id="faq"
        className="section-padding bg-gradient-to-b from-white to-sand-100"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bebas font-black text-navy-900 mb-4">
              {getText("faq.title")}
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto font-light">
              {getText("faq.subtitle")}
            </p>
            <p className="text-accent mt-2">{getText("faq.tagline")}</p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-16 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-16 bg-gray-200 rounded-xl mb-4"></div>
            </div>
            <p className="text-gray-500 mt-4">
              Cargando preguntas frecuentes...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="section-padding bg-gradient-to-b from-white to-sand-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bebas font-black text-navy-900 mb-4">
            {getText("faq.title")}
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto font-light">
            {getText("faq.subtitle")}
          </p>
          <p className="text-black italic mt-2">{getText("faq.tagline")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {validFaqs.map((faq, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                className="w-full py-6 text-left flex justify-between items-center bg-white hover:bg-sand-100 px-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-navy-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-yellow-400 flex-shrink-0 transition-transform" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-charcoal-700 flex-shrink-0 transition-transform hover:text-yellow-400" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 animate-fadeInUp">
                  <p className="text-black leading-relaxed text-elegant mt-4 pl-4 border-l-2 border-yellow-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
