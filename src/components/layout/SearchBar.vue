<!--
  filepath: src/components/layout/SearchBar.vue

  SearchBar.vue
  Universal search input for folders and notes (Static Display)
  -------------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - No logic, just static input for now (sst)
  - All styling via Tailwind utility classes
-->

<template>
  <div class="relative">
    <!--
      Search input
      - w-full: full width for mobile
      - h-12: 48px touch target (Ghana guideline)
      - pl-4 pr-10: padding for icon and text
      - rounded-lg border: modern, accessible
      - focus:ring-primary: clear focus state
      - text-base: readable on mobile
    -->
    <input
      type="text"
      placeholder="Search Notes or Folders 🔍"
      class="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base"
      aria-label="Search Notes or Folders"
      disabled
    />
    <!--
      Search icon (SVG)
      - absolute right-3 top-1/2: icon aligned right, vertically centered
      - text-gray-400: subtle, non-distracting
    -->
    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic yet (sst). Add emits and v-model in the next step.
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Input is disabled for now (sst)
  - Add logic and interactivity in the next step
-->