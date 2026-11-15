import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      aria-label='Toggle colour theme'
      className='relative rounded-full'
    >
      <Sun className='scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0' />
    </Button>
  );
}
