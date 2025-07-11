# **StudyDock Development Guidelines**

Version: 1.0.0
Last Updated: 28 June 2025

This document outlines the development standards for StudyDock projects, with special consideration for Ghana-specific requirements: mobile-first design, offline functionality, and simplified user interfaces.

## Quick Reference

- **Network Performance Targets**:
  - First Contentful Paint (FCP): < 2s on 3G
  - Time to Interactive (TTI): < 5s on 3G
  - Bundle Size: < 300KB (initial load)
- **Touch Targets**: Minimum 48×48px
- **Offline Support**: Required for all critical features
- **Error Messages**: Must be in simple English, with clear recovery steps


## Quick Start

- Clone repository and run `npm install`
- Start development server with `npm run dev`
- Build for production with `npm run build`
- Test your Ghana-specific optimizations with Chrome DevTools network throttling preset "Slow 3G"

## Development Workflow Guidelines

- Always initiate development with the front-end components before working on the back-end.
- Prioritize creating user interfaces and client-side logic first.
- Ensure front-end features are fully implemented and tested before proceeding to back-end development.

## Github Co-pilot Mentorship Role

You are the StudyDock senior Software Engineer/Developer mentoring a junior developer (me -> Edward). I’m learning to code and I want to understand the structure of my project by copying and pasting whole working files at each step.

1. My goal is to learn slowly, step by step. Here’s how I want us to work:
2. Guide me one file at a time. For every step:
    - Tell me clearly which file to edit.
    - Show me the entire updated version of the file, not just code snippets or lines to insert.
    - Include code comments to explain what each section does.
    - Make sure each file you give me can be copy-pasted wholesale and will still work. When editing existing code, use comments to clearly mark the changes you made ( <!-- ===== [New Feature] START ===== -->)
3. Avoid rushing. Think of this like a teaching session. Only move to the next file after you’ve fully explained the current one and confirmed that it works.
4. Write the code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
5. Do you understand?

## Installation Guidelines
always install npm install -D tailwindcss@3.4.1 postcss@8.4.35 autoprefixer@10.4.17 @tailwindcss/forms@0.5.7

## Table of Contents

1. [Development Workflow]
2. [Ghana-Specific Considerations]
3. [Code Documentation Guidelines]
4. [Code Writing Standards]
5. [TypeScript Best Practices]
6. [Vue 3 Best Practices]
7. [Tailwind CSS Best Practices]
8. [Vite Best Practices]
9. [Offline First Strategy]
10. [WhatsApp Integration]
11. [Optimized Asset Loading]
12. [Regional Integration]
13. [Performance Benchmarks]
14. [Testing Guidelines]
15. [SEO Best Practices]
16. [Integration Tips]
17. [Communication Guidelines]

## Development Workflow

1. **Design-First Approach** _(Required)_

   - Begin with UI/UX design before implementing functionality
   - Get stakeholder approval on design mockups before proceeding to implementation
   - Focus on mobile designs first (primary use case for Ghanaian users)

2. **Frontend Implementation** _(Required)_

   - Build UI components with mock/static data
   - Ensure responsive design with mobile as the primary target
   - Test on actual mobile devices (Android preferred)

3. **Backend Integration** _(Required)_
   - Implement API calls and business logic after UI approval
   - Ensure offline fallbacks for critical functionality
   - Optimize for low bandwidth and intermittent connectivity

## Implementation Checklists

Use these checklists to ensure compliance with Ghana-specific requirements at each development stage.

### Feature Planning Checklist

- [ ] Identified primary user needs for Ghanaian context
- [ ] Prioritized essential features for low-bandwidth scenarios
- [ ] Considered offline functionality requirements
- [ ] Included error states for connectivity issues
- [ ] Planned for data synchronization after reconnection

### UX/UI Design Checklist

- [ ] Created mobile designs before desktop (mobile-first approach)
- [ ] Used adequate touch target sizes (minimum 48×48px)
- [ ] Simplified UI for essential tasks (3 steps or fewer)
- [ ] Provided clear visual feedback for all actions
- [ ] Designed offline states for all key interfaces
- [ ] Used connectivity-appropriate imagery (optimized file sizes)
- [ ] Tested color contrast for outdoor visibility (common in Ghana)

### Development Checklist

- [ ] Implemented offline-first data architecture
- [ ] Set up client-side data caching
- [ ] Added graceful connectivity transitions
- [ ] Minimized initial bundle size (<300KB total)
- [ ] Implemented lazy loading for non-critical resources
- [ ] Added appropriate loading states
- [ ] Created fallbacks for unavailable API endpoints
- [ ] Tested on low-end devices (or throttled environments)

### Definition of Done

A feature is considered complete when:

