import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { RepoCover } from '@/components/projects/repo-cover';
import { Badge } from '@/components/ui/badge';
import { yearOf } from '@/lib/date';
import { displayName, type Repository } from '@/lib/github';

const VISIBLE_TOPICS = 3;

export function RepoCard({ project }: { project: Repository }) {
  return (
    <article className='bg-card hover:border-foreground/25 relative flex flex-col overflow-hidden rounded-3xl border transition-[transform,border-color] duration-100 ease-out has-[a:active]:scale-[0.99]'>
      <div style={{ viewTransitionName: `project-cover-${project.name}` }}>
        <RepoCover
          name={project.name}
          label={project.language ?? undefined}
          className='aspect-[16/9]'
        />
      </div>

      <div className='flex flex-1 flex-col gap-4 p-6'>
        <div className='flex items-baseline justify-between gap-4'>
          <h3
            className='text-2xl font-medium tracking-tight capitalize'
            style={{ viewTransitionName: `project-title-${project.name}` }}
          >
            <Link
              to='/projects/$projectName'
              params={{ projectName: project.name }}
              className='after:absolute after:inset-0 after:content-[""]'
            >
              {displayName(project.name)}
            </Link>
          </h3>
          <span className='text-muted-foreground font-mono text-xs'>
            {yearOf(project.created_at)}
          </span>
        </div>
        <p className='text-muted-foreground line-clamp-2'>
          {project.description}
        </p>
        <div className='mt-auto flex flex-wrap items-center gap-2 pt-2'>
          {project.topics.slice(0, VISIBLE_TOPICS).map((topic) => (
            <Badge key={topic} variant='outline' className='font-mono'>
              {topic}
            </Badge>
          ))}
          <a
            href={project.html_url}
            target='_blank'
            rel='noreferrer'
            className='hover:text-brand-text relative z-10 ml-auto inline-flex items-center gap-1 text-sm transition-colors'
          >
            GitHub
            <ArrowUpRight className='size-3.5' />
          </a>
        </div>
      </div>
    </article>
  );
}
