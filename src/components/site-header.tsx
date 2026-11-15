import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { SectionLink } from '@/components/section-link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useActiveSection } from '@/hooks/use-active-section';
import { profile } from '@/lib/profile';

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'principles', label: 'How I work' },
  { id: 'contact', label: 'Contact' },
] as const;

const observedSectionIds = ['intro', ...sections.map(({ id }) => id)];
const INDICATOR_SPRING = { type: 'spring', bounce: 0, duration: 0.4 } as const;

export function SiteHeader() {
  const activeSection = useActiveSection(observedSectionIds);

  return (
    <header
      className='bg-background/80 sticky top-0 z-40 border-b backdrop-blur-xl'
      style={{ viewTransitionName: 'site-header' }}
    >
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8'>
        <Link to='/' className='flex items-center gap-3'>
          <img
            src={profile.avatar}
            alt=''
            width={32}
            height={32}
            className='bg-muted size-8 rounded-full object-cover'
          />
          <span className='text-sm font-medium tracking-tight'>
            {profile.name}
          </span>
        </Link>

        <nav aria-label='Primary' className='hidden items-center gap-1 md:flex'>
          {sections.map((section) => (
            <SectionLink
              key={section.id}
              section={section.id}
              className={cn(
                'text-muted-foreground hover:text-foreground relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                activeSection === section.id && 'text-foreground',
              )}
            >
              {activeSection === section.id && (
                <motion.span
                  layoutId='active-section'
                  transition={INDICATOR_SPRING}
                  className='bg-muted absolute inset-0 rounded-full'
                />
              )}
              <span className='relative'>{section.label}</span>
            </SectionLink>
          ))}
          <Link
            to='/projects'
            className='text-muted-foreground hover:text-foreground [&.active]:text-foreground rounded-full px-3.5 py-1.5 text-sm transition-colors'
          >
            Archive
          </Link>
        </nav>

        <div className='flex items-center gap-1'>
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            aria-label='Open navigation'
            className='rounded-full md:hidden'
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side='right' className='gap-0 p-6 pt-16'>
        <SheetTitle className='text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase'>
          Navigation
        </SheetTitle>
        <nav aria-label='Mobile' className='flex flex-col'>
          {sections.map((section) => (
            <SectionLink
              key={section.id}
              section={section.id}
              onClick={close}
              className='border-b py-4 text-2xl tracking-tight'
            >
              {section.label}
            </SectionLink>
          ))}
          <Link
            to='/projects'
            onClick={close}
            className='py-4 text-2xl tracking-tight'
          >
            Archive
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