1. It works in offline mode with appropriate fallbacks
2. It syncs data correctly when connectivity is restored
3. It loads within performance benchmarks on 3G connections
4. It renders correctly on various Android devices (6.0+)
5. It has appropriate error states for connectivity failures
6. All text is clear, concise, and appropriate for varying digital literacy levels
7. It passes automated tests including offline scenarios

## Ghana-Specific Considerations

- **Mobile-First**: Target Android mobile devices as primary platform (Android 6.0+)
- **Offline Support**: Many users have intermittent connectivity
- **Performance**: Optimize for low-bandwidth conditions (2G/3G networks common)
- **Simplicity**: Design for users with varying levels of digital literacy
- **WhatsApp Integration**: Include sharing capabilities where relevant
- **Touch-Optimized**: Design large touch targets (minimum 48x48px)

## TypeScript Best Practices _(Required)_

TypeScript provides strong typing and enhanced developer experience, which is particularly valuable when building complex applications for Ghanaian users where reliability is crucial due to connectivity challenges.

## StudyDock Tailwind Usage Instruction

Always use Tailwind CSS utility classes directly in the template markup for component styling. Do not use `@apply` inside `<style>` blocks in Vue files. For most cases, prefer utility classes in the HTML/template for clarity, maintainability, and mobile-first workflow.

## Routing & Layout System

This project uses Vue Router with a layout system. All main routes are defined in index.ts and rendered as children of a layout component (e.g., default.vue). Each layout must include a `<router-view />` to display the active page from views. Use this structure for all new pages and navigation.


## StudyDock App Header  Guideline

For every new app, always use the following header pattern:

- **Left:** StudyDock logo (SVG or image)
- **Right:** App name (text, bold, clear, and accessible)

**Example Vue/Tailwind Markup:**

```vue
<template>
  <header class="flex items-center justify-between px-4 py-3 bg-primary text-white shadow-md">
    <!-- StudyDock Logo on the left -->
              <StudyDockLogo white />
    <!-- App Name on the right -->
    <span class="text-lg font-bold tracking-wide">{{ appName }}</span>
  </header>
</template>

<script setup lang="ts">
// ===== Constants & Config =====
const appName = 'Ghana Weather App' // Change this per app
import StudyDockLogo from '@/components/base/StudyDockLogo.vue'
</script>
```

**Guidelines:**
- The logo should always be on the left, sized for mobile (min 32px, max 48px height).
- The app name should be on the right, bold, and easy to read.
- Use Tailwind utility classes for spacing, color, and responsiveness.
- Ensure header is accessible (alt text, sufficient contrast).


# Coding Protocol

## Core Principles

- **Minimal Code**: Write only the absolute minimum code required to accomplish the task
- **Focused Changes**: Make precise edits related only to the current task
- **No Scope Creep**: Avoid unrelated changes or sweeping modifications
- **Code Quality**:
  - Make code modular and testable
  - Keep functions small and focused
  - Use clear naming conventions
  - Add necessary comments
- **Preserve Functionality**: Don't break existing working code
- **Clear Instructions**: Explicitly state any required:
  - Configuration steps
  - Environment setup
  - Dependencies
  - External service setup (e.g. Supabase, Vercel, Firebase, AWS)

## Implementation Guide

```typescript
// Example of minimal, focused change
function updateUser(id: string, data: Partial<User>): Promise<void> {
  // Only update specified fields
  return db.users.update(id, data)
}

// NOT THIS - too broad, unrelated changes
function updateUser(id: string, data: User): Promise<void> {
  // Unrelated logging change
  setupLogging()
  // Unrelated schema changes  
  validateSchema()
  // Too many responsibilities
  return db.users.update(id, {
    ...data,
    updatedAt: new Date(),
    // Unrelated field additions
    newField: 'value'
  })
}
```

## Change Request Format

```markdown
Task: [Brief description]
Changes:
- File: path/to/file
- Purpose: [What this change accomplishes]
- Dependencies: [Any required setup/config]
```



### 1. **Strict TypeScript Configuration**

Use strict mode in `tsconfig.json` to catch potential issues early:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true
  }
}
```

### 2. **Type-First Development**

Always define types before implementing functionality:

```typescript
// First define your types
interface UserData {
  id: string
  name: string
  phoneNumber: string // Required for Ghana mobile-first approach
  email?: string // Optional as not all users have email
  region: string
  offlineAccess: boolean
}

// Then implement your functions with proper typing
function syncUserData(user: UserData): Promise<void> {
  // Implementation follows type definition
}
```

### 3. **Network-Aware Type Definitions**

Create types that account for offline/online states:

```typescript
type ConnectionState = 'online' | 'offline' | 'poor-connection'
type SyncStatus = 'pending' | 'synced' | 'failed'

