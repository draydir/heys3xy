import { ContactForm } from "@/components/contact-form";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <section
        id="contact"
        className="scroll-mt-16 border-t border-border/40 px-4 py-12 sm:py-16"
        aria-label="Contact"
      >
        <ContactForm />
      </section>
    </main>
  );
}
