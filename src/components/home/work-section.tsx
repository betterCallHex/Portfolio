import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { HoomanMark } from '@/components/hooman-mark';
import { Ledger, LedgerRow } from '@/components/ledger';
import { profile, stack, studioProducts } from '@/lib/profile';

export function WorkSection() {
  return (
    <section id='work' className='mx-auto max-w-6xl px-5 pt-28 sm:px-8'>
      <h2 className='text-4xl font-medium tracking-[-0.03em] sm:text-5xl'>
        Work
      </h2>
      <p className='mt-8 max-w-3xl font-serif text-3xl leading-tight text-balance sm:text-4xl'>
        At{' '}
        <a
          href={profile.studio.url}
          target='_blank'
          rel='noreferrer'
          className='hover:text-brand-text inline-flex items-baseline gap-2 transition-colors'
        >
          <HoomanMark className='h-[0.62em] self-center' />
          {profile.studio.name}
        </a>{' '}
        I take client products from prototype to production, with{' '}
        <em className='text-brand-text'>
          {profile.mergedPullRequests} pull requests merged
        </em>{' '}
        since October 2025.
      </p>

      <Ledger>
        {studioProducts.map((product) => (
          <LedgerRow key={product.title} term={product.title}>
            {product.description}
          </LedgerRow>
        ))}
        <LedgerRow term='Stack'>{stack.join(' · ')}</LedgerRow>
        <LedgerRow term='Open source'>
          Things I built while learning, breaking and rebuilding.
          <Link
            to='/projects'
            className='text-foreground hover:text-brand-text inline-flex w-fit items-center gap-1.5 transition-colors'
          >
            Browse the archive
            <ArrowRight className='size-4' />
          </Link>
        </LedgerRow>
      </Ledger>
    </section>
  );
}
