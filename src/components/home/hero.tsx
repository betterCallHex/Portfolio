import { CatchBoundary } from '@tanstack/react-router';
import { cn } from 'cn';
import { ArrowDownRight, Download } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { lazy, type Ref, Suspense, useRef, useState } from 'react';
import { HoomanMark } from '@/components/hooman-mark';
import type { DeskSceneHandle } from '@/components/scene/desk-scene';
import { SectionLink } from '@/components/section-link';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/profile';

const DeskScene = lazy(() => import('@/components/scene/desk-scene'));

export function Hero() {
  const scene = useRef<DeskSceneHandle>(null);

  return (
    <section
      id='intro'
      className='mx-auto max-w-6xl overflow-x-clip px-5 pt-12 sm:px-8 md:pt-16'
    >
      <p className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
        {profile.role} ·{' '}
        <a
          href={profile.studio.url}
          target='_blank'
          rel='noreferrer'
          className='hover:text-foreground inline-flex items-baseline gap-1.5 underline-offset-4 transition-colors hover:underline'
        >
          <HoomanMark className='h-2.5 self-center' />
          {profile.studio.name}
        </a>
      </p>

      <div className='mt-6 grid items-center gap-x-8 gap-y-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]'>
        <h1 className='relative z-10 text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance'>
          <span className='sr-only'>{profile.name}, </span>
          <span onPointerEnter={() => scene.current?.nudge('javascript')}>
            JavaScript
          </span>{' '}
          junkie,{' '}
          <span
            onPointerEnter={() => scene.current?.nudge('react')}
            className='text-brand-text font-serif font-normal italic'
          >
            React
          </span>{' '}
          enthusiast &amp;{' '}
          <span onPointerEnter={() => scene.current?.nudge('coffee')}>
            coffee
          </span>{' '}
          <span className='text-brand-text font-serif font-normal italic'>
            addict.
          </span>
        </h1>
        <DeskStage ref={scene} />
      </div>

      <div className='mt-8 grid gap-8 md:grid-cols-2 md:items-end'>
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
    </section>
  );
}

function DeskStage({ ref }: { ref: Ref<DeskSceneHandle> }) {
  const [isReady, setIsReady] = useState(false);
  const isStill = useReducedMotion() ?? false;

  return (
    <div className='relative mx-auto aspect-square w-full max-w-sm lg:max-w-none'>
      <CatchBoundary getResetKey={() => 'desk-scene'} errorComponent={Portrait}>
        <Suspense fallback={null}>
          <div
            className={cn(
              'absolute -inset-[14%] transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
              isReady ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            )}
          >
            <DeskScene
              ref={ref}
              isStill={isStill}
              onReady={() => setIsReady(true)}
            />
          </div>
        </Suspense>
      </CatchBoundary>
    </div>
  );
}

function Portrait() {
  return (
    <img
      src={profile.avatar}
      alt={`Illustrated portrait of ${profile.name}`}
      width={460}
      height={460}
      className='bg-muted mx-auto size-52 rounded-[2rem] border object-cover lg:mt-24'
    />
  );
}
