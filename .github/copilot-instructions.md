# Copilot Instructions for HRMS UI

This repository contains a Human Resources Management System (HRMS) user interface built with modern web technologies. These instructions will help GitHub Copilot provide better assistance when working on this codebase.

## Tech Stack & Requirements

### Package Manager

- **Always use `bun`** as the package manager for all operations
- Use `bun install` for installing dependencies
- Use `bun run <script>` for running scripts
- Use `bun add <package>` for adding new dependencies
- Use `bun remove <package>` for removing dependencies

### Frontend Framework

- **Nuxt.js 4.x** - Vue.js meta-framework
- **Vue 3** with Composition API
- **TypeScript** for type safety

### UI Framework

- **Nuxt UI 4.x** - Primary UI component library
- Strictly implement Nuxt UI components for every UI surface
- Only author custom components when Nuxt UI cannot satisfy the requirement
- Follow Nuxt UI patterns and conventions
- Utilize the configured theme colors (primary, dark, black)

### Styling

- **TailwindCSS** for utility-first styling
- Custom CSS variables defined in `app/assets/css/main.css`
- Color scheme: Light mode preferred with dark mode support
- Primary color: Purple (#9b59b6)

## Project Structure

```
app/
├── assets/css/main.css      # Global styles and theme variables
├── components/              # Vue components
├── constants/               # Application constants
├── layouts/                 # Nuxt layouts (default, auth)
├── pages/                   # File-based routing pages
└── app.config.ts           # App configuration including UI theme
```

## Development Guidelines

### Component Development

- Use Vue 3 Composition API (`<script setup>`)
- Lean on Nuxt UI building blocks before creating anything custom
- Follow the existing component patterns in the codebase
- Use TypeScript for all new components and composables
- Keep logic colocated with the smallest owning component and lift shared logic into composables
- Ensure components expose clear prop contracts and emit events with typed payloads
- Always refer to https://ui.nuxt.com/docs/components for component usage and props and for available components

### Form Development

- Use Nuxt UI form primitives (`UForm`, `UFormGroup`, `UInput`, etc.) as the default building blocks
- Wire validation through `yup` schemas defined under `app/schemas`
- Reuse existing schema definitions; author new schemas alongside related modules when necessary
- Keep form state reactive and centralized; prefer refs over on-the-fly mutations
- Derive submit-side effects from composables to keep components declarative

### Styling Guidelines

- Use TailwindCSS utility classes
- Leverage the custom color variables defined in the theme
- Follow the existing color scheme and spacing patterns
- Use Nuxt UI's design tokens when available

### Navigation & Routing

- File-based routing with Nuxt pages
- Navigation items are defined in `app/constants/side-nav.ts`
- Use the existing layout system (default layout with side navigation)
- Icons use Material Symbols format: `i-material-symbols:icon-name`

### State Management

- Use Vue 3 reactivity primitives for local state
- Consider Nuxt's built-in state management for global state
- Use TypeScript interfaces for data structures

## Domain Context

This is an HRMS (Human Resources Management System) application with the following main areas:

- **Dashboard** - Overview and analytics
- **Employees** - Employee management and records
- **Interviews** - Interview scheduling and management

### Existing Features

- Side navigation with Material Symbols icons
- Responsive layout system
- Authentication layout for login/signup flows
- Custom purple-themed design
- Employee and interview management modules

## Code Quality

### Linting & Formatting

- ESLint configuration is set up with Nuxt's recommended rules
- Use `bun run lint` if linting scripts are added
- Follow TypeScript strict mode guidelines

### Best Practices

- Keep components focused and reusable
- Use meaningful variable and function names
- Write self-documenting code with proper TypeScript types
- Follow Vue 3 and Nuxt.js best practices
- Utilize Nuxt UI's accessibility features
- Eliminate duplication aggressively; extract shared layouts, composables, and helper utilities
- Guard asynchronous flows and handle loading, success, and error states explicitly
- Validate edge cases (empty datasets, long-running requests, permissions) before shipping features
- Always refer to Nuxt UI v4 documentation for component usage and props (https://ui.nuxt.com/docs/components)
- Always fix typescript and linting errors after adding new code

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run generate` - Generate static site

## Dependencies

Key dependencies to be aware of:

- `@nuxt/ui` - UI component library
- `@nuxt/image` - Optimized image handling
- `@nuxt/eslint` - ESLint integration
- `yup` - Schema validation library

When suggesting new dependencies, consider if the functionality already exists in Nuxt UI or can be implemented with existing tools.
