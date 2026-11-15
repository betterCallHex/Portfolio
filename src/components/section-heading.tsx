import type { ReactNode } from 'react';

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
    <div className='flex items-end justify-between gap-6 border-b pb-5'>
      <h2 className='flex items-baseline gap-4 text-4xl font-medium tracking-[-0.03em] sm:text-5xl'>
        <span className='text-muted-foreground font-mono text-xs tracking-normal'>
          {index}
        </span>
        {title}
      </h2>
      {aside}
    </div>
  );
}
