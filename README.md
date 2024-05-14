# FitPlot

## Stack

- [Next.js](https://vercel.com/solutions/nextjs) fullstack web client
- Built using [shadcn/ui](https://ui.shadcn.com/) components styled with [TailwindCSS](https://tailwindcss.com/)
- [Fathom](https://usefathom.com/) ethical analytics
- [Tanstack Query](https://tanstack.com/query/)
- Shipped on [Fly.io](https://fly.io/)

## Contribution Guide

### Getting Started

#### Node Version

This project uses Votla instead of NVM for managing Node versions. Install Volta on your machine with the steps below.

Install Volta for your system according to the Volta documentation. See [Volta > Getting Started](https://docs.volta.sh/guide/getting-started)

#### Environment Variables

Make a copy of the `.env.example` file in the project root. Name your local copy `.env.local`. This file will not be checked in.

```
cp .env.example .env.local
```

#### Run the app

```
npm run dev
```

### Contribution Guides

#### Upgrading Node Version for the project

When upgrading the Node version for the project, the Node version should be pinned to the package with:

```
volta pin node@x.x.x
```

:warning: Additionally, the Node version should be updated in the root `Dockerfile`.

#### Adding Path Aliases

Path aliases allow us to be a tad more concise with imports:

```
import { Button } from `@components/ui/button`;
```

When configuring path aliases, configuration must be updated in:

- `jsconfig.json` such that IDEs like VS Code understand where to resolve paths
- `package.json` under the `"eslintConfig"` key such that eslint understands where to resovle paths
- `components.json` (if moving `@lib/` or `@components/`) such that [shadcn/ui](https://ui.shadcn.com/) understands where to add and manage components

#### Adding UI Components

The common component library is built up by shadcn/ui. These components live in `@/components/ui`.

New components can be found in the [shadcn/ui](https://ui.shadcn.com/) component gallery and added to the project [via the shadcn/ui CLI](https://ui.shadcn.com/docs/cli#add):

```
npx shadcn-ui@latest add
```

### Continuous Delivery

This application deploys via GitHub Actions for commits into `main`. Shipping a feature generally looks like:

- Branch
- Build a feature
- Open a pull request into `main`
- Complete the review loop with a squash-and-merge
- Watch your commit build and deploy on Fly.io via GitHub Actions