interface NetworkAwareData<T> {
  data: T
  lastSynced: number
  connectionState: ConnectionState
  syncStatus: SyncStatus
  pendingChanges: boolean
}
```

### 4. **Error Handling Types**

Define comprehensive error types for better error handling:

```typescript
interface AppError extends Error {
  code: string
  isOfflineError?: boolean
  retryable?: boolean
  userMessage: string // Localized message for users
}

// Custom error for network issues
class NetworkError extends Error implements AppError {
  code: string
  isOfflineError: boolean
  userMessage: string

  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
    this.code = 'NETWORK_ERROR'
    this.isOfflineError = true
    this.userMessage = "Connection failed. Your changes will sync when you're back online."
  }
}
```

### 5. **Vue Component Types**

Use proper typing for Vue components:

```typescript
import { PropType, defineComponent } from 'vue'

// Define prop interfaces
interface UserProps {
  name: string
  role: 'admin' | 'user'
  lastActive: Date
}

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    },
    isOffline: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // TypeScript knows the types of props
    const userDisplayName = computed(() => props.user.name.toUpperCase())
    return { userDisplayName }
  }
})
```

### 6. **Type Utils for Common Patterns**

Create utility types for common patterns:

```typescript
// Make specific properties optional
type PartialNetworkData<T> = Omit<T, 'id'> & { id?: string }

// Ensure all properties can handle offline state
type OfflineAware<T> = {
  [P in keyof T]: {
    value: T[P]
    synced: boolean
    lastModified: number
  }
}

// Type guard for network state
function isOnline(state: ConnectionState): state is 'online' {
  return state === 'online'
}
```

## Vue 3 Best Practices _(Required)_

When developing with Vue 3, follow these best practices to ensure optimal performance and maintainability, especially for Ghanaian users with varying network conditions.

### 1. **Composition API and TypeScript**

Use the Composition API with TypeScript for better type safety and code organization:

```vue
<script setup lang="ts">
// Define props with types
interface Props {
  userName: string
  isOffline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOffline: false
})

// Type-safe emits
const emit = defineEmits<{
  (e: 'sync'): void
  (e: 'error', error: Error): void
}>()

// Reactive state with types
const networkStatus = ref<'online' | 'offline'>('online')
const syncStatus = ref<'pending' | 'complete'>('complete')

// Computed properties
const statusMessage = computed(() =>
  networkStatus.value === 'offline'
    ? 'Working offline - changes will sync when online'
    : 'Connected'
)

// Methods with proper typing
function handleSync() {
  if (networkStatus.value === 'online') {
    emit('sync')
  }
}
</script>
```


### 1.1 Copilot Code Generation Example for Minimal Vue Component

```vue
<!--
  DatePicker.vue
  Minimal, mobile-first date picker for income entry.
  - Uses native input for best mobile/offline UX.
  - All props have safe defaults (always string, never undefined).
  - Clear comments for learning.
-->

<template>
    <div class="flex flex-col gap-1">
        <!-- Label for accessibility -->
        <label :for="id || ''" class="text-sm font-medium text-gray-700">
            {{ label }}
        </label>
        <!-- Native date input for mobile/offline -->
        <input :id="id || ''" type="date" :value="modelValue" @input="onInput"
            class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-base bg-white shadow-sm"
            :max="maxDate || ''" :min="minDate || ''" :aria-label="label || ''" required />
        <!-- Show error if provided -->
        <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for DatePicker
 * - modelValue: string (YYYY-MM-DD)
 * - label: string (field label)
 * - error: string (optional error message)
 * - minDate, maxDate: string (YYYY-MM-DD, optional)
 * - id: string (for accessibility, always required)
 */
withDefaults(
    defineProps<{
        modelValue: string
        label?: string
        error?: string
        minDate?: string
        maxDate?: string
        id?: string
    }>(),
    {
        label: 'Date',
        error: '',
        minDate: '',
        maxDate: '',
        id: 'date-picker'
    }
)

// ===== Main Logic =====
/**
 * Emits the new date value to the parent component.
 */
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    emit('update:modelValue', value)
}
</script>

<!--
    All styling via Tailwind utility classes for maintainability and mobile-first workflow.
  -->

```




### 2. **Performance Optimizations**

Implement performance optimizations for low-bandwidth conditions:

```vue
<script setup lang="ts">
// Lazy load heavy components
const HeavyDataGrid = defineAsyncComponent(() => import('./HeavyDataGrid.vue'))

// Use v-show for frequently toggled content
const isLoading = ref(false)

// Implement virtual scrolling for long lists
const items = ref<Item[]>([])
const visibleItems = computed(() => items.value.slice(startIndex, endIndex))
</script>

