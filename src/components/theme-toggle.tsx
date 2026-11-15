import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
    const applyTheme = () => {
      root.classList.replace(
        root.classList.contains('dark') ? 'dark' : 'light',
        nextTheme,
      );
      flushSync(() => setTheme(nextTheme));
    };

    if (!document.startViewTransition) {
      applyTheme();
      return;
    }
    document.startViewTransition(applyTheme);
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      aria-label='Toggle colour theme'
      className='rounded-full'
    >
      <Sun className='hidden dark:block' />
      <Moon className='dark:hidden' />
    </Button>
  );
}
