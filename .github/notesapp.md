# Focus

*Plan*
*We are going to implement the various features/components step-by-step.* *We will start with the #AppHeader.vue* ,*NoteCard.vue*, *NoteList.vue* , *useNotes.ts*, *NoteEditor.vue*, *FolderCard.vue*, *FolderList.vue*,*useFolders.ts*,*SearchBar.vue* , *AddFolderModal*, *ConfirmDeleteModal.vue*,  *ActionHub.vue* ,  *useSearch.ts*, *useToast.ts*

## prompts

*Users should be able to create a folder (which we can do), be able to reload and find the same folder intact (currently doesn't work) and create a note inside the folder. In the event, the user creates a new note without creating a folder, the notes should be automatically saved in a defaults folder called Notes*
**Do you understand?**

*I would like to start of with **step 1**

|Steps | What Should be Achieved? |
|------| -------------------------|
|1     | Singleton + persistence for folders |
|2     | Note Creation inside folders |

|Issue | Files to re-code |
|------|------------------|
|The folders cannot be clicked to see their sub-components (notes)| #NoteCard.vue|
|The new folders when created don't persist when refreshed| you choose|

***Let's solve this imminent problem***

## BEFORE WE COULD LEAVE

---
useFolders.ts

```ts
/**
 * useFolders.ts
 * StudyDock Notes App - Folders State Composable (FIXED: Note count updates)
 * ---------------------------------------------------------------------------
 * - FIXED: Folder note counts now update when notes are added/removed
 * - FIXED: Singleton pattern ensures only one folders state exists app-wide
 * - FIXED: Loads and saves folders using offlineStorage.ts (localForage)
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

// ===== [New Feature] START =====
/**
 * Updates the note count for a specific folder.
 * @param folderId - The ID of the folder to update
 * @param increment - How much to change the count by (positive or negative)
 */
async function updateFolderNoteCount(folderId: string, increment: number) {
  const folder = folders.value.find(f => f.id === folderId)
  if (folder) {
    folder.noteCount += increment
    // Ensure count doesn't go below 0
    folder.noteCount = Math.max(0, folder.noteCount)
    folder.updatedAt = new Date().toISOString()
    await saveFolders()
  }
}

/**
 * Increments the note count for a folder by 1.
 * @param folderId - The ID of the folder to increment
 */
async function incrementFolderNoteCount(folderId: string) {
  await updateFolderNoteCount(folderId, 1)
}

/**
 * Decrements the note count for a folder by 1.
 * @param folderId - The ID of the folder to decrement
 */
async function decrementFolderNoteCount(folderId: string) {
  await updateFolderNoteCount(folderId, -1)
}

/**
 * Recalculates note counts for all folders based on actual notes.
 * This is useful for ensuring accuracy after sync operations.
 * @param notesData - Array of notes to count from
 */
async function recalculateFolderNoteCounts(notesData: Array<{ folderId: string }>) {
  const folderCounts: Record<string, number> = {}
  
  // Count notes for each folder
  notesData.forEach(note => {
    folderCounts[note.folderId] = (folderCounts[note.folderId] || 0) + 1
  })
  
  // Update folder counts
  folders.value.forEach(folder => {
    const newCount = folderCounts[folder.id] || 0
    if (folder.noteCount !== newCount) {
      folder.noteCount = newCount
      folder.updatedAt = new Date().toISOString()
    }
  })
  
  await saveFolders()
}
// ===== [New Feature] END =====

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
    // ===== [New Feature] START =====
    // Export note count management functions
    updateFolderNoteCount,
    incrementFolderNoteCount,
    decrementFolderNoteCount,
    recalculateFolderNoteCounts,
    // ===== [New Feature] END =====
    isLoading,
    error
  }
}

/*
  ===== Educational Notes =====
  - FIXED: This composable now properly uses the singleton pattern
  - FIXED: Folders are loaded from and saved to offline storage correctly
  - FIXED: selectFolder now accepts string | null for deselecting folders
  - FIXED: Folder note counts can now be updated when notes are added/removed
  - FIXED: All components using useFolder() will see the same folders list
  - Ghana mobile-first, offline-first, and maintainable
*/


---
useNotes.ts

```ts
/**
 * useNotes.ts
 * StudyDock Notes App - Notes State Composable (FIXED: Updates folder note counts)
 * -------------------------------------------------------------------------------
 * - FIXED: Now updates folder note counts when notes are added/removed
 * - Allows creating notes inside a specific folder
 * - If no folder is specified, uses/creates a default "Notes" folder
 * - Notes and folders are persisted offline
 * - Ghana mobile-first, clear comments, and maintainable
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

import { ref, onMounted } from 'vue'
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
  // ===== [Updated Feature] START =====
  // Use the folders composable to ensure the folder exists and update counts
  const { folders, addFolder, incrementFolderNoteCount } = useFolder()

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

  // FIXED: Update the folder's note count
  await incrementFolderNoteCount(targetFolderId!)
  // ===== [Updated Feature] END =====
}

// ===== Main Logic (Singleton Composable) =====

/**
 * useNotes composable (singleton)
 * - Returns the singleton notes state and addNote function
 * - Loads notes from offline storage only once
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
  - FIXED: This composable now updates folder note counts when notes are added
  - This composable uses the singleton pattern for shared state
  - Notes are loaded from and saved to offline storage
  - All notes are associated with a folder (default if none specified)
  - Ghana mobile-first, offline-first, and maintainable
*/
