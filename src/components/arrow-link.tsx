import { cn } from 'cn';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps } from 'react';

export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<'a'>) {
  return (
    <a
      target='_blank'
      rel='noreferrer'
      className={cn(
        'hover:text-brand-text inline-flex items-center gap-1 text-sm underline-offset-4 transition-colors hover:underline',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight className='size-3.5' />
    </a>
  );
}
