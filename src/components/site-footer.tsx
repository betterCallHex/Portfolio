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

        <ul className='flex flex-col gap-3 md:justify-self-end'>
          {socialLinks.map((link) => (
            <li key={link.label}>
              <ArrowLink href={link.href}>{link.label}</ArrowLink>
            </li>
          ))}
        </ul>
      </div>

      <div className='text-muted-foreground mx-auto flex max-w-6xl flex-col-reverse items-start justify-between gap-4 px-5 py-8 text-xs sm:flex-row sm:items-center sm:px-8'>
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <button
          type='button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
        >
          Back to top <ArrowUp className='size-3.5' />
        </button>
      </div>
    </footer>
  );
}
