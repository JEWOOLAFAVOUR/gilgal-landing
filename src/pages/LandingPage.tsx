import { Navbar } from "../components/common/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { CTA } from "../components/landing/CTA";
import { FAQ } from "../components/landing/FAQ";
import { Footer } from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 bg-white dark:bg-black min-h-screen">
        <Hero />
        <Features />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
