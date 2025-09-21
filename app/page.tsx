import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroStats from "@/components/HeroStats";
import QuoteCalculator from "@/components/QuoteCalculator";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import TransportGallery from "@/components/TransportGallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand-100 text-navy-900">
      <Header />
      <Hero />
      <HeroStats />
      <QuoteCalculator />
      <HowItWorks />
      <TransportGallery />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
