import type { ReactNode } from 'react';

export function Ledger({ children }: { children: ReactNode }) {
  return <dl className='mt-12 border-t'>{children}</dl>;
}

export function LedgerRow({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <div className='grid gap-x-12 gap-y-3 border-b py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'>
      <dt className='text-2xl font-medium tracking-tight'>{term}</dt>
      <dd className='text-muted-foreground flex flex-col gap-4 text-lg leading-relaxed'>
        {children}
      </dd>
    </div>
  );
}
