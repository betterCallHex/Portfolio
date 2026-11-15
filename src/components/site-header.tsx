import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
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
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

const observedSectionIds = ['intro', ...sections.map(({ id }) => id)];

export function SiteHeader() {
  const activeSection = useActiveSection(observedSectionIds);

  return (
    <header className='border-border/60 bg-background/75 sticky top-0 z-40 border-b backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8'>
        <Link to='/' hash='intro' className='group flex items-center gap-3'>
          <img
            src={profile.avatar}
            alt=''
            width={32}
            height={32}
            className='bg-muted size-8 rounded-full border object-cover transition-transform duration-500 group-hover:rotate-[-8deg]'
          />
          <span className='text-sm font-medium tracking-tight'>
            {profile.name}
          </span>
        </Link>

        <nav aria-label='Primary' className='hidden items-center gap-1 md:flex'>
          {sections.map((section) => (
            <Link
              key={section.id}
              to='/'
              hash={section.id}
              className={cn(
                'text-muted-foreground hover:text-foreground relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                activeSection === section.id && 'text-foreground',
              )}
            >
              {activeSection === section.id && (
                <motion.span
                  layoutId='active-section'
                  className='bg-muted absolute inset-0 rounded-full'
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className='relative'>{section.label}</span>
            </Link>
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
          <MobileNavigation activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}

function MobileNavigation({ activeSection }: { activeSection: string | null }) {
  const [open, setOpen] = useState(false);

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
        <SheetTitle className='text-muted-foreground mb-6 font-mono text-xs tracking-widest uppercase'>
          Navigation
        </SheetTitle>
        <nav aria-label='Mobile' className='flex flex-col'>
          {sections.map((section, index) => (
            <Link
              key={section.id}
              to='/'
              hash={section.id}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-baseline gap-4 border-b py-4 text-2xl tracking-tight',
                activeSection === section.id
                  ? 'text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <span className='text-muted-foreground font-mono text-xs'>
                0{index + 1}
              </span>
              {section.label}
            </Link>
          ))}
          <Link
            to='/projects'
            onClick={() => setOpen(false)}
            className='text-muted-foreground [&.active]:text-foreground flex items-baseline gap-4 py-4 text-2xl tracking-tight'
          >
            <span className='font-mono text-xs'>→</span>
            Archive
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
