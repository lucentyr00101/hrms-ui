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

### Modal Development

- When using `UModal`, always use `v-model:open` instead of just `v-model`
- Place modal content inside the `#content` slot template:
  ```vue
  <UModal v-model:open="isOpen">
    <template #content>
      <!-- Modal content here -->
    </template>
  </UModal>
  ```

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

### TypeScript & Type Safety

#### Nuxt UI Color Prop Pattern

Nuxt UI components (UButton, UBadge, UAlert, Toast, etc.) accept **ONLY** these semantic color values:

```typescript
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
```

**✅ CORRECT Usage:**
```vue
<UButton color="success">Save</UButton>
<UBadge color="error">Failed</UBadge>
<UAlert color="warning">Warning message</UAlert>

toast.add({
  title: 'Success',
  color: 'success'
})
```

**❌ INCORRECT Usage (will cause TypeScript errors):**
```vue
<!-- DO NOT USE: -->
<UButton color="green">Save</UButton>     <!-- Use 'success' instead -->
<UBadge color="red">Failed</UBadge>       <!-- Use 'error' instead -->
<UAlert color="blue">Info</UAlert>        <!-- Use 'info' instead -->
<UButton color="gray">Cancel</UButton>    <!-- Use 'neutral' instead -->
<UBadge color="yellow">Warning</UBadge>   <!-- Use 'warning' instead -->
<UBadge color="amber">Alert</UBadge>      <!-- Use 'warning' instead -->
```

**Color Mapping Reference:**
- `green` → `success`
- `red` → `error`
- `blue` → `info`
- `yellow` / `amber` / `orange` → `warning`
- `gray` / `grey` → `neutral`
- `purple` → `primary` (for accents)

#### Color Helper Functions

When creating functions that return colors for Nuxt UI components, **always specify the return type**:

```typescript
// ✅ CORRECT: Explicit return type
const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  switch (status) {
    case 'active': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'error';
    default: return 'neutral';
  }
};

// ✅ CORRECT: Using Record type with explicit color union
const getStageColor = (stage: Stage): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const colors: Record<Stage, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    applied: 'primary',
    screening: 'info',
    technical: 'warning',
    final: 'secondary',
    offer: 'success',
    hired: 'success',
    rejected: 'error'
  };
  return colors[stage] || 'neutral';
};

// ❌ INCORRECT: No return type, using invalid colors
const getBadgeColor = (status: string) => {
  if (status === 'active') return 'green';  // TypeScript error!
  return 'gray';  // TypeScript error!
};
```

#### Type Export Patterns

When re-exporting types that might conflict with constants, use explicit exports:

```typescript
// ✅ CORRECT: Explicit type-only exports to avoid naming conflicts
export type { 
  InterviewSlot, 
  InterviewType,
  InterviewSlotStatus  // Renamed to avoid conflict with constant InterviewStatus
} from './interview';

export type { 
  LeaveTypeConfig,  // Renamed to avoid conflict with constant LeaveType
  LeaveSummary
} from './leave';

// Then export constants separately
export * from './constants';
```

#### Common TypeScript Fixes

1. **Avoid `undefined` in required fields**: Use non-null assertion or optional chaining
   ```typescript
   // ✅ CORRECT
   const nextStage = stages[currentIndex + 1]!;
   const firstLeave = day.leaves[0];
   if (firstLeave) viewDetails(firstLeave);
   
   // ❌ INCORRECT
   const nextStage = stages[currentIndex + 1];  // May be undefined
   viewDetails(day.leaves[0]);  // May be undefined
   ```

2. **Type function parameters properly**:
   ```typescript
   // ✅ CORRECT
   const filter = (items: Item[]) => items.filter((item: Item) => item.active);
   
   // ❌ INCORRECT
   const filter = (items) => items.filter(item => item.active);  // Implicit any
   ```

3. **Use proper UI prop types**: Don't try to customize UI props that aren't exposed
   ```typescript
   // ✅ CORRECT
   <UInput v-model="email" size="lg" />
   
   // ❌ INCORRECT - 'rounded' is not a valid UInput prop
   <UInput v-model="email" :ui="{ rounded: 'rounded-xl' }" />
   ```

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
