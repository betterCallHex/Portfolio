import { Await, createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { AboutSection } from '@/components/home/about-section';
import { ContactSection } from '@/components/home/contact-section';
import { Hero } from '@/components/home/hero';
import { RepoCard } from '@/components/projects/repo-card';
import {
  GitHubUnavailable,
  ProjectListSkeleton,
} from '@/components/route-states';
import { SectionHeading } from '@/components/section-heading';
import { getFeaturedRepositories } from '@/lib/github';
import { profile } from '@/lib/profile';

export const Route = createFileRoute('/')({
  loader: () => ({
    featuredProjects: getFeaturedRepositories().catch(() => null),
  }),
  component: HomePage,
});

function HomePage() {
  const { featuredProjects } = Route.useLoaderData();

  return (
    <>
      <Hero />

      <section id='work' className='mx-auto max-w-6xl px-5 pt-28 sm:px-8'>
        <SectionHeading
          index='01'
          title='Selected repos'
          aside={
            <Link
              to='/projects'
              className='text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors'
            >
              All repos
              <ArrowRight className='size-4' />
            </Link>
          }
        />
        <p className='text-muted-foreground mt-6 max-w-xl'>
          Things I’ve built while learning, breaking and rebuilding. The code is
          the interesting part, so each one links straight to GitHub.
        </p>
        <Await
          promise={featuredProjects}
          fallback={<ProjectListSkeleton rows={2} />}
        >
          {(projects) =>
            projects ? (
              <div className='mt-10 grid gap-5 md:grid-cols-2'>
                {projects.map((project) => (
                  <RepoCard key={project.name} project={project} />
                ))}
              </div>
            ) : (
              <GitHubUnavailable githubUrl={profile.githubUrl} />
            )
          }
        </Await>
      </section>

      <AboutSection />
      <ContactSection />
    </>
  );
}
