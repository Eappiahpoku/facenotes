<!-- App Header.vue: ContainsStudyDock Logo & App Name -->
 <!--
  filepath: src/components/layout/AppHeader.vue

  AppHeader.vue
  StudyDock Notes App header component.
  - Ghana mobile-first: logo left, app name right, touch-friendly, accessible.
  - Uses StudyDockLogo component (white version).
  - All styling via Tailwind utility classes.
  - No dynamic logic yet (static display only).
-->

<template>
  <header
    class="flex items-center justify-between px-4 py-3 bg-primary text-white shadow-md"
    role="banner"
    aria-label="StudyDock Notes App Header"
  >
    <!-- ===== [Logo Section] ===== -->
    <!-- StudyDock Logo on the left (SVG or image, white version) -->
    <StudyDockLogo white class="h-8 w-auto" aria-label="StudyDock Logo" />

    <!-- ===== [App Name Section] ===== -->
    <!-- App name on the right, bold, accessible -->
    <span class="text-lg font-bold tracking-wide" aria-label="App Name">
      StudyDock Notes
    </span>
  </header>
</template>

<script setup lang="ts">
// ===== Imports =====
// Import StudyDockLogo component (must exist at @/components/base/StudyDockLogo.vue)
import StudyDockLogo from '@/components/base/StudyDockLogo.vue'
</script>

<!--
  ===== Styling Notes =====
  - bg-primary: uses StudyDock brand color (see tailwind.config.js)
  - px-4 py-3: mobile-first padding for touch targets
  - h-8: logo height (32px, meets 32-48px guideline)
  - text-lg font-bold: clear, readable app name
  - shadow-md: subtle elevation for header
  - All styling via Tailwind utility classes (per StudyDock guidelines)
-->