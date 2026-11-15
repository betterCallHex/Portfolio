import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { MotionConfig } from 'motion/react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/sonner';
import { profile } from '@/lib/profile';

export const Route = createRootRoute({
  head: () => ({
    meta: [{ title: `${profile.name} — ${profile.role}` }],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <MotionConfig reducedMotion='user'>
      <HeadContent />
      <div id='top' />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position='bottom-right' />
    </MotionConfig>
  );
}
