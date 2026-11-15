import {
  Await,
  createFileRoute,
  Link,
  useParams,
} from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO, Reveal } from '@/components/reveal';
import { StatusPage } from '@/components/route-states';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatLongDate } from '@/lib/date';
import {
  displayName,
  getReadmeHtml,
  getRepository,
  type Repository,
} from '@/lib/github';
import { profile } from '@/lib/profile';

export const Route = createFileRoute('/projects/$projectName')({
  loader: async ({ params }) => ({
    repository: await getRepository(params.projectName),
    readme: getReadmeHtml(params.projectName).catch(() => null),
  }),
  head: ({ params }) => ({
    meta: [{ title: `${displayName(params.projectName)} — ${profile.name}` }],
  }),
  pendingComponent: ProjectSkeleton,
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectPage() {
  const { repository, readme } = Route.useLoaderData();

  return (
    <article className='mx-auto max-w-6xl px-5 sm:px-8'>
      <ProjectHeader repository={repository} />

      <Reveal className='bg-card mt-16 rounded-3xl border p-6 sm:p-10 lg:p-14'>
        <Await promise={readme} fallback={<ReadmeSkeleton />}>
          {(html) =>
            html ? (
              <div
                className='prose prose-code:before:content-none prose-code:after:content-none prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-neutral dark:prose-invert prose-img:inline-block prose-pre:rounded-xl prose-img:rounded-lg prose-pre:border prose-pre:bg-muted prose-a:text-brand prose-pre:text-foreground prose-headings:tracking-tight prose-a:underline-offset-4 max-w-none [&_.anchor]:hidden [&_pre_code]:bg-transparent [&_pre_code]:p-0'
                // biome-ignore lint/security/noDangerouslySetInnerHtml: GitHub renders and sanitizes README HTML server-side (https://docs.github.com/en/rest/repos/contents#get-a-repository-readme)
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className='text-muted-foreground'>
                This project doesn’t have a README yet.
              </p>
            )
          }
        </Await>
      </Reveal>
    </article>
  );
}

function ProjectHeader({ repository }: { repository: Repository }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className='pt-12 md:pt-16'
    >
      <Link
        to='/projects'
        className='group text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors'
      >
        <ArrowLeft className='size-4 transition-transform group-hover:-translate-x-0.5' />
        All projects
      </Link>

      <h1 className='mt-10 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em] capitalize'>
        {displayName(repository.name)}
      </h1>
      <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed'>
        {repository.description}
      </p>

      {repository.topics.length > 0 && (
        <ul className='mt-8 flex flex-wrap gap-2'>
          {repository.topics.map((topic) => (
            <li key={topic}>
              <Badge variant='outline' className='font-mono'>
                {topic}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      <div className='mt-12 grid gap-8 border-y py-6 sm:grid-cols-[1fr_auto] sm:items-center'>
        <dl className='grid grid-cols-2 gap-6 text-sm sm:grid-cols-3'>
          <Meta label='Created' value={formatLongDate(repository.created_at)} />
          <Meta label='Updated' value={formatLongDate(repository.updated_at)} />
          {repository.language && (
            <Meta label='Language' value={repository.language} />
          )}
        </dl>
        <div className='flex flex-wrap gap-3'>
          {repository.homepage && (
            <Button
              className='h-10 rounded-full px-4'
              nativeButton={false}
              render={
                <a
                  href={repository.homepage}
                  target='_blank'
                  rel='noreferrer'
                />
              }
            >
              Visit live site
              <ArrowUpRight />
            </Button>
          )}
          <Button
            variant='outline'
            className='h-10 rounded-full px-4'
            nativeButton={false}
            render={
              <a href={repository.html_url} target='_blank' rel='noreferrer' />
            }
          >
            <Code2 />
            Source code
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
        {label}
      </dt>
      <dd className='mt-1.5'>{value}</dd>
    </div>
  );
}

function ProjectNotFound() {
  const { projectName } = useParams({ strict: false });

  return (
    <StatusPage code='404' title='Project not found.'>
      There’s no project called “{projectName}” in my GitHub account.
    </StatusPage>
  );
}

function ProjectSkeleton() {
  return (
    <div aria-busy className='mx-auto max-w-6xl px-5 pt-12 sm:px-8 md:pt-16'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='mt-10 h-20 w-3/5' />
      <Skeleton className='mt-6 h-5 w-2/5' />
      <Skeleton className='mt-12 h-20 w-full' />
      <Skeleton className='mt-16 h-96 w-full rounded-3xl' />
    </div>
  );
}

function ReadmeSkeleton() {
  return (
    <div aria-busy className='flex flex-col gap-4'>
      <Skeleton className='h-8 w-1/3' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-11/12' />
      <Skeleton className='h-4 w-4/5' />
      <Skeleton className='mt-6 h-48 w-full' />
    </div>
  );
}
