import { notFound } from '@tanstack/react-router';
import { z } from 'zod';
import { profile } from '@/lib/profile';

const GITHUB_API = 'https://api.github.com';
const PINNED_API = 'https://pinned.berrysauce.dev/get';
const FEATURED_COUNT = 4;

const repositorySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  homepage: z.string().nullable(),
  html_url: z.string(),
  topics: z.array(z.string()).default([]),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const pinnedSchema = z.array(z.object({ name: z.string() }));

export type Repository = z.infer<typeof repositorySchema>;

export class GitHubError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(
      status === 403 || status === 429
        ? 'GitHub is rate limiting requests right now. Try again in a few minutes.'
        : `GitHub responded with status ${status}.`,
    );
    this.status = status;
  }
}

export async function getShowcaseRepositories() {
  const repositories = z
    .array(repositorySchema)
    .parse(
      await requestGitHub(
        `/users/${profile.githubUser}/repos?per_page=100&sort=created`,
      ),
    );

  return repositories.filter(isShowcase);
}

export async function getFeaturedRepositories() {
  const [showcase, pinnedNames] = await Promise.all([
    getShowcaseRepositories(),
    getPinnedNames(),
  ]);

  const pinned = pinnedNames
    .map((name) => showcase.find((repository) => repository.name === name))
    .filter((repository) => repository !== undefined);
  const newest = showcase.filter((repository) => !pinned.includes(repository));

  return [...pinned, ...newest].slice(0, FEATURED_COUNT);
}

export async function getRepository(name: string) {
  try {
    return repositorySchema.parse(
      await requestGitHub(`/repos/${profile.githubUser}/${name}`),
    );
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) throw notFound();
    throw error;
  }
}

export async function getReadmeHtml(name: string) {
  const response = await fetch(
    `${GITHUB_API}/repos/${profile.githubUser}/${name}/readme`,
    { headers: { Accept: 'application/vnd.github.html+json' } },
  );

  if (response.status === 404) return null;
  if (!response.ok) throw new GitHubError(response.status);

  return response.text();
}

async function requestGitHub(path: string): Promise<unknown> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) throw new GitHubError(response.status);

  return response.json();
}

async function getPinnedNames() {
  try {
    const response = await fetch(`${PINNED_API}/${profile.githubUser}`);
    if (!response.ok) return [];

    return pinnedSchema.parse(await response.json()).map(({ name }) => name);
  } catch {
    return [];
  }
}

function isShowcase(repository: Repository) {
  return Boolean(repository.homepage && repository.description);
}

export function displayName(repositoryName: string) {
  return repositoryName.replaceAll(/[-_]/g, ' ');
}
