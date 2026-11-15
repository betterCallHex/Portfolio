import { Link } from '@tanstack/react-router';
import { ArrowUp } from 'lucide-react';
import { ArrowLink } from '@/components/arrow-link';
import { NewsletterForm } from '@/components/newsletter-form';
import { profile, socialLinks } from '@/lib/profile';

export function SiteFooter() {
  return (
    <footer className='mt-32 border-t'>
      <div className='mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2'>
        <div className='max-w-sm'>
          <h2 className='text-lg font-medium tracking-tight'>
            Stay up to date
          </h2>
          <p className='text-muted-foreground mt-2 text-sm'>
            Get notified when I publish something new, and unsubscribe at any
            time.
          </p>
          <NewsletterForm />
        </div>

        <div className='grid grid-cols-2 gap-8 text-sm md:justify-self-end'>
          <div className='flex flex-col gap-3'>
            <span className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
              Elsewhere
            </span>
            {socialLinks.map((link) => (
              <ArrowLink key={link.label} href={link.href} className='w-fit'>
                {link.label}
              </ArrowLink>
            ))}
          </div>
          <div className='flex flex-col gap-3'>
            <span className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
              Site
            </span>
            <Link to='/' hash='work' className='hover:text-brand'>
              Work
            </Link>
            <Link to='/projects' className='hover:text-brand'>
              Archive
            </Link>
            <a href={profile.resume} download className='hover:text-brand'>
              Résumé
            </a>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-6xl overflow-hidden px-5 sm:px-8'>
        <p
          aria-hidden
          className='text-foreground/90 font-serif text-[clamp(5rem,22vw,17rem)] leading-[0.8] tracking-tight italic select-none'
        >
          {profile.firstName}
          <span className='text-brand'>.</span>
        </p>
      </div>

      <div className='text-muted-foreground mx-auto flex max-w-6xl flex-col-reverse items-start justify-between gap-4 px-5 py-8 text-xs sm:flex-row sm:items-center sm:px-8'>
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a
          href='#top'
          className='hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
        >
          Back to top <ArrowUp className='size-3.5' />
        </a>
      </div>
    </footer>
  );
}
