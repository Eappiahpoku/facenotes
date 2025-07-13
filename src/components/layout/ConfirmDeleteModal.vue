<!--
  filepath: src/components/layout/ConfirmDeleteModal.vue

  ConfirmDeleteModal.vue
  StudyDock Notes App - Confirm Delete Modal (Functional)
  ------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - UI for confirming deletion of a folder or note
  - Accepts props for item type and name
  - Emits confirm/cancel events to parent
  - All styling via Tailwind utility classes
-->

<template>
  <!-- Modal overlay -->
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    aria-modal="true"
    role="dialog"
    tabindex="-1"
  >
    <!-- Modal card -->
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
      <!-- Modal Title -->
      <h2 class="text-lg font-bold text-gray-900 mb-4 text-center">
        Confirm Delete
      </h2>
      <!-- Confirmation Message -->
      <p class="text-base text-gray-700 mb-6 text-center">
        Are you sure you want to delete this
        <span class="font-semibold">{{ itemTypeLabel }}</span>
        <span v-if="itemName" class="font-semibold">"{{ itemName }}"</span>?
        <br />
        This action cannot be undone.
      </p>
      <!-- Modal Actions -->
      <div class="flex gap-3 mt-2">
        <!-- Cancel Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition-colors"
          aria-label="Cancel"
          @click="emitCancel"
          autofocus
        >
          Cancel
        </button>
        <!-- Delete Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors"
          aria-label="Delete"
          @click="emitConfirm"
        >
          Delete
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-4 text-center">
        Deleting cannot be undone. All changes are saved for offline use.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Props for ConfirmDeleteModal
 * - visible: boolean (controls modal visibility)
 * - itemType: 'note' | 'folder' (for message clarity)
 * - itemName: string (optional, for display)
 */
import {computed} from 'vue'
const props = withDefaults(
  defineProps<{
    visible: boolean
    itemType: 'note' | 'folder'
    itemName?: string
  }>(),
  {
    visible: false,
    itemType: 'note',
    itemName: ''
  }
)

// ===== Emits =====
/**
 * Emits:
 * - confirm: when user confirms deletion
 * - cancel: when user cancels
 */
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// ===== Computed Properties =====
/**
 * Returns a capitalized label for the item type.
 */
const itemTypeLabel = computed(() =>
  props.itemType === 'folder' ? 'folder' : 'note'
)

// ===== Methods =====
/**
 * Emits cancel event to parent.
 */
function emitCancel() {
  emit('cancel')
}

/**
 * Emits confirm event to parent.
 */
function emitConfirm() {
  emit('confirm')
}
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Modal overlay ensures focus and accessibility
  - Buttons are accessible and mobile-friendly
  - Clear, simple English for all users
-->