<template>
  <!-- Use v-show for frequent toggles -->
  <loading-spinner v-show="isLoading" />

  <!-- Lazy load heavy components -->
  <Suspense>
    <template #default>
      <heavy-data-grid />
    </template>
    <template #fallback>
      <lightweight-placeholder />
    </template>
  </Suspense>
</template>
```

### 3. **Offline-First Components**

Design components with offline functionality in mind:

```vue
<script setup lang="ts">
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { useOfflineStorage } from '@/composables/useOfflineStorage'

const { isOnline, connectionQuality } = useNetworkStatus()
const { saveOffline, syncWhenOnline } = useOfflineStorage()

// Handle form submissions with offline support
async function handleSubmit(data: FormData) {
  try {
    if (isOnline.value) {
      await submitToServer(data)
    } else {
      await saveOffline(data)
      showToast('Saved offline. Will sync when connected.')
    }
  } catch (error) {
    handleError(error)
  }
}
</script>

<template>
  <div class="form-container">
    <offline-indicator v-if="!isOnline" />
    <form @submit.prevent="handleSubmit">
      <slot />
      <submit-button
        :disabled="!isOnline && !allowOffline"
        :text="isOnline ? 'Submit' : 'Save Offline'"
      />
    </form>
  </div>
</template>
```

### 4. **State Management**

Use composables for shared state and logic:

```typescript
// useNetworkAwareState.ts
export function useNetworkAwareState<T>(key: string, initialState: T) {
  const data = ref<T>(initialState)
  const isSyncing = ref(false)
  const lastSynced = ref<number | null>(null)

  onMounted(async () => {
    // Load from local storage first
    const cached = localStorage.getItem(key)
    if (cached) {
      data.value = JSON.parse(cached)
    }

    // Then sync with server if online
    if (navigator.onLine) {
      await syncWithServer()
    }
  })

  // Watch for online status changes
  useEventListener(window, 'online', () => {
    syncWithServer()
  })

  return {
    data,
    isSyncing,
    lastSynced,
    sync: syncWithServer
  }
}
```

### 5. **Error Boundaries**

Implement error boundaries for graceful failure handling:

```vue
<script setup lang="ts">
import { onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err
  // Log error to monitoring service
  logError(err)
  // Return false to prevent error propagation
  return false
})
</script>

<template>
  <div class="error-boundary">
    <template v-if="error">
      <offline-aware-error-display :error="error" @retry="handleRetry" />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
```

### 6. **Mobile-First Components**

Design components with mobile-first principles:

```vue
<script setup lang="ts">
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()

// Adapt behavior based on device
const touchTargetSize = computed(() => (isMobile.value ? 48 : 32))
</script>

<template>
  <div class="responsive-container">
    <!-- Mobile-first design -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <card
        v-for="item in items"
        :key="item.id"
        :class="[
          'p-4',
          'touch-target-[48px]', // Mobile-friendly touch targets
          'transition-transform',
          'active:scale-98' // Touch feedback
        ]"
      />
    </div>
  </div>
</template>
```

### 7. **Performance Monitoring**

Implement performance monitoring specific to Ghanaian users:

```typescript
// usePerformanceMonitoring.ts
export function usePerformanceMonitoring() {
  onMounted(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection

      // Monitor network quality
      connection.addEventListener('change', () => {
        logNetworkMetrics({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        })
      })
    }

    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      reportWebVitals((metric) => {
        if (metric.name === 'LCP' && metric.value > 2500) {
          // Alert if Load performance is poor
          notifyPoorPerformance(metric)
        }
      })
    }
  })
}
```

## Tailwind CSS Best Practices

Use **content scanning** to remove unused utilities in production builds—configure `content` in `tailwind.config.js` to point at all your `.vue`, `.js`, and `.html` files

```javascript
// filepath: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
  // Rest of configuration
}
```

### Color System & Branding

Maintain a **centralized design system** via `tailwind.config.js`: extend colors, spacing, and breakpoints there rather than scattering custom CSS

```javascript
// filepath: tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // StudyDock brand colors
        primary: {
          DEFAULT: '#1F3A8A', // Primary blue
          light: '#3651A5',
          dark: '#152970',
          hover: '#18307A'
        },
        secondary: {
          DEFAULT: '#3B81F6', // Secondary blue
          light: '#5C97F8',
          dark: '#2A6BD7',
          hover: '#2A70E5'
        },
        // Standard gray scale
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      // Touch-optimized sizes for Ghanaian mobile users
      spacing: {
        'touch-min': '3rem', // 48px - minimum touch target
        'touch-safe': '4rem' // 64px - comfortable touch area
      },
      borderRadius: {
        StudyDock: '0.375rem' // Consistent border-radius
      }
    }
  }
}
```

Apply a **mobile-first methodology** using Tailwind's default responsive prefixes (`sm:`, `md:`, etc.) to ensure a consistent responsive workflow:

```html
<!-- Mobile-first card optimized for Ghanaian mobile users -->
<div
  class="
  w-full              <!-- Full width on small phones (default) -->
  sm:w-1/2 sm:mx-auto <!-- Half width centered on larger phones -->
  md:w-1/3            <!-- Even smaller on tablets and above -->
  p-4                 <!-- Comfortable padding for touch targets -->
  rounded-lg shadow-md
  bg-white
