/**
 * useNotes.ts
 * StudyDock Notes App - Notes State Composable (Notes-in-Folder + Default Folder)
 * ------------------------------------------------------------------------------
 * - Allows creating notes inside a specific folder.
 * - If no folder is specified, uses/creates a default "Notes" folder.
 * - Notes and folders are persisted offline.
 * - Ghana mobile-first, clear comments, and maintainable.
 */

// ===== Types & Interfaces =====

/**
 * Represents a single note in the StudyDock Notes App.
 */
export interface Note {
  id: string           // Unique identifier for the note
  title: string        // Note title (short, clear)
  content: string      // Full note content (markdown or plain text)
  folderId: string     // The folder this note belongs to
  updatedAt: string    // ISO date string for last update
}

// ===== Imports & Config =====

import { ref } from 'vue'
import { getItem, setItem } from '@/utils/offlineStorage'
import { useFolder } from '@/composables/useFolders'

// ===== Constants & Mock Data =====

/**
 * Storage key for offline persistence.
 */
const STORAGE_KEY = 'studydock-notes'

/**
 * Default folder name for notes without a folder.
 */
const DEFAULT_FOLDER_NAME = 'Notes'

/**
 * Static mock notes for initial UI rendering.
 */
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to StudyDock',
    content: 'This is your first note. You can edit or delete it anytime.',
    folderId: 'default',
    updatedAt: '2025-07-11T09:00:00Z'
  }
]

// ===== Singleton State =====

const notes = ref<Note[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
let initialized = false // Prevents multiple initializations

// ===== Helper Functions =====

/**
 * Loads notes from offline storage or initializes with mock data.
 */
async function loadNotes() {
  isLoading.value = true
  try {
    const stored = await getItem<Note[]>(STORAGE_KEY)
    if (stored && Array.isArray(stored)) {
      notes.value = stored
    } else {
      notes.value = mockNotes
      await setItem(STORAGE_KEY, mockNotes)
    }
    error.value = null
  } catch (e) {
    error.value = 'Could not load notes. Please try again.'
    notes.value = mockNotes
  } finally {
    isLoading.value = false
  }
}

/**
 * Saves the current notes list to offline storage.
 */
async function saveNotes() {
  try {
    await setItem(STORAGE_KEY, notes.value)
  } catch (e) {
    error.value = 'Could not save notes. Changes may not be saved offline.'
  }
}

/**
 * Adds a new note to a folder (or default folder if none specified).
 * @param title - The note title (string)
 * @param content - The note content (string)
 * @param folderId - The folder ID (optional)
 */
async function addNote(
  title: string,
  content: string,
  folderId?: string
) {
  // ===== [New Feature] START =====
  // Use the folders composable to ensure the folder exists
  const { folders, addFolder } = useFolder()

  let targetFolderId = folderId

  // If no folderId is provided, use or create the default folder
  if (!targetFolderId) {
    // Try to find the default folder
    let defaultFolder = folders.value.find(f => f.name === DEFAULT_FOLDER_NAME)
    if (!defaultFolder) {
      // Create the default folder if it doesn't exist
      await addFolder(DEFAULT_FOLDER_NAME)
      // Wait for folders to update
      defaultFolder = folders.value.find(f => f.name === DEFAULT_FOLDER_NAME)
    }
    targetFolderId = defaultFolder ? defaultFolder.id : 'default'
  }

  // Create the new note object
  const newNote: Note = {
    id: `n${Date.now()}${Math.floor(Math.random() * 1000)}`,
    title: title.trim() || 'Untitled Note',
    content: content.trim(),
    folderId: targetFolderId!,
    updatedAt: new Date().toISOString()
  }

  // Add the new note to the top of the list
  notes.value.unshift(newNote)
  await saveNotes()
  // ===== [New Feature] END =====
}

// ===== Main Logic (Singleton Composable) =====

/**
 * useNotes composable (singleton)
 * - Returns the singleton notes state and addNote function.
 * - Loads notes from offline storage only once.
 */
export function useNotes() {
  if (!initialized) {
    initialized = true
    loadNotes()
  }
  return {
    notes,
    addNote,
    isLoading,
    error
  }
}

/*
  ===== Educational Notes =====
  - This composable uses the singleton pattern for shared state.
  - Notes are loaded from and saved to offline storage.
  - All notes are associated with a folder (default if none specified).
  - Ghana mobile-first, offline-first, and maintainable.
*/