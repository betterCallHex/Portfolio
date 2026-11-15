import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { yearOf } from '@/lib/date';
import { displayName, type Repository } from '@/lib/github';

const LAYOUT_SPRING = { type: 'spring', bounce: 0, duration: 0.35 } as const;

export function ArchiveList({
  projects,
  topics,
  activeTopic,
}: {
  projects: Repository[];
  topics: string[];
  activeTopic: string | undefined;
}) {
  const visible = activeTopic
    ? projects.filter((project) => project.topics.includes(activeTopic))
    : projects;

  return (
    <LayoutGroup>
      <TopicFilter topics={topics} activeTopic={activeTopic} />

      <ol className='mt-8 border-t'>
        <AnimatePresence mode='popLayout' initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={LAYOUT_SPRING}
              className='relative border-b'
            >
              <ArchiveRow project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {visible.length === 0 && (
        <p className='text-muted-foreground py-16 text-center'>
          Nothing tagged with that topic.
        </p>
      )}
    </LayoutGroup>
  );
}

function TopicFilter({
  topics,
  activeTopic,
}: {
  topics: string[];
  activeTopic: string | undefined;
}) {
  const options = [undefined, ...topics];

  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((topic) => {
        const isActive = topic === activeTopic;
        return (
          <Link
            key={topic ?? 'all'}
            to='/projects'
            search={{ topic }}
            resetScroll={false}
            viewTransition={false}
            className={cn(
              'relative rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors active:scale-95',
              isActive
                ? 'text-brand-foreground border-transparent'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {isActive && (
              <motion.span
                layoutId='active-topic'
                transition={LAYOUT_SPRING}
                className='bg-brand absolute inset-0 rounded-full'
              />
            )}
            <span className='relative'>{topic ?? 'All'}</span>
          </Link>
        );
      })}
    </div>
  );
}

function ArchiveRow({ project }: { project: Repository }) {
  return (
    <div className='grid items-baseline gap-x-6 gap-y-1 py-6 md:grid-cols-[1fr_auto_auto]'>
      <div className='min-w-0'>
        <h3
          className='text-2xl font-medium tracking-tight capitalize sm:text-3xl'
          style={{ viewTransitionName: `project-title-${project.name}` }}
        >
          <Link
            to='/projects/$projectName'
            params={{ projectName: project.name }}
            className='hover:text-brand-text after:absolute after:inset-0 after:content-[""]'
          >
            {displayName(project.name)}
          </Link>
        </h3>
        <p className='text-muted-foreground mt-1.5 line-clamp-1 max-w-2xl'>
          {project.description}
        </p>
      </div>
      <span className='text-muted-foreground font-mono text-xs'>
        {project.language ?? '—'} · {yearOf(project.created_at)}
      </span>
      <a
        href={project.html_url}
        target='_blank'
        rel='noreferrer'
        className='hover:text-brand-text relative z-10 hidden items-center gap-1 text-sm transition-colors md:inline-flex'
      >
        GitHub
        <ArrowUpRight className='size-3.5' />
      </a>
    </div>
  );
}
