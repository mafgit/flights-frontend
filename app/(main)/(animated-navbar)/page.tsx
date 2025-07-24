import FAQs from "@/components/faqs/FAQs";
import Features from "@/components/features/Features";
import Hero from "@/components/hero/Hero";
import HomepageAirlines from "@/components/HomepageAirlines";

export default function Home() {
  return (
    <div className="">
      <Hero />

      <HomepageAirlines />

      <Features />

      <FAQs />
    </div>
  );
}
