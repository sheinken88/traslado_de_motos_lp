import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroStats from "@/components/HeroStats";
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
    <main className="min-h-screen bg-white text-black">
      <Header />
      <Hero />
      <HeroStats />
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
