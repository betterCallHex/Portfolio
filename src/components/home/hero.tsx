import { Link } from '@tanstack/react-router';
import { ArrowDownRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { ArrowLink } from '@/components/arrow-link';
import { EASE_OUT_EXPO } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { profile, socialLinks } from '@/lib/profile';

const headline = [
  { text: 'JavaScript' },
  { text: 'junkie,' },
  { text: 'React', emphasis: true },
  { text: 'enthusiast' },
  { text: '&' },
  { text: 'coffee' },
  { text: 'addict.', emphasis: true },
];

export function Hero() {
  return (
    <section
      id='intro'
      className='mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-20 sm:px-8 md:pt-28 lg:grid-cols-[1fr_auto] lg:items-end'
    >
      <div>
        <FadeIn
          delay={0}
          className='text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-widest uppercase'
        >
          <span className='text-foreground inline-flex items-center gap-2'>
            <span className='bg-brand size-2 rounded-full' />
            {profile.name}
          </span>
          <span>{profile.role}</span>
        </FadeIn>

        <h1 className='mt-8 max-w-4xl text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] font-medium tracking-[-0.045em] text-balance'>
          <span className='sr-only'>{profile.name}, </span>
          {headline.map((word, index) => (
            <motion.span
              key={word.text}
              initial={{ opacity: 0, y: '0.4em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.9,
                delay: 0.1 + index * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              className={
                word.emphasis
                  ? 'text-brand inline-block pr-[0.06em] font-serif font-normal tracking-[-0.02em] italic'
                  : 'inline-block'
              }
            >
              {word.text}&nbsp;
            </motion.span>
          ))}
        </h1>

        <FadeIn
          delay={0.55}
          className='text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed'
        >
          {profile.intro}
        </FadeIn>

        <FadeIn delay={0.7} className='mt-10 flex flex-wrap items-center gap-3'>
          <Button
            size='lg'
            className='h-11 rounded-full px-5'
            nativeButton={false}
            render={<Link to='/' hash='contact' />}
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
        </FadeIn>

        <FadeIn
          delay={0.8}
          className='text-muted-foreground mt-10 flex flex-wrap gap-x-6 gap-y-2'
        >
          {socialLinks.map((link) => (
            <ArrowLink key={link.label} href={link.href}>
              {link.label}
            </ArrowLink>
          ))}
        </FadeIn>
      </div>

      <motion.figure
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 2 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 1.2, delay: 0.3 }}
        className='bg-card hidden w-64 shrink-0 rounded-3xl border p-3 shadow-xl shadow-black/5 lg:block'
      >
        <img
          src={profile.avatar}
          alt={`Illustrated portrait of ${profile.name}`}
          width={460}
          height={460}
          className='bg-muted aspect-square w-full rounded-2xl object-cover'
        />
        <figcaption className='text-muted-foreground flex justify-between px-1 pt-3 font-mono text-[11px] tracking-widest uppercase'>
          <span>Fig. 01</span>
          <span>Yunes, illustrated</span>
        </figcaption>
      </motion.figure>
    </section>
  );
}

function FadeIn({
  delay,
  className,
  children,
}: {
  delay: number;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
