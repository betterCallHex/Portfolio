# Portfolio

Personal portfolio of Yunes Maghsoudie: an editorial, minimal single-page site that reads top-down: who I am, what I've shipped, how I work, and how to reach me. An archive of open-source repos is pulled live from GitHub.

## Stack

- **React 19** with the **React Compiler**
- **TanStack Router** (file-based routes, loaders with deferred data)
- **TypeScript 7**
- **Tailwind CSS v4** with **shadcn/ui** components built on **Base UI**
- **Motion** for animation
- **three.js** with **React Three Fiber** for the hero scene, loaded lazily
- **Vite 8** and **Bun**
- **Biome** for linting and formatting
- **Vercel Functions** (`api/`) for the contact and newsletter endpoints

## Getting started

```sh
bun install
bun dev
```

The dev server serves the `api/` functions too, so the forms work locally.

## Environment variables

| Name                  | Used by                        | Purpose                                        |
| --------------------- | ------------------------------ | ---------------------------------------------- |
| `DISCORD_WEBHOOK_URL` | `api/contact`, `api/subscribe` | Discord webhook that receives form submissions |

Put it in `.env.local` for local development and in the Vercel project settings for production.

## Scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `bun dev`       | Start the dev server                 |
| `bun run build` | Type-check and build for production  |
| `bun preview`   | Preview the production build         |
| `bun typecheck` | Type-check only                      |
| `bun lint`      | Lint and check formatting with Biome |
| `bun format`    | Apply Biome fixes and formatting     |

## Project layout

```
api/              Vercel Functions (contact, subscribe)
server/           Server helpers shared by the functions, plus the dev-server entry
src/routes/       TanStack Router file routes
src/components/   Page sections, layout and shadcn/ui components
src/lib/          Profile content, GitHub data, form schemas
public/           Static assets (avatar, CV, icons)
```

Profile copy, social links, the stack, shipped products and working principles live in `src/lib/profile.ts`. The 3D hero lives in `src/components/scene/`.
