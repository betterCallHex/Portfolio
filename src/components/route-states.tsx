import {
  type ErrorComponentProps,
  Link,
  useRouter,
} from '@tanstack/react-router';
import { ArrowLeft, RotateCw } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function NotFound() {
  return (
    <StatusPage code='404' title='This page wandered off.'>
      The page you’re looking for doesn’t exist or has moved.
    </StatusPage>
  );
}

export function RouteError({ error }: ErrorComponentProps) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';
  const router = useRouter();

  return (
    <StatusPage
      code='Error'
      title='Something went wrong.'
      action={
        <Button
          variant='outline'
          className='h-10 rounded-full px-4'
          onClick={() => router.invalidate()}
        >
          <RotateCw />
          Try again
        </Button>
      }
    >
      {message}
    </StatusPage>
  );
}

export function StatusPage({
  code,
  title,
  action,
  children,
}: {
  code: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className='mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8'>
      <p className='text-brand font-serif text-[clamp(5rem,16vw,11rem)] leading-none italic'>
        {code}
      </p>
      <h1 className='mt-6 text-3xl font-medium tracking-tight sm:text-4xl'>
        {title}
      </h1>
      <p className='text-muted-foreground mt-3 max-w-lg'>{children}</p>
      <div className='mt-8 flex flex-wrap gap-3'>
        <Button
          className='h-10 rounded-full px-4'
          nativeButton={false}
          render={<Link to='/' />}
        >
          <ArrowLeft />
          Back home
        </Button>
        {action}
      </div>
    </section>
  );
}

export function ProjectListSkeleton({ rows }: { rows: number }) {
  const rowKeys = Array.from({ length: rows }, (_, row) => `skeleton-${row}`);

  return (
    <div
      role='status'
      aria-busy
      aria-label='Loading projects'
      className='divide-y'
    >
      {rowKeys.map((rowKey) => (
        <div key={rowKey} className='flex flex-col gap-4 py-10 md:pl-20'>
          <Skeleton className='h-8 w-2/5' />
          <Skeleton className='h-4 w-3/4' />
          <div className='flex gap-2'>
            <Skeleton className='h-5 w-16 rounded-full' />
            <Skeleton className='h-5 w-20 rounded-full' />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GitHubUnavailable({ githubUrl }: { githubUrl: string }) {
  return (
    <p className='text-muted-foreground py-16 text-center'>
      Couldn’t reach GitHub right now.{' '}
      <a
        href={githubUrl}
        target='_blank'
        rel='noreferrer'
        className='text-foreground hover:text-brand underline underline-offset-4'
      >
        Browse the projects on GitHub
      </a>{' '}
      instead.
    </p>
  );
}
