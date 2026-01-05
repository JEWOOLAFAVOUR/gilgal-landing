import { Navbar } from "../components/common/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { CTA } from "../components/landing/CTA";
import { Footer } from "../components/landing/Footer";

interface LandingPageProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function LandingPage({ isDark, setIsDark }: LandingPageProps) {
  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className="pt-16">
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
