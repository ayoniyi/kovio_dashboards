## Kovio – Next.js Frontend

Kovio is a Next.js 14 (App Router) frontend for an events marketplace. It implements public marketing pages, authenticated customer and vendor dashboards, and an admin area. The app uses NextAuth for authentication, React Query for data fetching/caching, Tailwind CSS + shadcn UI for styling, and Axios for API access.

### Quick Start

```bash
npm install
npm run dev
# visit http://localhost:3000
```

Set required environment variables first (see Environment Variables).

---

## Table of Contents

- Overview
- Tech Stack
- Project Structure
- App Providers & Global Layout
- Authentication & Authorization
- Data Layer (API client, React Query, custom hooks)
- Styling & UI
- Environment Variables
- Scripts
- Development Setup
- Routing & Protected Areas
- Conventions & Patterns
- Deployment Notes
- Troubleshooting

---

## Overview

- Public routes under `app/(public)` provide marketing pages (home, vendors, venues, blogs, etc.).
- Auth routes under `app/(auth)` implement login, signup, password reset, and verification.
- Authenticated dashboards exist under `app/(dashboard)` for `customer` and `vendor` roles.
- Admin area under `app/(admin)` includes users, vendors, bookings, transactions, and settings.
- `NextAuth` manages sessions including credentials, Google, and Facebook providers.
- `middleware.ts` protects dashboard/onboarding/admin routes by enforcing authentication.

---

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript 5
- React: React 18
- Auth: NextAuth v4 (Credentials, Google, Facebook)
- Data: Axios + @tanstack/react-query v5 (+ Devtools)
- Forms & Validation: react-hook-form + @hookform/resolvers + zod
- UI & Styling: Tailwind CSS, shadcn/ui components, Radix UI primitives, lucide-react icons
- Images: next/image (configured for `localhost`, unoptimized for dev)

Key configs: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`.

---

## Project Structure

High-level layout (folders with many files abbreviated):

- `app/`
  - `(public)/` – public marketing pages (home, blogs, vendors, venues, terms, privacy)
  - `(auth)/` – login, signup, reset-password, email verification, account type
  - `(dashboard)/` – vendor and customer dashboards (bookings, messages, settings, support)
  - `(admin)/` – admin portal (users, vendors, bookings, transactions, settings, support)
  - `api/auth/[...nextauth]/route.ts` – NextAuth route using `utilities/authoptions.ts`
  - `layout.tsx` – global providers and fonts
- `components/`
  - `NextAuthProvider/` – wraps `SessionProvider`
  - `QueryProvider/` – sets up React Query and Devtools
  - `ui/shadcn/` and `ui/custom/` – UI components
  - domain-specific components for dashboards and admin
- `context/` – `OnboardingContext.tsx` (onboarding flow), `allcontext.tsx` (global UI state)
- `hooks/` – `useFetch.ts` (React Query wrapper), `useMutateData.ts` (mutations wrapper)
- `utilities/` – `apiclient.ts` (Axios instance + interceptors), `authoptions.ts` (NextAuth config), `formatters.ts`
- `types/` – type augmentation (e.g., NextAuth) and user types
- `public/` – static assets and images

---

## App Providers & Global Layout

Global app composition is in `app/layout.tsx`:

- Fonts: `Gabarito`, `Inter_Tight` via `next/font/google`.
- Providers:
  - `ReactQueryProvider` – creates a `QueryClient`, enables Devtools in dev.
  - `ContextProvider` – lightweight UI state (sidebar/menu/modal, activeTab).
  - `NextAuthProvider` – `SessionProvider` with disabled refetch intervals for stability.
  - `Toaster` – shadcn toast notifications.

This ensures React Query, session state, and UI context are available across all routes.

---

## Authentication & Authorization

Auth configuration lives in `utilities/authoptions.ts` and is mounted at `app/api/auth/[...nextauth]/route.ts`.

- Providers:
  - Credentials: POSTs to `${NEXT_PUBLIC_API_BASE_URL}/user-service/onboarding/login-account`.
  - Google & Facebook: OAuth via provider client IDs/secrets.
- Sessions: JWT strategy; custom user fields are attached to the token and session.
- Pages: Custom sign-in page at `/login`.

Middleware (`middleware.ts`) enforces authentication for:

```ts
matcher: [
  "/vendor/:path*",
  "/customer/:path*",
  "/onboarding/:path*",
  "/admin:path*",
];
```

Unauthenticated users are redirected to `/login`.

---

## Data Layer

### Axios Client

`utilities/apiclient.ts` provides a configured Axios instance:

- `baseURL` from `NEXT_PUBLIC_API_BASE_URL`.
- Request interceptor injects `Authorization: Bearer <session.user.auth>` if available via `getSession()`.
- Exposes typed helpers: `get<T>`, `post<T>`, `put<T>`, `patch<T>`, `del<T>` with consistent error handling.

### React Query

- Global `QueryClient` in `components/QueryProvider`.
- `hooks/useFetch.ts` wraps `useQuery` with sensible defaults (refetch behavior, retry, gcTime).
- `hooks/useMutateData.ts` standardizes mutations with loading state and method switching.

Usage pattern:

```tsx
// Query
const { data, isLoading, error } = useFetch<MyType>({
  key: ["resource", id],
  url: "/resource",
});

