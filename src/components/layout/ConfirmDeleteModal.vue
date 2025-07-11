<!--
  filepath: src/components/layout/ConfirmDeleteModal.vue

  ConfirmDeleteModal.vue
  StudyDock Notes App - Confirm Delete Modal (Static Display)
  ----------------------------------------------------------
  - Ghana mobile-first: touch-friendly, clear, accessible
  - UI for confirming deletion of a folder or note
  - All styling via Tailwind utility classes
  - No dynamic logic, props, or emits yet (sst)
-->

<template>
  <!--
    Modal overlay
    - fixed inset-0: covers entire screen
    - bg-black/40: dimmed background for focus
    - flex items-center justify-center: centers modal card
    - z-50: ensures modal is above all content
  -->
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <!--
      Modal card
      - bg-white: clean background
      - rounded-lg shadow-lg: card-like appearance
      - w-full max-w-sm: mobile-first, centered
      - p-6: comfortable padding for touch targets
    -->
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
      <!-- Modal Title -->
      <h2 class="text-lg font-bold text-gray-900 mb-4 text-center">
        Confirm Delete
      </h2>
      <!-- Confirmation Message -->
      <p class="text-base text-gray-700 mb-6 text-center">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <!-- Modal Actions -->
      <div class="flex gap-3 mt-2">
        <!-- Cancel Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition-colors"
          aria-label="Cancel"
          disabled
        >
          Cancel
        </button>
        <!-- Delete Button -->
        <button
          type="button"
          class="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors"
          aria-label="Delete"
          disabled
        >
          Delete
        </button>
      </div>
      <!-- Simple instructions for Ghanaian users -->
      <p class="text-xs text-gray-500 mt-4 text-center">
        Deleting cannot be undone. All changes are saved for offline use.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic yet (sst). Add emits and v-model in the next step.
</script>

<!--
  ===== Styling Notes =====
  - All touch targets are min 48px for Ghana mobile-first
  - Modal overlay ensures focus and accessibility
  - Inputs and buttons are disabled for static version (sst)
  - Add logic and interactivity in the next step
-->