import FAQs from "@/components/home/faqs/FAQs";
import Features from "@/components/home/features/Features";
import Hero from "@/components/hero/Hero";
import HomepageAirlines from "@/components/home/HomepageAirlines";
import Cities from "@/components/hero/Cities";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Hero />

      <Cities />

      <HomepageAirlines />

      <Features />

      <FAQs />
    </div>
  );
}
