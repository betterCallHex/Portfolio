import type { ReactNode } from 'react';
import { Reveal } from '@/components/reveal';

export function SectionHeading({
  index,
  title,
  aside,
}: {
  index: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <Reveal className='flex items-end justify-between gap-6 border-b pb-5'>
      <h2 className='flex items-baseline gap-4 text-3xl font-medium tracking-tight sm:text-4xl'>
        <span className='text-muted-foreground font-mono text-xs tracking-normal'>
          {index}
        </span>
        {title}
      </h2>
      {aside}
    </Reveal>
  );
}
