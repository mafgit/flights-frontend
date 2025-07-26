import FAQs from "@/components/home/faqs/FAQs";
import Features from "@/components/home/features/Features";
import Hero from "@/components/hero/Hero";
import HomepageAirlines from "@/components/home/HomepageAirlines";

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
