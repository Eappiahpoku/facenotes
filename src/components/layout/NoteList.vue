<!--
  filepath: src/components/layout/NoteList.vue

  NoteList.vue (actually a FolderCard)
  StudyDock Notes App - Folder Card Component (Dynamic, Deletable)
  ---------------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - Displays a single folder with name and note count
  - Shows delete icon, triggers ConfirmDeleteModal on click
  - Emits 'delete' event to parent when confirmed
  - All styling via Tailwind utility classes
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
  <div class="relative p-4 cursor-pointer transition-colors hover:bg-gray-50 border-b min-h-[3rem] flex items-center gap-3 group">
    <!-- ===== [Folder Icon] ===== -->
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
      {{ name }}
    </span>
    <!-- ===== [Folder Note Count] ===== -->
    <span class="ml-auto text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
      {{ noteCount }} note{{ noteCount === 1 ? '' : 's' }}
    </span>

    <!-- ===== [New Feature] START ===== -->
    <!-- Delete Icon (top right, only visible on hover/focus for desktop, always for mobile) -->
    <button
      type="button"
      class="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow hover:bg-red-50 focus:bg-red-100 transition-colors group-hover:visible group-focus:visible"
      aria-label="Delete folder"
      @click.stop="showDeleteModal = true"
    >
      <!-- Trash icon (Heroicons outline) -->
      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
      </svg>
    </button>

    <!-- Confirm Delete Modal -->
    <ConfirmDeleteModal
      :visible="showDeleteModal"
      :item-type="'folder'"
      :item-name="name"
      @cancel="showDeleteModal = false"
      @confirm="handleDelete"
    />
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
import { ref } from 'vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

/**
 * Props for FolderCard
 * - id: string (folder id, required for deletion)
 * - name: string (folder name)
 * - noteCount: number (number of notes in folder)
 */
interface Props {
  id: string
  name: string
  noteCount: number
}

// Use defineProps for type-safe props
const props = defineProps<Props>()

// ===== Emits =====
const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

// ===== State =====
const showDeleteModal = ref(false)

/**
 * Handles the delete confirmation.
 * Emits a delete event to the parent with the folder id.
 */
function handleDelete() {
  emit('delete', props.id)
  showDeleteModal.value = false
}
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Icon uses StudyDock primary color
  - Folder name is bold and truncated for long names
  - Note count is visually distinct, small, and rounded
  - Delete icon is accessible and touch-friendly
  - All styling via Tailwind utility classes for maintainability and mobile-first workflow
-->

<!-- ===== [New Feature] START ===== -->
<!--
  FolderCard now shows a delete icon and confirmation modal.
  Emits 'delete' event to parent when confirmed.
-->
<!-- ===== [New Feature] END ===== -->