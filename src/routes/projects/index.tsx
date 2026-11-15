import { Await, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { ArchiveList } from '@/components/projects/archive-list';
import {
  GitHubUnavailable,
  ProjectListSkeleton,
} from '@/components/route-states';
import { getShowcaseRepositories, type Repository } from '@/lib/github';
import { profile } from '@/lib/profile';

const FILTER_TOPIC_COUNT = 8;

export const Route = createFileRoute('/projects/')({
  validateSearch: z.object({ topic: z.string().optional() }),
  head: () => ({ meta: [{ title: `Repositories — ${profile.name}` }] }),
  loader: () => ({
    projects: getShowcaseRepositories().catch(() => null),
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();
  const { topic } = Route.useSearch();

  return (
    <div className='mx-auto max-w-6xl px-5 sm:px-8'>
      <header className='pt-16 pb-16 md:pt-24'>
        <p className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
          Archive
        </p>
        <h1 className='mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.045em]'>
          Things I’ve made trying to put my{' '}
          <span className='text-brand-text font-serif font-normal italic'>
            dent
          </span>{' '}
          in the universe.
        </h1>
        <p className='text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed'>
          I’ve worked on tons of little projects over the years. Many of them
          are open source, so if something piques your interest, check out the
          code and contribute if you have ideas for how it can be improved.
        </p>
      </header>

      <Await promise={projects} fallback={<ProjectListSkeleton rows={6} />}>
        {(repositories) =>
          repositories ? (
            <ArchiveList
              projects={repositories}
              topics={popularTopics(repositories)}
              activeTopic={topic}
            />
          ) : (
            <GitHubUnavailable githubUrl={profile.githubUrl} />
          )
        }
      </Await>
    </div>
  );
}

function popularTopics(repositories: Repository[]) {
  const counts = new Map<string, number>();
  for (const topic of repositories.flatMap((repository) => repository.topics)) {
    counts.set(topic, (counts.get(topic) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((first, second) => second[1] - first[1])
    .slice(0, FILTER_TOPIC_COUNT)
    .map(([topic]) => topic);
}
