const GITHUB_USER = 'betterCallHex';

export const profile = {
  name: 'Yunes Maghsoudie',
  firstName: 'Yunes',
  role: 'Full-stack engineer',
  studio: { name: 'Hooman Studio', url: 'https://github.com/Hoooman-Studio' },
  mergedPullRequests: '1,000+',
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
];

export const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'TanStack',
  'Convex',
  'Medusa',
  'Sanity',
  'Postgres',
  'Expo',
  'Electron',
  'Tailwind',
  'Stripe',
  'Vercel',
  'Rust',
  'Go',
];

export const studioProducts = [
  {
    title: 'Studio dashboard',
    description:
      'The dashboard our team and clients run projects in: tasks, task flows, discussions, voice messages, a decision record for each client, and an MCP server that coding agents use to read and update work.',
  },
  {
    title: 'E-commerce platform',
    description:
      'Storefront, admin, Stripe checkout, DHL shipping and returns, affiliates and B2B retailer accounts, on Medusa and Next.js.',
  },
  {
    title: 'Bilingual rental marketplace',
    description:
      'Discovery, saved homes, messaging, listing import and invoicing, on Convex, Sanity and Next.js.',
  },
  {
    title: 'Hiring platform',
    description:
      'Dashboards for students and companies, on Postgres and Next.js.',
  },
  {
    title: 'Desktop task app',
    description: 'Electron, Convex and auto-updating installers.',
  },
  {
    title: 'Agent skills',
    description:
      'The skills my coding agents run on: commit gates, review loops, and a client decision record checked by rules in Rust instead of model calls.',
  },
  {
    title: 'Marketing sites',
    description: 'i18n, analytics and lead forms for several clients.',
  },
];

export const principles = [
  {
    title: 'Say the outcome',
    statement:
      'An issue or a pull request is titled with what changes for the user, so done is obvious before a line moves.',
    instead: 'Fix compare page',
    preferred: 'Compare homes shows an empty page while the comparison loads',
  },
  {
    title: 'Delete first',
    statement:
      'Code, tests and docs earn their place. What catches no defect and says nothing the code doesn’t, goes.',
    instead: 'Keep it, just in case',
    preferred:
      'Drop rule tests that catch no defect and cut docs to what code doesn’t hold',
  },
  {
    title: 'Borrow before building',
    statement:
      'I reach for a package that’s already installed before writing my own.',
    instead: 'lib/validate-email.ts  +48 lines',
    preferred:
      'refactor: replace hand-written code with packages already installed',
  },
  {
    title: 'Names over comments',
    statement:
      'Nothing fails when a comment lies. If a line needs one, it needs a better name.',
    instead: 'if (status === 5) // sent',
    preferred: 'if (status === MESSAGE_SENT)',
  },
  {
    title: 'Sweat the pixel',
    statement:
      'Alignment, colour contrast and motion on the compositor are part of the feature, not polish for later.',
    instead: 'Looks fine on my screen',
    preferred:
      'Header and background grid lines land on the same pixels; logo has no seam',
  },
  {
    title: 'Green, then done',
    statement:
      'A fix starts with a test that fails on the bug, and nothing ships until every check passes and I’ve walked it in the running app.',
    instead: 'Works on my machine',
    preferred: 'Bring Biome to zero warnings in both apps',
  },
];
