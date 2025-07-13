/**
 * useSearch.ts
 * StudyDock Notes App - Search Composable (Full Implementation)
 * -------------------------------------------------------------------
 * - Provides complete search functionality for notes and folders
 * - Ghana mobile-first: designed for offline-first, low-bandwidth usage
 * - Includes debouncing for performance on lower-end devices
 * - Intelligently filters both notes and folders by title/content
 */

// ===== Imports & Config =====
import { ref, computed, watch } from 'vue'
import { useNotes } from '@/composables/useNotes'
import { useFolder } from '@/composables/useFolders'
import type { Note } from '@/composables/useNotes'
import type { Folder } from '@/composables/useFolders'

// ===== Types & Interfaces =====

/**
 * Represents the search state for StudyDock.
 */
export interface SearchState {
  query: string               // The current search query (text input)
  isSearching: boolean        // Whether a search is in progress
  searchResults: {
    notes: Note[]             // Notes that match the search query
    folders: Folder[]         // Folders that match the search query
  }
  hasResults: boolean         // Whether any results were found
}

// ===== Constants =====
const DEBOUNCE_DELAY = 300    // Milliseconds to wait before filtering (for performance)

// ===== Main Logic =====

/**
 * useSearch composable
 * - Provides search functionality across notes and folders
 * - Includes debouncing for performance
 * - Handles empty states and loading
 */
export function useSearch() {
  // Get notes and folders from their respective composables
  const { notes } = useNotes()
  const { folders } = useFolder()

  // ===== State =====
  const query = ref<string>('')
  const isSearching = ref<boolean>(false)
  const debouncedQuery = ref<string>('')
  const timeoutId = ref<number | null>(null)

  // ===== Search Results =====
  
  /**
   * Filtered notes based on search query
   * Searches in both title and content
   */
  const filteredNotes = computed(() => {
    if (!debouncedQuery.value) return []
    
    const searchTerm = debouncedQuery.value.toLowerCase()
    
    return notes.value.filter(note => 
      note.title.toLowerCase().includes(searchTerm) || 
      note.content.toLowerCase().includes(searchTerm)
    )
  })
  
  /**
   * Filtered folders based on search query
   * Searches in folder name
   */
  const filteredFolders = computed(() => {
    if (!debouncedQuery.value) return []
    
    const searchTerm = debouncedQuery.value.toLowerCase()
    
    return folders.value.filter(folder => 
      folder.name.toLowerCase().includes(searchTerm)
    )
  })
  
  /**
   * Whether the search has any results
   */
  const hasResults = computed(() => {
    return filteredNotes.value.length > 0 || filteredFolders.value.length > 0
  })

  // ===== Search Logic =====
  
  /**
   * Debounces the search query to avoid excessive filtering
   * Especially important for Ghana mobile-first (lower-end devices)
   */
  watch(query, (newQuery) => {
    isSearching.value = true
    
    // Clear any existing timeout
    if (timeoutId.value !== null) {
      clearTimeout(timeoutId.value)
    }
    
    // Set a new timeout for the debounce delay
    timeoutId.value = setTimeout(() => {
      debouncedQuery.value = newQuery
      isSearching.value = false
    }, DEBOUNCE_DELAY) as unknown as number
  })
  
  /**
   * Clear the search query and results
   */
  function clearSearch() {
    query.value = ''
    debouncedQuery.value = ''
    isSearching.value = false
  }

  // ===== Return Values =====
  return {
    // State
    query,
    isSearching,
    
    // Results
    filteredNotes,
    filteredFolders,
    hasResults,
    
    // Actions
    clearSearch
  }
}

/*
  ===== Educational Notes =====
  - This composable implements search functionality for notes and folders
  - Uses debouncing to improve performance on lower-end devices (common in Ghana)
  - Completely client-side for offline-first functionality
  - Reactive computed properties ensure results update automatically when:
    - The search query changes
    - Notes or folders are added, edited, or deleted
  - The search is case-insensitive for better user experience
*/