import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CanvasScrollSequence from "@/components/CanvasScrollSequence";
import ProductRange from "@/components/ProductRange";
import WhyFrozera from "@/components/WhyFrozera";
import B2BEnquiry from "@/components/B2BEnquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-900 text-white selection:bg-accent/30 selection:text-accent-dark">
      <Navbar />
      <Hero />
      <CanvasScrollSequence />
      <ProductRange />
      <WhyFrozera />
      <B2BEnquiry />
      <Footer />
    </main>
  );
}