// Mutation
const { mutate, isLoading } = useMutateData<MyResponse>({
  method: "POST",
  url: "/resource",
  onSuccess,
});
```

---

## Styling & UI

- Tailwind CSS configured in `tailwind.config.ts` with custom Kovio color palette and typography.
- shadcn/ui components and Radix primitives used for accessible UI patterns.
- `lucide-react` for icons.
- Fonts: `Inter Tight` and `Gabarito` applied at root.

---

## Environment Variables

Create a `.env.local` with the following (example keys shown; fill values):

```bash
NEXT_PUBLIC_API_BASE_URL= http://localhost:8080           # Backend base URL used by Axios

# NextAuth
NEXTAUTH_URL= http://localhost:3000
NEXTAUTH_SECRET= your-32-char-random-string

# OAuth Providers (optional if not using)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` must be reachable from the browser.
- `NEXTAUTH_SECRET` is required for JWT signing; generate a secure value.

---

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server (after build)
npm run lint    # Lint using Next.js ESLint config
```

---

## Development Setup

1. Install dependencies: `npm install`
2. Configure `.env.local` (see Environment Variables)
3. Run: `npm run dev`
4. Open `http://localhost:3000`

Recommended extensions/tools:

- React Query Devtools (already integrated)
- VS Code + ESLint + Tailwind CSS IntelliSense

---

## Routing & Protected Areas

The app uses the Next.js App Router. Key route groups:

- `app/(public)` – public routes
- `app/(auth)` – auth-related routes
- `app/(dashboard)/vendor` and `app/(dashboard)/customer` – authenticated dashboards
- `app/(admin)` – admin portal

`middleware.ts` protects dashboard, onboarding, and admin paths. Additions to protected areas should be reflected in the `matcher` array.

---

## Conventions & Patterns

- API calls must go through `utilities/apiclient.ts` to ensure auth headers and consistent error handling.
- Prefer `useFetch` and `useMutateData` hooks for React Query integration.
- Keep UI state in `context/allcontext.tsx`; keep business state in server or component state.
- Use `zod` with `react-hook-form` for schema-validated forms.
- Shadcn components go under `components/ui/shadcn`; custom UI under `components/ui/custom`.

---

## Deployment Notes

- Ensure all environment variables are set in your hosting platform (Vercel, Render, etc.).
- `next.config.mjs` enables SWC minify, strict mode, and limited image domains (`localhost`). Configure `images.domains` for your production asset hosts.
- `images.unoptimized: true` is currently set; consider enabling optimization in production.

---

## Troubleshooting

- Missing token on API calls: ensure login succeeded and `session.user.auth` is present; check `NEXT_PUBLIC_API_BASE_URL` and backend CORS.
- Infinite redirects to `/login`: verify `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and that the session cookie is set. Confirm `middleware.ts` matcher isn’t overbroad.
- OAuth login issues: verify Google/Facebook credentials and authorized redirect URIs.
- Type errors during build: run `npm run lint` and check TypeScript strict mode expectations in `tsconfig.json`.

---

## License

Proprietary – internal use only unless otherwise specified by the project owner.
