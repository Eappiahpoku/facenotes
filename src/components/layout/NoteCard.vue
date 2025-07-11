<!--
  filepath: src/components/layout/NoteCard.vue

  NoteCard.vue
  StudyDock Notes App - Single Note Card Component (Dynamic Props Version)
  - Ghana mobile-first: touch-friendly, clear, accessible
  - Receives title, content, and updatedAt as props for dynamic rendering
  - To be used in NoteList.vue (multiple NoteCards in a scrollable list)
  - All styling via Tailwind utility classes
-->

<template>
  <!--
    Main card container
    - p-4: padding for touch targets (min 48px)
    - cursor-pointer: indicates clickable/tappable
    - hover:bg-gray-50: subtle feedback on tap/hover
    - border-b: divider between cards
  -->
  <div class="p-4 cursor-pointer transition-colors hover:bg-gray-50 border-b min-h-[3rem] flex flex-col justify-center">
    <!-- Note title (truncated if too long) -->
    <h3 class="font-medium text-gray-900 mb-1 truncate">
      {{ title }}
    </h3>
    <!-- Note preview (2 lines max, truncated) -->
    <p class="text-sm text-gray-600 mb-2 line-clamp-2">
      {{ content }}
    </p>
    <!-- Note date (small, muted) -->
    <p class="text-xs text-gray-400">
      {{ formattedDate }}
    </p>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
import {computed} from 'vue'
/**
 * Props for NoteCard
 * - title: string (note title)
 * - content: string (note preview/content)
 * - updatedAt: string (ISO date string)
 */
interface Props {
  title: string
  content: string
  updatedAt: string
}

// Use defineProps for type-safe props
const props = defineProps<Props>()

// ===== Helper Functions =====
/**
 * Formats the updatedAt ISO string to a readable date.
 * - Shows "Today" if the date is today, otherwise shows a short date.
 */
function formatDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  // Check if the note was updated today (Ghana time)
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return 'Today'
  }
  // Return as DD/MM/YYYY for Ghana
  return date.toLocaleDateString('en-GB')
}

// Computed property for formatted date
const formattedDate = computed(() => formatDate(props.updatedAt))
</script>

<!--
  ===== Styling Notes =====
  - min-h-[3rem]: ensures minimum 48px touch target (Ghana guideline)
  - line-clamp-2: limits preview to 2 lines (requires @tailwindcss/line-clamp plugin)
  - All styling via Tailwind utility classes for maintainability and mobile-first workflow
-->

<!-- ===== [New Feature] START ===== -->
<!--
  NoteCard now accepts props: title, content, updatedAt.
  Renders dynamic note data from NoteList.vue.
-->
<!-- ===== [New Feature] END ===== -->