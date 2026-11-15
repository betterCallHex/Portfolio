import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { ArrowLink } from '@/components/arrow-link';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { yearOf } from '@/lib/date';
import { displayName, type Repository } from '@/lib/github';

const VISIBLE_TOPICS = 3;

export function ProjectList({ projects }: { projects: Repository[] }) {
  if (!projects.length) {
    return (
      <p className='text-muted-foreground py-16 text-center'>
        No projects to show yet. Check back soon.
      </p>
    );
  }

  return (
    <ol className='divide-y'>
      {projects.map((project, index) => (
        <Reveal key={project.name} delay={Math.min(index, 6) * 0.05}>
          <ProjectRow project={project} index={index} />
        </Reveal>
      ))}
    </ol>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Repository;
  index: number;
}) {
  return (
    <li className='group relative grid gap-x-8 gap-y-3 py-8 transition-colors md:grid-cols-[3rem_1fr_auto] md:py-10'>
      <span className='text-muted-foreground hidden pt-2 font-mono text-xs md:block'>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className='min-w-0'>
        <h3 className='text-2xl font-medium tracking-tight capitalize sm:text-3xl'>
          <Link
            to='/projects/$projectName'
            params={{ projectName: project.name }}
            className='after:absolute after:inset-0 after:content-[""] focus-visible:outline-none'
          >
            {displayName(project.name)}
          </Link>
        </h3>
        <p className='text-muted-foreground mt-3 line-clamp-2 max-w-2xl'>
          {project.description}
        </p>
        <div className='mt-5 flex flex-wrap items-center gap-2'>
          {project.topics.slice(0, VISIBLE_TOPICS).map((topic) => (
            <Badge key={topic} variant='outline' className='font-mono'>
              {topic}
            </Badge>
          ))}
          <span className='text-muted-foreground relative z-10 ml-auto flex gap-5 md:ml-4'>
            {project.homepage && (
              <ArrowLink href={project.homepage}>Live</ArrowLink>
            )}
            <ArrowLink href={project.html_url}>Source</ArrowLink>
          </span>
        </div>
      </div>

      <div className='hidden flex-col items-end justify-between md:flex'>
        <span className='text-muted-foreground font-mono text-xs'>
          {yearOf(project.created_at)}
        </span>
        <span className='group-hover:border-foreground group-hover:bg-foreground group-hover:text-background group-has-focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-full border transition-all duration-500 group-has-focus-visible:ring-3'>
          <ArrowRight className='size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0' />
        </span>
      </div>
    </li>
  );
}
