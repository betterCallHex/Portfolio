import { Ledger, LedgerRow } from '@/components/ledger';
import { principles } from '@/lib/profile';

export function PrinciplesSection() {
  return (
    <section id='principles' className='mx-auto max-w-6xl px-5 pt-28 sm:px-8'>
      <h2 className='text-4xl font-medium tracking-[-0.03em] sm:text-5xl'>
        How I work
      </h2>

      <Ledger>
        {principles.map((principle) => (
          <LedgerRow key={principle.title} term={principle.title}>
            {principle.statement}
            <p className='flex flex-col font-mono text-sm leading-relaxed'>
              <del className='bg-destructive/10 text-destructive flex gap-3 rounded-t-lg px-4 py-2.5 no-underline'>
                <span aria-hidden>−</span>
                {principle.instead}
              </del>
              <ins className='bg-brand/15 text-foreground flex gap-3 rounded-b-lg px-4 py-2.5 no-underline'>
                <span aria-hidden className='text-brand-text'>
                  +
                </span>
                {principle.preferred}
              </ins>
            </p>
          </LedgerRow>
        ))}
      </Ledger>
    </section>
  );
}
