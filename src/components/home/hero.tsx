import { ArrowDownRight, Download } from 'lucide-react';
import { SectionLink } from '@/components/section-link';
import { Button } from '@/components/ui/button';
import { coreStack, profile } from '@/lib/profile';

export function Hero() {
  return (
    <section
      id='intro'
      className='mx-auto max-w-6xl px-5 pt-16 sm:px-8 md:pt-24'
    >
      <p className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
        {profile.role}
      </p>

      <div className='mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end'>
        <h1 className='max-w-4xl text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance'>
          <span className='sr-only'>{profile.name}, </span>
          JavaScript junkie,{' '}
          <span className='text-brand-text font-serif font-normal italic'>
            React
          </span>{' '}
          enthusiast &amp; coffee{' '}
          <span className='text-brand-text font-serif font-normal italic'>
            addict.
          </span>
        </h1>
        <img
          src={profile.avatar}
          alt={`Illustrated portrait of ${profile.name}`}
          width={460}
          height={460}
          className='bg-muted hidden size-52 rounded-[2rem] border object-cover lg:block'
        />
      </div>

      <div className='mt-10 grid gap-8 md:grid-cols-2 md:items-end'>
        <p className='text-muted-foreground max-w-md text-lg leading-relaxed'>
          {profile.intro}
        </p>
        <div className='flex flex-wrap gap-3 md:justify-self-end'>
          <Button
            size='lg'
            className='bg-brand text-brand-foreground hover:bg-brand/85 h-11 rounded-full px-5'
            nativeButton={false}
            render={<SectionLink section='contact' />}
          >
            Get in touch
            <ArrowDownRight />
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='h-11 rounded-full px-5'
            nativeButton={false}
            render={<a href={profile.resume} download />}
          >
            <Download />
            Download CV
          </Button>
        </div>
      </div>

      <StackMarquee />
    </section>
  );
}

function StackMarquee() {
  return (
    <div className='mt-20 overflow-hidden border-y [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5'>
      <div className='animate-marquee flex w-max'>
        <StackList />
        <StackList hidden />
      </div>
    </div>
  );
}

function StackList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className='flex shrink-0'>
      {coreStack.map((technology) => (
        <li
          key={technology}
          className='text-muted-foreground flex items-center gap-10 pr-10 font-mono text-sm tracking-widest uppercase'
        >
          {technology}
          <span className='bg-brand size-1.5 rounded-full' />
        </li>
      ))}
    </ul>
  );
}
