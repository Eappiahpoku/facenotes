<!--
  filepath: src/components/layout/NoteCard.vue

  NoteCard.vue
  StudyDock Notes App - Single Note Card Component (Dynamic Props Version)
  - Ghana mobile-first: touch-friendly, clear, accessible
  - Receives title, content, and updatedAt as props for dynamic rendering
  - Shows delete icon, triggers ConfirmDeleteModal on click
  - All styling via Tailwind utility classes
-->

<template>
  <!-- Main card container -->
  <div class="relative p-4 cursor-pointer transition-colors hover:bg-gray-50 border-b min-h-[3rem] flex flex-col justify-center group">
    <!-- Delete Icon (top right, only visible on hover/focus for desktop, always for mobile) -->
    <button
      type="button"
      class="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow hover:bg-red-50 focus:bg-red-100 transition-colors group-hover:visible group-focus:visible"
      aria-label="Delete note"
      @click.stop="showDeleteModal = true"
    >
      <!-- Trash icon (Heroicons outline) -->
      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
      </svg>
    </button>

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

    <!-- ===== [New Feature] START ===== -->
    <!-- Confirm Delete Modal -->
    <ConfirmDeleteModal
      :visible="showDeleteModal"
      :item-type="'note'"
      :item-name="title"
      @cancel="showDeleteModal = false"
      @confirm="handleDelete"
    />
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
import { ref, computed } from 'vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

/**
 * Props for NoteCard
 * - title: string (note title)
 * - content: string (note preview/content)
 * - updatedAt: string (ISO date string)
 * - id: string (note id, required for deletion)
 */
interface Props {
  id: string
  title: string
  content: string
  updatedAt: string
}

// Use defineProps for type-safe props
const props = defineProps<Props>()

// ===== Emits =====
const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

// ===== State =====
const showDeleteModal = ref(false)

// ===== Helper Functions =====
/**
 * Formats the date for display.
 * Returns 'Today' if the date is today, else a short date string.
 */
function formatDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return 'Today'
  }
  return date.toLocaleDateString('en-GB')
}

const formattedDate = computed(() => formatDate(props.updatedAt))

/**
 * Handles the delete confirmation.
 * Emits a delete event to the parent with the note id.
 */
function handleDelete() {
  emit('delete', props.id)
  showDeleteModal.value = false
}
</script>

<!--
  ===== Styling Notes =====
  - min-h-[3rem]: ensures minimum 48px touch target (Ghana guideline)
  - line-clamp-2: limits preview to 2 lines (requires @tailwindcss/line-clamp plugin)
  - Delete icon is accessible and touch-friendly
  - All styling via Tailwind utility classes for maintainability and mobile-first workflow
-->

<!-- ===== [New Feature] START ===== -->
<!--
  NoteCard now shows a delete icon and confirmation modal.
  Emits 'delete' event to parent when confirmed.
-->
<!-- ===== [New Feature] END ===== -->