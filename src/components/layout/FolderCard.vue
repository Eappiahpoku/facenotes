<!--
  filepath: src/components/layout/FolderCard.vue

  FolderCard.vue
  StudyDock Notes App - Folder Card Component (Static Display)
  -----------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - UI for displaying a single folder (will be looped in FolderList.vue)
  - All styling via Tailwind utility classes
  - No dynamic logic, props, or emits yet (sst)
-->

<template>
  <!--
    Main folder card container
    - p-4: padding for touch targets (min 48px)
    - cursor-pointer: indicates clickable/tappable
    - hover:bg-gray-50: subtle feedback on tap/hover
    - border-b: divider between cards
    - flex items-center: icon and folder name aligned
    - gap-3: space between icon and text
  -->
  <div class="p-4 cursor-pointer transition-colors hover:bg-gray-50 border-b min-h-[3rem] flex items-center gap-3">
    <!-- ===== [Folder Icon] ===== -->
    <!-- Simple folder SVG icon, styled for StudyDock -->
    <svg
      class="w-7 h-7 text-primary flex-shrink-0"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      />
    </svg>

    <!-- ===== [Folder Name] ===== -->
    <span class="text-base font-semibold text-gray-900 truncate">
      Folder Name
    </span>
    <!-- ===== [Folder Note Count] ===== -->
    <span class="ml-auto text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
      3 notes
    </span>
  </div>
</template>

<script setup lang="ts">
// No logic yet (sst). Add props and emits in the next step.
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Icon uses StudyDock primary color
  - Folder name is bold and truncated for long names
  - Note count is visually distinct, small, and rounded
  - Add logic and interactivity in the next step
-->