"
>
  <!-- Content here -->
</div>
```

Avoid **utility overload**: group utilities logically (e.g., use `my-4` instead of `mt-4 mb-4`), and extract repeated combinations into `@apply`-based components for readability

Use **semantic component classes** sparingly for very complex patterns, but prefer utility classes in markup to keep styling close to structure

### Ghana-Specific Optimizations

Design for **low-bandwidth conditions** by prioritizing critical content:

```css
@layer components {
  /* Data-saving image styles */
  .img-low-data {
    @apply filter blur-[2px] brightness-90 scale-[0.98];
  }

  /* Enhanced touch targets for mobile users */
  .btn-touch {
    @apply min-h-[3rem] min-w-[3rem] flex items-center justify-center;
  }

  /* Offline indicator - important for users with intermittent connectivity */
  .offline-alert {
    @apply bg-orange-500 text-white px-4 py-2 text-center font-medium;
  }
}
```

## Vite Best Practices

Keep your **development environment lean**: limit the number of plugins to only those you need. Excessive plugins can slow down hot-module replacement (HMR) and cold starts

Use **Incognito mode** (or a dev-only browser profile) when working with Vite's dev server to avoid extension interference and speed up reloads

Organize your `vite.config.js` clearly: group plugin imports, define path aliases (e.g., `@/` for `src/`), and externalize environment variables with `.env` files

```typescript
// Example optimized vite.config.ts for Ghanaian user context (Vite 6.x)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Optimize chunk size for low-bandwidth connections
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Group frequently used libraries together to improve caching
          'vue-core': ['vue', 'vue-router'],
          utils: ['axios']
        }
      }
    },
    // Target modern browsers but maintain compatibility with Android 6+
    target: ['es2018', 'chrome61']
  },
  // Optimize dev server for slower connections
  server: {
    // Strict file serving for security
    fs: {
      strict: true
    },
    // Enable compression for smaller payloads
    headers: {
      'Cache-Control': 'no-store'
    },
    // Improve performance for development
    hmr: {
      overlay: false // Less UI updates for slower connections
    }
  }
})
```

### Optimizing for Ghana's Connectivity Challenges

1. **Asset Optimization**

   - Use the `vite-plugin-imagemin` to compress images by default:

   ```javascript
   import imagemin from 'vite-plugin-imagemin'

   export default defineConfig({
     plugins: [
       vue(),
       imagemin({
         gifsicle: { optimizationLevel: 7, interlaced: false },
         optipng: { optimizationLevel: 5 },
         mozjpeg: { quality: 60 }, // Lower quality for Ghana's bandwidth conditions
         pngquant: { quality: [0.6, 0.8], speed: 4 },
         svgo: { plugins: [{ name: 'removeViewBox' }] }
       })
     ]
   })
   ```

2. **Differential Loading**

   - Configure Vite to generate smaller bundles for low-end Android devices:

   ```javascript
   export default defineConfig({
     build: {
       target: 'es2018', // Balance between size and compatibility
       polyfillModulePreload: true // Support older browsers
     }
   })
   ```

3. **Lazy Loading Configuration**

   - Set up dynamic imports with meaningful chunk names for better caching:

   ```javascript
   // In router/index.ts
   const routes = [
     {
       path: '/',
       component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
     },
     {
       path: '/about',
       // Mark as low-priority for prefetching (saves bandwidth)
       component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
     }
   ]
   ```

4. **Bundle Size Optimization**

   - Configure bundle analysis and set size limits:

   ```javascript
   // Install first: npm add -D rollup-plugin-visualizer
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import { visualizer } from 'rollup-plugin-visualizer'

   export default defineConfig({
     plugins: [
       vue(),
       // Generate bundle stats for optimization
       visualizer({
         open: false, // Don't auto-open the visualization
         gzipSize: true, // Show gzipped sizes (more relevant for production)
         brotliSize: true, // Show brotli sizes (even smaller)
         filename: 'stats.html' // Output file
       })
     ],
     build: {
       // Warning threshold for chunk sizes - important for slow connections
       chunkSizeWarningLimit: 400, // in kB, lower for Ghana's bandwidth considerations
       rollupOptions: {
         output: {
           // Strategies specifically for low-bandwidth environments
           manualChunks: {
             'vue-core': ['vue', 'vue-router'],
             // Only include essential utilities in core chunks
             'essential-utils': ['axios'],
             // Non-critical features in separate chunks
             analytics: ['./src/utils/analytics.js']
           }
         }
       }
     }
   })
   ```

For production, rely on `npm run build`: Vite automatically tree-shakes and minifies your code, generating optimized bundles in `dist/`. Consider deploying to a static host for simplicity.

## **Code Documentation Guidelines**

To ensure clarity and maintainability, **every feature and function must be well-documented** throughout the project. The documentation should include the following:

## 1. **Inline Comments**

- **Briefly explain each significant section of the code**:
  - Why a specific block of code exists.
  - What a function does, especially complex logic.
  - Why certain decisions were made (e.g., workarounds or limitations).

### 2. **Function Documentation**

- **Each function should include a header comment** that describes:
  - Purpose of the function.
  - Parameters (if applicable) and their expected types.
  - Return values (if applicable) and their expected types.

### 3. **File-Level Documentation**

- Each JavaScript file should include a **file-level comment** at the top, describing:
  - The file’s purpose.
  - Major functions or components within it.
  - Any important setup or dependencies.

### 4. **Consistent Naming Conventions**

- Use **clear and descriptive names** for functions, variables, and files.
  - Avoid single-letter variable names (except in short loops).
  - Use camelCase for JavaScript variable names (e.g., `navMenu`, `toggleNav`).
  - Use PascalCase for classes (e.g., `HamburgerMenu`).

## Code Writing Standards _(Required)_

When writing code, adhere to the following standards to ensure maintainability and educational value:

- **Section Headers**: Always include clear section headers as comments to organize your code

  ```typescript
  // ===== Types & Interfaces =====

  // ===== Constants & Config =====

  // ===== Helper Functions =====

  // ===== Main Logic =====
  ```

- **Detailed Comments**: Write comments that explain the "why" not just the "what"

  ```typescript
  // BAD: Sets the timeout to 5000
  const TIMEOUT = 5000

  // GOOD: Using 5s timeout to accommodate slower 3G networks in rural areas
  const TIMEOUT = 5000 // 5 seconds
  ```

- **Logic Explanation**: Break down complex logic with step-by-step comments

  ```typescript
  function syncOfflineData() {
    // 1. First check if we have pending changes to sync
    const pendingChanges = getPendingChanges()

    // 2. Sort changes by priority (critical updates first)
    const sortedChanges = sortByPriority(pendingChanges)

    // 3. Attempt to sync each change with retry logic
    return Promise.all(
      sortedChanges.map((change) => {
        // Using exponential backoff for retries
        return syncWithRetry(change, 3)
      })
    )
  }
  ```

- **Educational Pattern Comments**: Include comments that explain patterns and best practices

  ```vue
  <!-- Using v-show instead of v-if here because this element toggles frequently -->
  <div v-show="isLoading" class="loading-spinner">
    <!-- Aria-live ensures screen readers announce loading state changes -->
    <span aria-live="polite">Loading...</span>
  </div>
  ```

- **Type Documentation**: Document complex types with examples
  ```typescript
  /**
   * Represents a user's offline data state
   * @example
   * {
   *   data: { name: "John", lastSync: 164322132 },
   *   pendingChanges: [{ type: "UPDATE", field: "email" }],
   *   syncStatus: "pending"
   * }
   */
  interface OfflineState<T> {
    data: T
    pendingChanges: Change[]
    syncStatus: 'idle' | 'pending' | 'error'
  }
  ```

This documentation approach ensures that:

1. New team members can learn from the code
2. Future maintainers understand the context and decisions
3. The codebase serves as a learning resource
4. Complex Ghana-specific optimizations are well-explained

## Offline First Strategy

The offline-first approach is crucial for StudyDock applications due to intermittent connectivity in Ghana.

### 1. **Data Storage Strategy**

```typescript
// Define storage schema with version control
interface StorageSchema {
  version: number
  lastSync: number
  data: {
    [key: string]: any
  }
}

