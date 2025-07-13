/**
 * useFolders composable
 * Handles folder state, selection, creation, and deletion for StudyDock Notes.
 * Ghana mobile-first, offline-first, and simple error handling.
 *
 * ===== [New Feature] START =====
 * - Now persists folders using LocalForage (offlineStorage.ts)
 * - Loads folders from offline storage on startup
 * - All CRUD operations update offline storage
 * - [Change] Removed all seeded/mock folder data. App starts with empty folders.
 * ===== [New Feature] END =====
 */

import { ref } from 'vue'
import { setItem, getItem } from '@/utils/offlineStorage' // Import LocalForage helpers

// ===== Types & Interfaces =====
export interface Folder {
  id: string
  name: string
  noteCount: number
  updatedAt: string
}

// ===== Constants & Config =====
const FOLDERS_KEY = 'folders' // Storage key for all folders

// ===== State =====
const folders = ref<Folder[]>([])
const selectedFolderId = ref<string | null>(null)
const isFoldersLoaded = ref(false) // Track if folders have been loaded

// ===== Helper Functions =====
function generateId(): string {
  // Simple unique ID generator for demo purposes
  return Math.random().toString(36).substr(2, 9)
}

// ===== Main Logic =====

/**
 * Loads folders from offline storage on startup.
 * If no folders exist, initializes with an empty array.
 * ===== [Change] START =====
 * - Removed any mock/seeded folder data. Only loads from storage or starts empty.
 * ===== [Change] END =====
 */
async function loadFolders(): Promise<void> {
  try {
    const stored = await getItem<Folder[]>(FOLDERS_KEY)
    folders.value = stored || []
    isFoldersLoaded.value = true
  } catch (err) {
    // Simple error message for Ghanaian users
    console.error('Could not load folders. Please reload the app.')
    folders.value = []
    isFoldersLoaded.value = true
  }
}

/**
 * Saves the current folders array to offline storage.
 */
async function saveFolders(): Promise<void> {
  try {
    await setItem(FOLDERS_KEY, folders.value)
  } catch (err) {
    // Simple error message for Ghanaian users
    console.error('Could not save folders. Try again later.')
  }
}

/**
 * Add a new folder.
 * @param name - Folder name
 */
async function addFolder(name: string): Promise<void> {
  folders.value.push({
    id: generateId(),
    name,
    noteCount: 0,
    updatedAt: new Date().toISOString()
  })
  await saveFolders() // Persist change
}

/**
 * Select a folder by ID.
 * @param id - Folder ID or null to clear selection
 */
function selectFolder(id: string | null): void {
  selectedFolderId.value = id
}

/**
 * ===== [New Feature] START =====
 * Delete a folder by ID.
 * @param id - Folder ID
 * Removes the folder and (optionally) its notes.
 */
async function deleteFolder(id: string): Promise<void> {
  folders.value = folders.value.filter(folder => folder.id !== id)
  await saveFolders() // Persist change
  // Optionally: Remove notes belonging to this folder (handled in useNotes)
}
/**
 * ===== [New Feature] END =====
 */

// ===== Initialization Pattern =====
let initialized = false
export function useFolder() {
  if (!initialized) {
    initialized = true
    loadFolders()
  }
  return {
    folders,
    selectedFolderId,
    isFoldersLoaded, // Useful for UI loading states
    addFolder,
    selectFolder,
    deleteFolder, // ===== [New Feature] Exported for deletion support =====
    loadFolders // Exported in case manual reload is needed
  }
}

/*
  ===== Educational Notes =====
  - All folder changes are now persistent and offline-first.
  - Error messages are simple and clear for Ghanaian users.
  - No seeded/mock data: folders start empty unless user creates them.
  - This file can be copy-pasted as a whole and will work if offlineStorage.ts is present.
*/