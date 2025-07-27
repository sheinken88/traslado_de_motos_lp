import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroStats from "@/components/HeroStats";
import QuoteCalculator from "@/components/QuoteCalculator";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import ShowcaseVideos from "@/components/ShowcaseVideos";
import Testimonials from "@/components/Testimonials";
import PopularDestinations from "@/components/PopularDestinations";
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
      <WhyChooseUs />
      <ShowcaseVideos />
      <Testimonials />
      <PopularDestinations />
      <FAQ />
      <QuoteForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
