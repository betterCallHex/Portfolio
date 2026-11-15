import { createFileRoute } from '@tanstack/react-router';
import { ContactSection } from '@/components/home/contact-section';
import { Hero } from '@/components/home/hero';
import { PrinciplesSection } from '@/components/home/principles-section';
import { WorkSection } from '@/components/home/work-section';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <PrinciplesSection />
      <ContactSection />
    </>
  );
}
