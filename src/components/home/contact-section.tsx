import { ContactForm } from '@/components/home/contact-form';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { profile } from '@/lib/profile';

export function ContactSection() {
  return (
    <section id='contact' className='mx-auto max-w-6xl px-5 pt-32 sm:px-8'>
      <SectionHeading index='03' title='Contact' />

      <div className='mt-12 grid gap-16 lg:grid-cols-2'>
        <Reveal>
          <p className='text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl'>
            Interested in working together?{' '}
            <span className='text-brand font-serif font-normal italic'>
              Let’s talk.
            </span>
          </p>
          <p className='text-muted-foreground mt-6 max-w-md'>
            Tell me a little about your project, or just say hi.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className='border-foreground/30 hover:border-brand hover:text-brand mt-8 inline-block border-b pb-1 text-xl tracking-tight transition-colors'
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
