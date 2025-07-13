/**
 * useNotes.ts
 * StudyDock Notes App - Notes State Composable (LocalForage persistence, minimal/focused)
 * -----------------------------------------------------------------------------
 * - All note operations now persist to LocalForage immediately
 * - Data loads from LocalForage on app startup
 * - Ghana mobile-first: designed for offline-first usage
 * - All operations are logged for debugging and learning
 * - Folder note counts are updated directly (no missing helpers)
 */

// ===== Types & Interfaces =====
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

// ===== Constants =====
const STORAGE_KEY = 'studydock-notes'
const DEFAULT_FOLDER_NAME = 'Notes'

// ===== Singleton State =====
const notes = ref<Note[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
let initialized = false

// ===== Helper Functions =====

/**
 * Loads notes from LocalForage or initializes with an empty array
 * If no notes exist, starts with an empty array (no mock data).
 */
async function loadNotes() {
  isLoading.value = true
  console.log('📝 Loading notes from LocalForage...')
  
  try {
    const stored = await getItem<Note[]>(STORAGE_KEY)
    if (stored && Array.isArray(stored)) {
      notes.value = stored
      console.log(`📝 Loaded ${stored.length} notes from LocalForage`)
    } else {
      // ===== [Change] START =====
      // Start with an empty array if no notes exist
      notes.value = []
      await setItem(STORAGE_KEY, [])
      console.log('📝 Initialized with empty notes array in LocalForage')
      // ===== [Change] END =====
    }
    error.value = null
  } catch (e) {
    error.value = 'Could not load notes. Please try again.'
    notes.value = []
    console.error('❌ Failed to load notes:', e)
  } finally {
    isLoading.value = false
  }
}

/**
 * Saves notes to LocalForage
 * Persists the current notes array to offline storage.
 */
async function saveNotes() {
  try {
    await setItem(STORAGE_KEY, notes.value)
    console.log(`📝 Saved ${notes.value.length} notes to LocalForage`)
  } catch (e) {
    error.value = 'Could not save notes. Changes may not be saved offline.'
    console.error('❌ Failed to save notes:', e)
  }
}

/**
 * Adds a new note and immediately saves to LocalForage
 * Also updates the folder's noteCount directly.
 * @param title - Note title
 * @param content - Note content
 * @param folderId - Optional folder ID
 */
async function addNote(title: string, content: string, folderId?: string) {
  const { folders, addFolder } = useFolder()

  let targetFolderId = folderId

  // If no folderId provided, use or create default folder
  if (!targetFolderId) {
    let defaultFolder = folders.value.find(f => f.name === DEFAULT_FOLDER_NAME)
    if (!defaultFolder) {
      await addFolder(DEFAULT_FOLDER_NAME)
      defaultFolder = folders.value.find(f => f.name === DEFAULT_FOLDER_NAME)
    }
    targetFolderId = defaultFolder ? defaultFolder.id : 'default'
  }

  // Create new note
  const newNote: Note = {
    id: `n${Date.now()}${Math.floor(Math.random() * 1000)}`,
    title: title.trim() || 'Untitled Note',
    content: content.trim(),
    folderId: targetFolderId!,
    updatedAt: new Date().toISOString()
  }

  // Add to notes array and save
  notes.value.unshift(newNote)
  await saveNotes()

  // ===== [New Feature] START =====
  // Update folder note count directly
  const folder = folders.value.find(f => f.id === targetFolderId)
  if (folder) {
    folder.noteCount += 1
  }
  // ===== [New Feature] END =====

  console.log(`📝 Added new note: ${title}`)
  return newNote
}

/**
 * Updates an existing note and immediately saves to LocalForage
 * @param noteId - Note ID
 * @param title - New title
 * @param content - New content
 */
async function updateNote(noteId: string, title: string, content: string) {
  const noteIndex = notes.value.findIndex(note => note.id === noteId)
  
  if (noteIndex === -1) {
    throw new Error('Note not found')
  }

  // Update note
  notes.value[noteIndex] = {
    ...notes.value[noteIndex],
    title: title.trim() || 'Untitled Note',
    content: content.trim(),
    updatedAt: new Date().toISOString()
  }

  await saveNotes()
  console.log(`📝 Updated note: ${title}`)
  return notes.value[noteIndex]
}

/**
 * Deletes a note and immediately saves to LocalForage
 * Also updates the folder's noteCount directly.
 * @param noteId - Note ID to delete
 */
async function deleteNote(noteId: string) {
  const noteIndex = notes.value.findIndex(note => note.id === noteId)
  
  if (noteIndex === -1) {
    throw new Error('Note not found')
  }

  const note = notes.value[noteIndex]
  // Remove note from array
  notes.value.splice(noteIndex, 1)
  await saveNotes()

  // ===== [New Feature] START =====
  // Update folder note count directly
  const { folders } = useFolder()
  const folder = folders.value.find(f => f.id === note.folderId)
  if (folder && folder.noteCount > 0) {
    folder.noteCount -= 1
  }
  // ===== [New Feature] END =====

  console.log(`📝 Deleted note: ${note.title}`)
}

// ===== Main Composable =====

/**
 * useNotes composable - manages notes state with LocalForage persistence
 * Loads notes from storage on first use.
 */
export function useNotes() {
  if (!initialized) {
    initialized = true
    loadNotes()
  }
  
  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    isLoading,
    error
  }
}

/*
  ===== Educational Notes =====
  - All note operations now persist to LocalForage immediately
  - Data loads from LocalForage on app startup
  - Folder note counts are updated directly when notes are added/removed
  - Console logging helps with debugging during development
  - Singleton pattern ensures consistent state across components
  - Ghana mobile-first: optimized for offline-first usage
*/
