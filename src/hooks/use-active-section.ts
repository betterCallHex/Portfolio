import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isHomeReady = useRouterState({
    select: (state) =>
      state.location.pathname === '/' && state.status === 'idle',
  });

  useEffect(() => {
    if (!isHomeReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isHomeReady, sectionIds]);

  return isHomeReady ? activeSection : null;
}