// Initialize storage with versioning
export async function initializeStorage(): Promise<void> {
  const schema: StorageSchema = {
    version: 1,
    lastSync: Date.now(),
    data: {}
  }
  await localforage.setItem('app-storage', schema)
}
```

### 2. **Sync Strategy**

```typescript
// Implement background sync with retry logic
export async function syncData(retries = 3): Promise<void> {
  try {
    const pendingChanges = await getPendingChanges()
    await Promise.all(pendingChanges.map((change) => syncWithRetry(change, retries)))
  } catch (error) {
    console.error('Sync failed:', error)
    // Queue for retry when online
    await queueForSync(pendingChanges)
  }
}
```

### 3. **Network Status Handling**

```typescript
// Network status composable
export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine)
  const connectionType = ref<string>()

  onMounted(() => {
    window.addEventListener('online', () => {
      isOnline.value = true
      syncData() // Attempt sync when back online
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  })

  return {
    isOnline,
    connectionType
  }
}
```

## WhatsApp Integration

WhatsApp is a primary communication channel in Ghana. Integrate sharing capabilities using the following approaches:

### 1. **Direct Message Links**

```typescript
export function generateWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}
```

### 2. **Share Button Component**

```vue
<template>
  <button @click="shareOnWhatsApp" class="whatsapp-share-btn" aria-label="Share on WhatsApp">
    <whatsapp-icon />
    Share via WhatsApp
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
  phone?: string
}>()

