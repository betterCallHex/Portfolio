const GITHUB_USER = 'betterCallHex';

export const profile = {
  name: 'Yunes Maghsoudie',
  firstName: 'Yunes',
  role: 'Front-end developer',
  email: 'yunes@osloweb.no',
  githubUser: GITHUB_USER,
  githubUrl: `https://github.com/${GITHUB_USER}`,
  avatar: '/images/avatar.png',
  resume: '/pdf/cv.pdf',
  intro:
    'I’m Yunes, a web developer. That one guy who’s always trying out different technologies, exploring everywhere to find something new that fits in my toolbox.',
};

export const socialLinks = [
  { label: 'GitHub', href: profile.githubUrl },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yunes-maghsoudie-53114737b/',
  },
  { label: 'Telegram', href: 'https://t.me/YuooYi' },
  { label: 'Email', href: `mailto:${profile.email}` },
];

export const marqueeTechnologies = [
  { name: 'React', icon: '/svg/react.svg' },
  { name: 'Next.js', icon: '/svg/nextjs.svg' },
  { name: 'Tailwind CSS', icon: '/svg/tailwind.svg' },
  { name: 'JavaScript', icon: '/svg/javascript.svg' },
  { name: 'Vite', icon: '/svg/vite.svg' },
  { name: 'Git', icon: '/svg/git.svg' },
];

export const mainTechnologies = [
  { name: 'JavaScript', icon: '/svg/javascript.svg', level: 'Expert' },
  { name: 'Tailwind CSS', icon: '/svg/tailwind.svg', level: 'Expert' },
  { name: 'React', icon: '/svg/react.svg', level: 'Mid' },
  { name: 'Git', icon: '/svg/git.svg', level: 'Mid' },
  { name: 'Vite', icon: '/svg/vite.svg', level: 'Mid' },
  { name: 'Next.js', icon: '/svg/nextjs.svg', level: 'Junior' },
];

export const aboutQuestions = [
  {
    question: 'What can I build?',
    answer:
      'Fast, well-designed applications with a clean codebase. I lean on modern JavaScript techniques so everything runs smoothly and efficiently. From sleek UI/UX to pixel-perfect precision, every detail matters.',
  },
  {
    question: 'What excites me about coding?',
    answer:
      'The power of creating something from nothing. Spending hours debugging can be frustrating, but that moment when I finally solve the issue? Pure happiness. Looking at my projects, I feel proud of what I’ve built: the UI, the UX, the complex logic and everything in between.',
  },
  {
    question: 'What inspires my work?',
    answer:
      'Honestly, almost everything about web development (except TypeScript). From beautifully designed UI/UX to the thrill of finally fixing a bug after hours, it’s all part of the adventure. Discovering web development in 2023 has been the best journey of my life: from my first lines of HTML and CSS to Tailwind CSS, React and Next.js, and of course my dear love, JavaScript. Now here I am, building real projects. Such an incredible ride!',
  },
  {
    question: 'How do I approach challenges?',
    answer:
      'I take a step back to analyse and visualise the situation, reasoning through the problem to uncover what’s really going on, like a true detective. Once I have a solid foundation, the real work begins: coding, debugging and researching until I reach the outcome I want. If I ever fail (which, of course, has never happened), I restart the process like an infinite while loop until the problem is solved.',
  },
  {
    question: 'What technologies do I love?',
    answer:
      'My beloved JavaScript and its endless ecosystem. How can anyone live without JS? From fascinating frameworks like Vue and Next.js to both front-end and back-end development, it’s everywhere. Not to mention React, my go-to library for every project, with its components, hooks and the whole ecosystem.',
  },
];
