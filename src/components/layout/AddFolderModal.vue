<!--
  filepath: src/components/layout/AddFolderModal.vue

  AddFolderModal.vue
  StudyDock Notes App - Add Folder Modal (Functional Version)
  ----------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - Lets user enter a folder name and submit to create a new folder
  - Emits 'add' (with folder name) and 'cancel' events to parent
  - All styling via Tailwind utility classes
-->

<template>
  <!-- Modal overlay -->
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <!-- Modal card -->
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
      <!-- Modal Title -->
      <h2 class="text-lg font-bold text-gray-900 mb-4 text-center">
        Add Folder
      </h2>
      <!-- Folder Name Input -->
      <label for="folder-name" class="block text-sm font-medium text-gray-700 mb-1">
        Folder Name
      </label>
      <input
        id="folder-name"
        v-model="folderName"
        type="text"
        class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-base bg-white shadow-sm mb-4"
        placeholder="Enter folder name"
        aria-label="Folder name"
        :disabled="isLoading"
        @keyup.enter="handleAdd"
        autofocus
        required
      />
      <!-- Modal Actions -->
      <div class="flex gap-3 mt-2">
        <!-- Cancel Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition-colors"
          aria-label="Cancel"
          @click="handleCancel"
          :disabled="isLoading"
        >
          Cancel
        </button>
        <!-- Add Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary-hover transition-colors"
          aria-label="Add folder"
          @click="handleAdd"
          :disabled="isLoading || !folderName.trim()"
        >
          Add
        </button>
      </div>
      <!-- Simple instructions for Ghanaian users -->
      <p class="text-xs text-gray-500 mt-4 text-center">
        Enter a folder name. You can create notes inside this folder later.
      </p>
      <!-- Error message -->
      <p v-if="error" class="text-xs text-red-600 mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * Emits:
 * - add: string (folder name)
 * - cancel: void
 */
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', folderName: string): void
  (e: 'cancel'): void
}>()

// ===== Main Logic =====
const folderName = ref('')
const isLoading = ref(false)
const error = ref('')

/**
 * Handles the Add button click.
 * Emits 'add' event with the folder name if valid.
 */
async function handleAdd() {
  if (!folderName.value.trim()) {
    error.value = 'Please enter a folder name.'
    return
  }
  error.value = ''
  isLoading.value = true
  // Simulate async for UX (remove in real app)
  setTimeout(() => {
    emit('add', folderName.value.trim())
    isLoading.value = false
    folderName.value = ''
  }, 400)
}

/**
 * Handles the Cancel button click.
 * Emits 'cancel' event to parent.
 */
function handleCancel() {
  emit('cancel')
  folderName.value = ''
  error.value = ''
}
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Modal overlay ensures focus and accessibility
  - Add button is disabled if input is empty or loading
  - Error messages are clear and in simple English
-->