function shareOnWhatsApp() {
  const url = props.phone
    ? generateWhatsAppLink(props.phone, props.message)
    : `whatsapp://send?text=${encodeURIComponent(props.message)}`

  window.open(url, '_blank')
}
</script>
```

## Optimized Asset Loading

Implement the following strategies for optimal asset loading in low-bandwidth conditions:

### 1. **Image Optimization**

```typescript
// Image loading utility
export function getOptimizedImageUrl(url: string, width: number, quality = 60): string {
  return `${url}?w=${width}&q=${quality}&auto=format`
}
```

### 2. **Lazy Loading Implementation**

```vue
<template>
  <img
    :data-src="src"
    :width="width"
    :height="height"
    class="lazy-image"
    :class="{ loaded: isLoaded }"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  width: number
  height: number
}>()

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage()
      }
    })
  })

  observer.observe(imageRef.value)
})
</script>
```

## Regional Integration

Guidelines for integrating region-specific features:

### 1. **Phone Number Formatting**

```typescript
// Ghana phone number formatter
export function formatGhanaianPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // Check if it's a valid Ghanaian number
  if (cleaned.length === 10) {
    return `+233${cleaned.slice(1)}`
  }

  return phone
}
```

### 2. **Location Services**

```typescript
export function getRegionalSettings() {
  return {
    timezone: 'Africa/Accra',
    currency: 'GHS',
    dateFormat: 'DD/MM/YYYY',
    phoneFormat: '+233 XX XXX XXXX'
  }
}
```

## Performance Benchmarks

Key performance metrics for Ghana-specific conditions:

### Network Performance Targets

| Metric                 | 2G Target | 3G Target | 4G Target |
| ---------------------- | --------- | --------- | --------- |
| First Contentful Paint | < 5s      | < 2s      | < 1s      |
| Time to Interactive    | < 10s     | < 5s      | < 3s      |
| First Input Delay      | < 300ms   | < 200ms   | < 100ms   |

### Bundle Size Limits

| Type           | Target Size |
| -------------- | ----------- |
| Initial Bundle | < 300KB     |
| Route Chunks   | < 100KB     |
| Image Quality  | 60-70%      |

## Testing Guidelines

### 1. **Network Condition Testing**

```typescript
// Network condition simulator
export function simulateNetworkCondition(condition: '2g' | '3g' | '4g' | 'offline'): void {
  if (process.env.NODE_ENV === 'development') {
    // Implement network throttling
    switch (condition) {
      case '2g':
        // Simulate 2G: 250kb/s, 300ms latency
        setNetworkConditions({ latency: 300, downloadThroughput: (250 * 1024) / 8 })
        break
      case '3g':
        // Simulate 3G: 750kb/s, 100ms latency
        setNetworkConditions({ latency: 100, downloadThroughput: (750 * 1024) / 8 })
        break
      case '4g':
        // Simulate 4G: 4mb/s, 50ms latency
        setNetworkConditions({ latency: 50, downloadThroughput: (4 * 1024 * 1024) / 8 })
        break
      case 'offline':
        // Simulate offline mode
        setNetworkConditions({ offline: true })
        break
    }
  }
}
```

### 2. **Offline Testing**

```typescript
describe('Offline Functionality', () => {
  beforeEach(() => {
    // Simulate offline condition
    window.navigator.onLine = false
  })

  test('should store data locally when offline', async () => {
    const data = { id: 1, name: 'Test Item' }
    await saveData(data)
    const stored = await localforage.getItem('offline-store')
    expect(stored).toContainEqual(data)
  })

  test('should sync when back online', async () => {
    window.navigator.onLine = true
    window.dispatchEvent(new Event('online'))
    // Verify sync was triggered
    expect(syncMock).toHaveBeenCalled()
  })
})
```

## SEO Best Practices

Implement these SEO practices for better visibility:

### 1. **Meta Tags**

```vue
<script setup lang="ts">
import { useMeta } from '@/composables/useMeta'

