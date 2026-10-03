import { ContactForm } from "@/components/contact-form";
import { HeroSection } from "@/components/hero-section";
import { SiteLexicon } from "@/components/site-lexicon";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <section className="border-t border-border/40 px-4 py-16" aria-label="Contact">
        <ContactForm />
      </section>
      <SiteLexicon />
    </main>
  );
}
