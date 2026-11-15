import { Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';

export function SectionLink({
  section,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { section: string }) {
  return (
    <Link
      {...props}
      to='/'
      hash={section}
      hashScrollIntoView={{ behavior: 'smooth', block: 'start' }}
      viewTransition={false}
    />
  );
}
