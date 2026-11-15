import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ContactForm } from '@/components/home/contact-form';
import { SectionHeading } from '@/components/section-heading';
import { profile } from '@/lib/profile';

const COPIED_RESET_MS = 2000;

export function ContactSection() {
  return (
    <section id='contact' className='mx-auto max-w-6xl px-5 pt-28 sm:px-8'>
      <SectionHeading index='03' title='Contact' />

      <div className='mt-12 grid gap-16 lg:grid-cols-2'>
        <div>
          <p className='text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl'>
            Interested in working together?{' '}
            <span className='text-brand-text font-serif font-normal italic'>
              Let’s talk.
            </span>
          </p>
          <p className='text-muted-foreground mt-6 max-w-md'>
            Tell me a little about your project, or just say hi.
          </p>
          <CopyEmail />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function CopyEmail() {
  const [isCopied, setIsCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    toast.success('Email copied');
    setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
  }

  return (
    <div className='mt-8 flex items-center gap-3'>
      <a
        href={`mailto:${profile.email}`}
        className='border-foreground/30 hover:border-brand-text hover:text-brand-text border-b pb-1 text-xl tracking-tight transition-colors'
      >
        {profile.email}
      </a>
      <button
        type='button'
        onClick={copyEmail}
        aria-label='Copy email address'
        className='hover:bg-muted flex size-9 items-center justify-center rounded-full border transition-[background-color,transform] duration-100 active:scale-95'
      >
        {isCopied ? <Check className='size-4' /> : <Copy className='size-4' />}
      </button>
    </div>
  );
}
