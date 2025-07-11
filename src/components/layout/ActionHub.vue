<!--
  filepath: src/components/layout/ActionHub.vue

  ActionHub.vue
  StudyDock Notes App - Action Hub (Static Display)
  ------------------------------------------------
  - Ghana mobile-first: fixed bottom action bar for key actions
  - All styling via Tailwind utility classes
  - No dynamic logic, props, or emits yet (sst)
  - Buttons are disabled for now
-->

<template>
  <!--
    Fixed bottom action bar
    - fixed bottom-0 left-0 right-0: always visible at bottom
    - bg-white: clean background
    - border-t: subtle divider
    - shadow-lg: slight elevation
    - z-50: above all content
  -->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <!-- Desktop View (hidden on mobile) -->
    <div class="hidden md:flex justify-center items-center h-16 max-w-7xl mx-auto px-4">
      <div class="flex space-x-8 items-center">
        <!-- Home -->
        <button class="flex items-center space-x-2 text-primary hover:text-primary-dark" disabled>
          <!-- Home icon (SVG placeholder) -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
          <span>Home</span>
        </button>
        <!-- New Note -->
        <button class="flex items-center space-x-2 text-primary hover:text-primary-dark" disabled>
          <!-- Plus icon (SVG placeholder) -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Note</span>
        </button>
        <!-- Share WhatsApp -->
        <button class="flex items-center space-x-2 text-green-600 hover:text-green-700" disabled>
          <!-- WhatsApp icon (SVG placeholder) -->
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A12 12 0 003.48 20.52l-1.3 4.77a1 1 0 001.22 1.22l4.77-1.3A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 1110-10 10 10 0 01-10 10zm5.66-7.34a1 1 0 00-1.41 0l-2.12 2.12a1 1 0 01-1.41 0l-2.12-2.12a1 1 0 000-1.41l2.12-2.12a1 1 0 011.41 0l2.12 2.12a1 1 0 000 1.41z"/>
          </svg>
          <span>Share WhatsApp</span>
        </button>
        <!-- Download PDF -->
        <button class="flex items-center space-x-2 text-primary hover:text-primary-dark" disabled>
          <!-- Download icon (SVG placeholder) -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span>Download PDF</span>
        </button>
      </div>
    </div>
    <!-- Mobile View (shown on mobile) -->
    <div class="md:hidden flex justify-around items-center h-16">
      <!-- Home -->
      <button class="text-primary hover:text-primary-dark" disabled>
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
      </button>
      <!-- New Note -->
      <button class="text-primary hover:text-primary-dark" disabled>
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <!-- Share WhatsApp -->
      <button class="text-green-600 hover:text-green-700" disabled>
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A12 12 0 003.48 20.52l-1.3 4.77a1 1 0 001.22 1.22l4.77-1.3A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 1110-10 10-10 0 01-10 10zm5.66-7.34a1 1 0 00-1.41 0l-2.12 2.12a1 1 0 01-1.41 0l-2.12-2.12a1 1 0 000-1.41l2.12-2.12a1 1 0 011.41 0l2.12 2.12a1 1 0 000 1.41z"/>
        </svg>
      </button>
      <!-- Download PDF -->
      <button class="text-primary hover:text-primary-dark" disabled>
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic yet (sst). Add emits and navigation in the next step.
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Action bar is always visible and accessible
  - Buttons are disabled for static version (sst)
  - Add logic and interactivity in the next step
-->