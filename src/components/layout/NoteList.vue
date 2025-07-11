<!--
  filepath: src/components/layout/NoteList.vue

  NoteList.vue
  StudyDock Notes App - Dynamic Note List Component
  - Renders a group of NoteCard components in a vertical list using data from useNotes.ts.
  - Ghana mobile-first: touch-friendly, scrollable, clear, accessible.
  - This version uses the useNotes composable for state.
  - Will later be filtered by SearchBar.vue and support offline-first.
-->

<template>
  <!--
    Main list container
    - w-full: full width for mobile
    - max-w-md: limit width on larger screens for readability
    - mx-auto: center on desktop/tablet
    - divide-y: subtle dividers between cards
    - overflow-y-auto: scrollable if content exceeds viewport
    - bg-white: clean background
    - rounded-lg shadow-sm: card-like appearance
    - mt-4: spacing from header
  -->
  <div
    class="w-full max-w-md mx-auto divide-y overflow-y-auto bg-white rounded-lg shadow-sm mt-4"
    aria-label="List of Notes"
    role="list"
  >
    <!-- ===== [Dynamic NoteCards] ===== -->
    <!-- Loop through notes and render a NoteCard for each -->
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      :content="note.content"
      :updated-at="note.updatedAt"
    />
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
/**
 * Imports NoteCard component and useNotes composable.
 * useNotes provides a reactive list of notes.
 */
import NoteCard from './NoteCard.vue'
import { useNotes } from '@/composables/useNotes'

// ===== Main Logic =====
/**
 * Get the reactive notes array from the useNotes composable.
 * This will be the source of truth for the note list.
 */
const { notes } = useNotes()
</script>

<!--
  ===== Styling Notes =====
  - All styling via Tailwind utility classes for maintainability and mobile-first workflow.
  - Touch targets and spacing follow Ghana guidelines (min 48px).
  - This file is now dynamic and ready for future filtering and offline support.
-->

<!-- ===== [New Feature] START ===== -->
<!--
  NoteCard now expects props: title, content, updatedAt.
  Update NoteCard.vue to accept these props for dynamic rendering.
-->
<!-- ===== [New Feature] END ===== -->