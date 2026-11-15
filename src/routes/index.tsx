import { Await, createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { AboutSection } from '@/components/home/about-section';
import { ContactSection } from '@/components/home/contact-section';
import { Hero } from '@/components/home/hero';
import { TechMarquee } from '@/components/home/tech-marquee';
import { ProjectList } from '@/components/projects/project-list';
import {
  GitHubUnavailable,
  ProjectListSkeleton,
} from '@/components/route-states';
import { SectionHeading } from '@/components/section-heading';
import { getPinnedRepositories } from '@/lib/github';
import { profile } from '@/lib/profile';

export const Route = createFileRoute('/')({
  loader: () => ({
    pinnedProjects: getPinnedRepositories().catch(() => null),
  }),
  component: HomePage,
});

function HomePage() {
  const { pinnedProjects } = Route.useLoaderData();

  return (
    <>
      <Hero />
      <TechMarquee />

      <section id='work' className='mx-auto max-w-6xl px-5 pt-32 sm:px-8'>
        <SectionHeading
          index='01'
          title='Selected work'
          aside={
            <Link
              to='/projects'
              className='group text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors'
            >
              All projects
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
            </Link>
          }
        />
        <Await
          promise={pinnedProjects}
          fallback={<ProjectListSkeleton rows={2} />}
        >
          {(projects) =>
            projects ? (
              <ProjectList projects={projects} />
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
