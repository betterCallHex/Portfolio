import { Await, createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { ProjectList } from '@/components/projects/project-list';
import { EASE_OUT_EXPO } from '@/components/reveal';
import {
  GitHubUnavailable,
  ProjectListSkeleton,
} from '@/components/route-states';
import { getShowcaseRepositories } from '@/lib/github';
import { profile } from '@/lib/profile';

export const Route = createFileRoute('/projects/')({
  head: () => ({ meta: [{ title: `Archive — ${profile.name}` }] }),
  loader: () => ({
    projects: getShowcaseRepositories().catch(() => null),
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();

  return (
    <div className='mx-auto max-w-6xl px-5 sm:px-8'>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className='pt-16 pb-16 md:pt-24'
      >
        <p className='text-muted-foreground font-mono text-xs tracking-widest uppercase'>
          Archive
        </p>
        <h1 className='mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[1] font-medium tracking-[-0.04em] text-balance'>
          Things I’ve made trying to put my{' '}
          <span className='text-brand font-serif font-normal italic'>dent</span>{' '}
          in the universe.
        </h1>
        <p className='text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed'>
          I’ve worked on tons of little projects over the years, but these are
          the ones I’m most proud of. Many of them are open source, so if
          something piques your interest, check out the code and contribute if
          you have ideas for how it can be improved.
        </p>
      </motion.header>

      <div className='border-t'>
        <Await promise={projects} fallback={<ProjectListSkeleton rows={6} />}>
          {(repositories) =>
            repositories ? (
              <ProjectList projects={repositories} />
            ) : (
              <GitHubUnavailable githubUrl={profile.githubUrl} />
            )
          }
        </Await>
      </div>
    </div>
  );
}
