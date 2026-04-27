/**
 * Code-based TanStack Router setup.
 *
 * Routes:
 *   /            → redirects to /sv
 *   /$lang/      → landing page (lang ∈ { sv, en }; anything else redirects to /sv)
 *
 * Future pages (map, timeline, quests, chat) become children of $lang.
 */
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { Landing } from '@/pages/Landing'
import type { Lang } from '@/lib/types'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/$lang', params: { lang: 'sv' } })
  },
})

const langRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '$lang',
  beforeLoad: ({ params }) => {
    if (params.lang !== 'sv' && params.lang !== 'en') {
      throw redirect({ to: '/$lang', params: { lang: 'sv' } })
    }
  },
  component: () => <Outlet />,
})

const langIndexRoute = createRoute({
  getParentRoute: () => langRoute,
  path: '/',
  component: Landing,
})

const routeTree = rootRoute.addChildren([
  indexRedirectRoute,
  langRoute.addChildren([langIndexRoute]),
])

// import.meta.env.BASE_URL reflects vite's `base`. Strip trailing slash for TanStack.
const basepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const router = createRouter({
  routeTree,
  basepath,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/** Convenience: extract the validated lang param from a route. */
export type RouteLang = Lang
