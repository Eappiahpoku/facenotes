/**
 * useFolders.ts
 * StudyDock Notes App - Folders State Composable (Fixed Singleton + Persistence)
 * ------------------------------------------------------------------------------
 * - FIXED: Singleton pattern ensures only one folders state exists app-wide
 * - FIXED: Loads and saves folders using offlineStorage.ts (localForage)
 * - FIXED: selectFolder now accepts null for deselecting folders
 * - Ghana mobile-first: designed for offline-first, low-bandwidth, and touch-friendly UX
 * - All types and state are documented for learning and maintainability
 */

// ===== Types & Interfaces =====

/**
 * Represents a single folder in the StudyDock Notes App.
 */
export interface Folder {
  id: string           // Unique identifier for the folder
  name: string         // Folder name (short, clear)
  noteCount: number    // Number of notes in this folder
  updatedAt: string    // ISO date string for last update
}

// ===== Imports & Config =====

import { ref } from 'vue'
import { getItem, setItem } from '@/utils/offlineStorage'

// ===== Constants & Mock Data =====

/**
 * Storage key for offline persistence.
 */
const STORAGE_KEY = 'studydock-folders'

/**
 * Static mock folders for initial UI rendering.
 * - Ghana context: short, clear, mobile-friendly folder names.
 */
const mockFolders: Folder[] = [
  {
    id: 'f1',
    name: 'Personal',
    noteCount: 3,
    updatedAt: '2025-07-11T09:00:00Z'
  },
  {
    id: 'f2',
    name: 'Work',
    noteCount: 5,
    updatedAt: '2025-07-10T15:30:00Z'
  },
  {
    id: 'f3',
    name: 'Ideas',
    noteCount: 2,
    updatedAt: '2025-07-09T12:45:00Z'
  }
]

// ===== Singleton State (FIXED) =====

/**
 * Singleton state for folders, loading, and error.
 * This ensures all components share the same folders state.
 */
const folders = ref<Folder[]>([])
const selectedFolderId = ref<string | null>(null) // Track selected folder
const isLoading = ref(true)
const error = ref<string | null>(null)
let initialized = false // Prevents multiple initializations

// ===== Helper Functions =====

/**
 * Loads folders from offline storage or initializes with mock data.
 */
async function loadFolders() {
  if (initialized) return // Prevent multiple loads
  
  isLoading.value = true
  try {
    const stored = await getItem<Folder[]>(STORAGE_KEY)
    if (stored && Array.isArray(stored)) {
      folders.value = stored
    } else {
      folders.value = [...mockFolders] // Use spread to avoid mutation
      await setItem(STORAGE_KEY, folders.value)
    }
    error.value = null
  } catch (e) {
    error.value = 'Could not load folders. Please try again.'
    folders.value = [...mockFolders]
  } finally {
    isLoading.value = false
    initialized = true
  }
}

/**
 * Saves the current folders list to offline storage.
 */
async function saveFolders() {
  try {
    await setItem(STORAGE_KEY, folders.value)
  } catch (e) {
    error.value = 'Could not save folders. Changes may not be saved offline.'
  }
}

/**
 * Adds a new folder to the folders list and persists it.
 * @param name - The name of the new folder (string)
 */
async function addFolder(name: string) {
  const id = `f${Date.now()}${Math.floor(Math.random() * 1000)}`
  const newFolder: Folder = {
    id,
    name: name.trim(),
    noteCount: 0,
    updatedAt: new Date().toISOString()
  }
  folders.value.unshift(newFolder)
  await saveFolders()
}

/**
 * Selects a folder to view its notes, or deselects if null is passed.
 * @param folderId - The ID of the folder to select, or null to deselect
 */
function selectFolder(folderId: string | null) {
  selectedFolderId.value = folderId
}

// ===== Main Logic (Fixed Singleton Composable) =====

/**
 * useFolder composable (singleton)
 * - Returns the singleton folders state and functions
 * - Automatically loads folders from offline storage
 */
export function useFolder() {
  // Load folders immediately if not already loaded
  if (!initialized) {
    loadFolders()
  }
  
  return {
    folders,
    selectedFolderId,
    addFolder,
    selectFolder,
    isLoading,
    error
  }
}

/*
  ===== Educational Notes =====
  - FIXED: This composable now properly uses the singleton pattern
  - FIXED: Folders are loaded from and saved to offline storage correctly
  - FIXED: selectFolder now accepts string | null for deselecting folders
  - FIXED: All components using useFolder() will see the same folders list
  - Ghana mobile-first, offline-first, and maintainable
*/