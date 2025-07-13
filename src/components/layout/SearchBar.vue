<!--
  SearchBar.vue
  StudyDock Notes App - Functional Search Component
  ------------------------------------------------
  - FIXED: Search functionality for both folders and notes
  - FIXED: Clickable search results with navigation
  - FIXED: Mobile-first design with touch-friendly interface
  - FIXED: Real-time search with debounced input
  - Ghana mobile-first, touch-friendly, and offline-first
  - All code is fully copy-pasteable and documented for learning
-->

<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search folders and notes..."
        class="w-full px-4 py-3 pl-10 pr-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white shadow-sm transition-colors"
        aria-label="Search folders and notes"
        @input="onSearchInput"
        @focus="showResults = true"
        @blur="onBlur"
      />
      <!-- Search Icon -->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Clear search"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Search Results Dropdown -->
    <div
      v-if="showResults && searchQuery.trim() && (filteredFolders.length > 0 || filteredNotes.length > 0)"
      class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
    >
      <!-- Folders Section -->
      <div v-if="filteredFolders.length > 0" class="p-2">
        <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Folders
        </div>
        <button
          v-for="folder in filteredFolders"
          :key="`folder-${folder.id}`"
          @click="selectSearchFolder(folder)"
          class="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left active:scale-98"
        >
          <div class="flex-shrink-0">
            <span class="text-lg">📁</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-gray-900 truncate">{{ folder.name }}</div>
            <div class="text-sm text-gray-500">{{ folder.noteCount }} notes</div>
          </div>
          <div class="flex-shrink-0 text-gray-400">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      <!-- Notes Section -->
      <div v-if="filteredNotes.length > 0" class="p-2">
        <div v-if="filteredFolders.length > 0" class="border-t border-gray-100 my-2"></div>
        <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Notes
        </div>
        <button
          v-for="note in filteredNotes"
          :key="`note-${note.id}`"
          @click="selectSearchNote(note)"
          class="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left active:scale-98"
        >
          <div class="flex-shrink-0">
            <span class="text-lg">📝</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-medium text-gray-900 truncate">{{ note.title }}</div>
            <div class="text-sm text-gray-500 truncate">{{ note.content }}</div>
            <div class="text-xs text-gray-400 mt-1">
              Updated: {{ formatDate(note.updatedAt) }}
            </div>
          </div>
          <div class="flex-shrink-0 text-gray-400">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- No Results Message -->
    <div
      v-if="showResults && searchQuery.trim() && filteredFolders.length === 0 && filteredNotes.length === 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500"
    >
      <div class="text-4xl mb-2">🔍</div>
      <div class="font-medium">No results found</div>
      <div class="text-sm">Try searching for different keywords</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, watch } from 'vue'
import { useFolder } from '@/composables/useFolders'
import { useNotes } from '@/composables/useNotes'
import type { Note } from '@/composables/useNotes'
import type { Folder } from '@/composables/useFolders'

// ===== Emits =====
const emit = defineEmits<{
  (e: 'folder-selected', folderId: string): void
  (e: 'note-selected', noteId: string, folderId: string): void
}>()

// ===== State & Composables =====
const { folders, selectFolder } = useFolder()
const { notes } = useNotes()

// Search state
const searchQuery = ref('')
const showResults = ref(false)
let searchTimeout: number | null = null

// ===== Computed Properties =====
/**
 * Filters folders based on search query
 */
const filteredFolders = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase().trim()
  return folders.value.filter(folder => 
    folder.name.toLowerCase().includes(query)
  ).slice(0, 5) // Limit to 5 results for mobile performance
})

/**
 * Filters notes based on search query
 */
const filteredNotes = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase().trim()
  return notes.value.filter(note => 
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  ).slice(0, 10) // Limit to 10 results for mobile performance
})

// ===== Methods =====
/**
 * Handles search input with debouncing for better performance
 */
function onSearchInput() {
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  // Debounce search for better performance on slow connections
  searchTimeout = setTimeout(() => {
    showResults.value = searchQuery.value.trim().length > 0
  }, 300)
}

/**
 * Handles selecting a folder from search results
 */
function selectSearchFolder(folder: Folder) {
  // Select the folder
  selectFolder(folder.id)
  
  // Clear search and hide results
  searchQuery.value = ''
  showResults.value = false
  
  // Emit event for parent component
  emit('folder-selected', folder.id)
}

/**
 * Handles selecting a note from search results
 */
function selectSearchNote(note: Note) {
  // First select the folder that contains this note
  selectFolder(note.folderId)
  
  // Clear search and hide results
  searchQuery.value = ''
  showResults.value = false
  
  // Emit event for parent component to open the note
  emit('note-selected', note.id, note.folderId)
}

/**
 * Clears the search query and hides results
 */
function clearSearch() {
  searchQuery.value = ''
  showResults.value = false
}

/**
 * Handles blur event with delay to allow clicking on results
 */
function onBlur() {
  // Delay hiding results to allow clicking on them
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

/**
 * Formats a date string for display
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// ===== Watchers =====
/**
 * Hide results when search query is empty
 */
watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    showResults.value = false
  }
})
</script>

<!--
  ===== Styling & Documentation Notes =====
  - FIXED: Fully functional search for both folders and notes
  - FIXED: Clickable search results with proper navigation
  - FIXED: Mobile-first design with touch-friendly interface
  - FIXED: Real-time search with debounced input for performance
  - FIXED: Clear visual feedback and empty states
  - Ghana mobile-first, touch-friendly, and offline-first
  - All code is modular, maintainable, and well-commented for learning
-->