// Set meta tags for Ghana-specific SEO
useMeta({
  title: 'Your App Title | Ghana',
  description: 'Description optimized for Ghanaian users',
  keywords: 'ghana, mobile-first, offline-capable',
  ogLocale: 'en_GH',
  ogRegion: 'GH'
})
</script>
```

### 2. **Performance Optimization**

```typescript
// Implement route-based code splitting with loading states for slow connections
const routes = [
  {
    path: '/',
    component: () => ({
      component: import('./views/Home.vue'),
      loading: LoadingComponent,
      delay: 200, // Show loading after 200ms on slow connections
      timeout: 10000 // Show timeout message after 10s
    }),
    meta: {
      title: 'Home | Ghana'
    }
  }
]
```

## Integration Tips

Best practices for integrating with local services:

### 1. **Payment Integration**

```typescript
// Support for popular Ghanaian payment methods with fallback options
export const paymentMethods = {
  mobileMoney: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money'],
  cards: ['Visa', 'Mastercard'],
  banks: ['GCB Bank', 'Ecobank', 'Fidelity Bank']
}

// Payment processor with offline queue
export async function processPayment(
  amount: number,
  method: keyof typeof paymentMethods
): Promise<PaymentResult> {
  if (!navigator.onLine) {
    return queueOfflinePayment(amount, method)
  }

  try {
    return await processOnlinePayment(amount, method)
  } catch (error) {
    if (error instanceof NetworkError) {
      return queueOfflinePayment(amount, method)
    }
    throw error
  }
}
```

### 2. **SMS Integration**

```typescript
// SMS fallback for critical notifications with retry logic
export async function sendNotification(message: string, phone: string, retries = 3): Promise<void> {
  try {
    await sendPushNotification(message)
  } catch (error) {
    if (retries > 0 && navigator.onLine) {
      // Wait and retry with exponential backoff
      await delay(Math.pow(2, 4 - retries) * 1000)
      return sendNotification(message, phone, retries - 1)
    }
    // Fallback to SMS for critical updates
    await sendSMS(message, formatGhanaianPhone(phone))
  }
}
```

## Communication Guidelines

### 1. **Error Messages**

```typescript
export const errorMessages = {
  network: {
    offline: 'You are currently offline. Your changes will be saved and uploaded when you're back online.',
    slow: 'The connection is slow. Would you like to use less data?',
    retrying: 'Trying to connect again...',
    timeout: 'The connection timed out. Please check your internet and try again.',
    sync: 'Some changes haven't been saved yet. They will be uploaded automatically when you're back online.'
  },
  validation: {
    phone: 'Please enter a valid Ghana phone number (e.g., 024 XXX XXXX)',
    required: 'This information is needed to continue.',
    offline: 'You can fill this in now and we'll save it when you're back online.'
  },
  success: {
    saved: 'Your information has been saved.',
    sync: 'All your changes have been uploaded successfully.',
    offline: 'Saved for when you're back online.'
  }
};
```

### 2. **Loading States**

```vue
<template>
  <div class="loading-state">
    <spinner v-if="isLoading" />
    <p class="loading-message" role="status" aria-live="polite">
      {{ loadingMessage }}
    </p>
    <offline-indicator v-if="!isOnline">
      <template #default>
        <p class="text-amber-600">{{ offlineMessage }}</p>
      </template>
    </offline-indicator>
    <slow-connection-notice v-if="isSlowConnection" @enable-data-saving="enableDataSaving" />
  </div>
</template>

<script setup lang="ts">
const { isOnline, connectionQuality } = useNetworkStatus()
const isSlowConnection = computed(
  () => connectionQuality.value === '2g' || connectionQuality.value === 'slow-3g'
)

const loadingMessage = computed(() =>
  isOnline.value ? 'Loading...' : 'Loading from saved data...'
)

const offlineMessage = computed(() =>
  hasCachedData.value ? 'Working offline with saved data' : 'Cannot load new data while offline'
)

function enableDataSaving() {
  // Implement data saving mode
  // - Reduce image quality
  // - Disable auto-refresh
  // - Increase caching
}
</script>
```
# Keyboard Shortcuts
When I type "nc", it is an abbreviation for need clarification ask yes or no questions
When I type "sc", it is an abbreviation for remember to use shorter and simpler code. No complications what so ever.
When I type "sst", it is an abbreviation for we will start with a static display before moving onto functionality and dynamic displays
When I type "ne", it is an abbreviation for no errors Please
When I type "mr", it is an abbreviation for make reference.
When I type "lt", it is an abbreviation for let's think not write any any any code!!!

# Requesting for **Edit | Delete** functionality
| [Edit icon]Edit   [delete Icon] Delete |