# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rootin은 루틴/습관 트래킹 앱의 **프론트엔드 클라이언트**이다. React 19, TypeScript, Vite로 구축. Yarn 4 모노레포(`react-monorepo/projects/rootin`)에 위치.

- **Client (rootin):** `~/Development/react-monorepo/projects/rootin` ← 현재 프로젝트
- **Server (rootin-server):** `~/Development/rootin-server` (Express 5 + Prisma + PostgreSQL)

## Commands

```bash
# From monorepo root
yarn dev:rootin          # Start dev server
# From this directory
yarn dev                 # Start dev server (Vite)
yarn build               # Type-check + build (tsc -b && vite build)
yarn lint                # ESLint
yarn preview             # Preview production build
```

Monorepo setup requires: `corepack enable && yarn install` from root.

## Architecture: Feature-Sliced Design (FSD)

```
src/
├── app/          → App init, routing (createBrowserRouter), layouts
├── Pages/        → Route-level components (Auth, Routine, RoutineCreate, RoutineDetail)
├── widgets/      → Composite UI blocks (routine-list, task-ring, layout-header, etc.)
├── features/     → User actions (auth, routine-add/update/delete, task-add/toggle)
├── entities/     → Business domains (auth, routine, task) with api/, model/, lib/
├── shared/       → Reusable UI (Form/, Status/, Button, Card, PageHeader)
├── lib/          → Axios instance with JWT interceptor
├── constants/    → API endpoint definitions
└── assets/       → Fonts, images
```

**Import direction:** app → Pages → widgets → features → entities → shared/lib

Each feature/entity is self-contained with subdirectories: `Components/`, `api/`, `model/` (types, stores, hooks), `lib/` (validation). Barrel exports via `index.ts`.

## State Management

- **Zustand** for client state (auth store: user, isAuthenticated, JWT token in localStorage)
- **@tanstack/react-query** for server state (data fetching, caching, 5-min stale time)

## API Layer

- Axios instance at `src/lib/axios/` with request interceptor adding `Authorization: Bearer` from localStorage
- Base URL from env var `VITE_API_URL` (defaults to `http://localhost:3000`)
- Endpoints defined as constants in `src/constants/endpoints/`

## Auth Flow

Token in localStorage → axios interceptor attaches to requests → `BaseLayout` calls `useGetMe()` to validate → on failure, clears token and redirects to `/auth`.

## Key Conventions

- **Path alias:** `@/*` → `./src/*`
- **Components:** PascalCase files and folders (e.g., `AuthForm.tsx`, `Components/`)
- **Features/entities:** kebab-case folders (e.g., `routine-add/`, `task-toggle/`)
- **Hooks:** `use` prefix, camelCase (e.g., `useAuth.ts`, `useRoutineForm.ts`)
- **Validation:** per-entity/feature in `lib/validation.ts`
- **Styling:** Tailwind CSS 4.x with custom CSS variables (`--primary-color: #ea4c89`), dark mode via `.dark-theme` class
- **Formatting:** Prettier — single quotes, 2-space indent, trailing commas, 80 char width

## Domain Entities

- **User:** email, password, nickname
- **Routine:** id, title, description, duration_days, start_date, tasks[], daily_status[]
- **Task:** id, name, sort_order, isCompleted (belongs to a routine, toggled daily)
