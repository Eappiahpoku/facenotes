<!--
  filepath: src/components/layout/FolderList.vue

  FolderList.vue
  StudyDock Notes App - Folder List Component (Dynamic Version)
  ------------------------------------------------------------
  - Ghana mobile-first: touch-friendly, scrollable, clear, accessible
  - Renders a group of FolderCard components in a vertical list using useFolder composable
  - Includes a prominent "Add Folder" button at the top (sst, still static/disabled)
  - All styling via Tailwind utility classes
  - Now dynamic: loops through folders from useFolder composable
-->

<template>
  <!--
    Main list container
    - w-full: full width for mobile
    - max-w-md: limit width on larger screens for readability
    - mx-auto: center on desktop/tablet
    - bg-white: clean background
    - rounded-lg shadow-sm: card-like appearance
    - mt-4: spacing from header or other sections
    - overflow-y-auto: scrollable if content exceeds viewport
  -->
  <div
    class="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm mt-4 overflow-y-auto"
    aria-label="List of Folders"
    role="list"
  >
    <!-- ===== [Add Folder Button] ===== -->
    <button
      type="button"
      class="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-t-lg shadow hover:bg-primary-hover transition-colors mb-2"
      aria-label="Add Folder"
      disabled
    >
      <!-- Plus icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Add Folder
    </button>

    <!-- ===== [Dynamic FolderCards] ===== -->
    <!-- Loop through folders and render a FolderCard for each -->
    <FolderCard
      v-for="folder in folders"
      :key="folder.id"
      :id="folder.id"
      :name="folder.name"
      :note-count="folder.noteCount"
      :updated-at="folder.updatedAt"
    />
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import FolderCard from './FolderCard.vue'
import { useFolder } from '@/composables/useFolders'

// ===== Main Logic =====
/**
 * Get the reactive folders array from the useFolder composable.
 * This will be the source of truth for the folder list.
 */
const { folders } = useFolder()
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Add Folder button is visually distinct and always at the top
  - Folder cards are stacked vertically with dividers
  - Now dynamic: renders real folder data from useFolder composable
-->

<!-- ===== [New Feature] START ===== -->
<!--
  FolderList.vue now loops through folders from useFolder composable.
  FolderCard should accept props: name, noteCount, updatedAt.
-->
<!-- ===== [New Feature] END ===== -->