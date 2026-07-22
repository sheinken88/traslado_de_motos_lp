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
        className="section-padding border-t border-steel-300/70 bg-chalk-100"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="section-kicker">{getText("faq.tagline")}</p>
            <h2 className="section-title">
              {getText("faq.title")}
            </h2>
            <p className="section-copy mt-6 max-w-2xl">
              {getText("faq.subtitle")}
            </p>
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
      className="section-padding border-t border-steel-300/70 bg-chalk-100"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl md:mb-16">
          <p className="section-kicker">{getText("faq.tagline")}</p>
          <h2 className="section-title">
            {getText("faq.title")}
          </h2>
          <p className="section-copy mt-6 max-w-2xl">
            {getText("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl border-t border-steel-300">
          {validFaqs.map((faq, index) => (
            <div key={index} className="border-b border-steel-300">
              <button
                className="flex w-full items-center justify-between py-7 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="pr-4 text-lg font-semibold tracking-[-0.02em] text-ink-950">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-copper-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-steel-600" />
                )}
              </button>

              {openIndex === index && (
                <div className="animate-fadeInUp pb-7">
                  <p className="max-w-3xl border-l-2 border-copper-500 pl-5 leading-7 text-steel-600">
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
