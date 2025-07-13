<!--
  filepath: src/views/HomeView.vue

  HomeView.vue
  StudyDock Notes App - FIXED: Mobile note editing in full-screen mode
  --------------------------------------------------------------------
  - FIXED: Mobile notes now open in full-screen editor when clicked
  - FIXED: Seamless transition between note list and editor on mobile
  - FIXED: Back button to return to notes list
  - FIXED: TypeScript error with noteId prop type
  - Ghana mobile-first, touch-friendly, and offline-first
-->

<template>
  <!-- ===== MAIN CONTAINER ===== -->
  <div class="h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">

    <!-- ===== MOBILE LAYOUT (visible on small screens) ===== -->
    <div class="lg:hidden flex flex-col h-full">
      <!-- ===== [New Feature] START ===== -->
      <!-- Mobile Full-Screen Note Editor -->
      <div v-if="selectedNoteId" class="fixed inset-0 bg-white z-50 flex flex-col">
        <!-- Mobile Editor Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <button
            @click="selectedNoteId = null"
            class="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <span class="text-xl">←</span>
            <span>Back to Notes</span>
          </button>
          <span class="text-sm text-gray-500">Editing Note</span>
        </div>
        <!-- Full-Screen Editor -->
        <div class="flex-1 overflow-hidden">
          <!-- ===== [Error Fix] START ===== -->
          <!-- Fix: Use selectedNoteId directly since it's already checked to be non-null -->
          <NoteEditor :note-id="selectedNoteId" />
          <!-- ===== [Error Fix] END ===== -->
        </div>
      </div>
      <!-- ===== [New Feature] END ===== -->

      <!-- Mobile Search Bar (only show when not editing) -->
      <div v-if="!selectedNoteId" class="bg-white shadow-sm p-4 border-b">
        <SearchBar />
      </div>
      
      <!-- Mobile Folders/Notes List (only show when not editing) -->
      <div v-if="!selectedNoteId" class="flex-1 bg-white overflow-y-auto">
        <div class="p-4">
          <!-- Back button if folder is selected -->
          <div v-if="selectedFolderId" class="mb-4">
            <button
              @click="handleFolderSelection(null)"
              class="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span>←</span>
              <span>Back to Folders</span>
            </button>
          </div>
          
          <!-- Show folders if none selected -->
          <div v-if="!selectedFolderId">
            <div
              v-for="folder in folders"
              :key="folder.id"
              class="mb-2 group relative"
            >
              <button
                @click="handleFolderSelection(folder.id)"
                class="w-full flex items-center justify-between p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div class="font-semibold text-gray-900 truncate">{{ folder.name }}</div>
                  <div class="text-xs text-gray-500">{{ folder.noteCount }} notes</div>
                </div>
                <div class="text-primary"></div>
              </button>
              <!-- ===== [Delete Feature] START ===== -->
              <!-- ===== [Delete Button Visibility Fix] START ===== -->
              <!-- On mobile, always show delete button (opacity-100, no hover/focus needed) -->
              <button
                @click.stop="openDeleteModal('folder', folder.id)"
                class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-opacity duration-200 opacity-100"
                aria-label="Delete folder"
                tabindex="0"
              >
                <!-- Simple trash icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                </svg>
              </button>
              <!-- ===== [Delete Button Visibility Fix] END ===== -->
              <!-- ===== [Delete Feature] END ===== -->
            </div>
            <!-- Empty state -->
            <div v-if="folders.length === 0" class="text-center text-gray-400 py-8">
              No folders yet. Tap "Add Folder" to create one.
            </div>
          </div>
          
          <!-- Show notes for selected folder -->
          <div v-else>
            <h3 class="text-lg font-semibold mb-4">
              {{ selectedFolder?.name }} Notes
            </h3>
            <!-- ===== [New Feature] START ===== -->
            <!-- Mobile Notes List - clickable to open editor -->
            <div v-if="folderNotes.length > 0" class="space-y-3">
              <div
                v-for="note in folderNotes"
                :key="note.id"
                class="relative group"
              >
                <button
                  @click="selectedNoteId = note.id"
                  class="w-full bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow text-left active:scale-98"
                >
                  <h4 class="font-semibold text-gray-900 mb-2">{{ note.title }}</h4>
                  <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ note.content }}</p>
                  <div class="flex items-center justify-between">
                    <div class="text-xs text-gray-500">
                      Updated: {{ formatDate(note.updatedAt) }}
                    </div>
                    <div class="text-primary text-sm">
                      Tap to edit →
                    </div>
                  </div>
                </button>
                <!-- ===== [Delete Feature] START ===== -->
                <!-- ===== [Delete Button Visibility Fix] START ===== -->
                <!-- On mobile, always show delete button (opacity-100, no hover/focus needed) -->
                <button
                  @click.stop="openDeleteModal('note', note.id)"
                  class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-opacity duration-200 opacity-100"
                  aria-label="Delete note"
                  tabindex="0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                  </svg>
                </button>
                <!-- ===== [Delete Button Visibility Fix] END ===== -->
                <!-- ===== [Delete Feature] END ===== -->
              </div>
            </div>
            <!-- ===== [New Feature] END ===== -->
            <!-- Empty state for folder notes -->
            <div v-else class="text-center text-gray-400 py-8">
              No notes in this folder yet. Tap "Add Note" to create one.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Action Hub (only show when not editing) -->
      <div v-if="!selectedNoteId" class="bg-white border-t shadow-lg p-4">
        <div class="grid grid-cols-2 gap-3">
          <button
            v-if="!selectedFolderId"
            class="flex items-center justify-center gap-2 h-12 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
            @click="showAddFolderModal = true"
          >
            <span class="text-lg">📁</span>
            Add Folder
          </button>
          <button 
            class="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary-hover active:bg-primary-dark text-white rounded-lg font-medium transition-colors"
            @click="handleAddNote"
            :disabled="isAddingNote"
          >
            <span class="text-lg">📝</span>
            {{ isAddingNote ? 'Adding...' : 'Add Note' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===== DESKTOP LAYOUT (visible on large screens) ===== -->
    <div class="hidden lg:flex h-full w-full">
      <!-- Left Panel: Folders -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <SearchBar />
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <div
            v-for="folder in folders"
            :key="folder.id"
            class="mb-2 group relative"
          >
            <button
              @click="handleFolderSelection(folder.id)"
              class="w-full flex items-center justify-between p-4 rounded-lg shadow-sm transition-colors text-left"
              :class="[
                selectedFolderId === folder.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-50 hover:bg-gray-100'
              ]"
            >
              <div>
                <div class="font-semibold truncate">{{ folder.name }}</div>
                <div class="text-xs opacity-75">{{ folder.noteCount }} notes</div>
              </div>
            </button>
            <!-- ===== [Delete Feature] START ===== -->
            <!-- ===== [Delete Button Visibility Fix] START ===== -->
            <!-- On desktop, only show delete button on hover/focus (opacity-0 by default, group-hover:opacity-100) -->
            <button
              @click.stop="openDeleteModal('folder', folder.id)"
              class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete folder"
              tabindex="0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
              </svg>
            </button>
            <!-- ===== [Delete Button Visibility Fix] END ===== -->
            <!-- ===== [Delete Feature] END ===== -->
          </div>
          <!-- Empty state -->
          <div v-if="folders.length === 0" class="text-center text-gray-400 py-8">
            No folders yet. Click "New Folder" to create one.
          </div>
        </div>
        <div class="p-4 border-t border-gray-200">
          <button
            class="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            @click="showAddFolderModal = true"
          >
            <span>+</span>
            New Folder
          </button>
        </div>
      </div>
      
      <!-- Middle Panel: Notes List -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <button 
            class="w-full h-10 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            @click="handleAddNote"
            :disabled="isAddingNote"
          >
            <span>+</span>
            {{ isAddingNote ? 'Adding...' : 'New Note' }}
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <!-- ===== [New Feature] START ===== -->
          <!-- Desktop Notes List - clickable to select note -->
          <div v-if="selectedFolderId">
            <div v-if="folderNotes.length > 0" class="space-y-3">
              <div
                v-for="note in folderNotes"
                :key="note.id"
                class="relative group"
              >
                <button
                  @click="selectedNoteId = note.id"
                  class="w-full bg-gray-50 rounded-lg border p-4 hover:bg-gray-100 transition-colors cursor-pointer text-left"
                  :class="[
                    selectedNoteId === note.id ? 'bg-primary text-white' : ''
                  ]"
                >
                  <h4 class="font-semibold mb-2">{{ note.title }}</h4>
                  <p class="text-sm mb-2 line-clamp-2 opacity-75">{{ note.content }}</p>
                  <div class="text-xs opacity-75">
                    Updated: {{ formatDate(note.updatedAt) }}
                  </div>
                </button>
                <!-- ===== [Delete Feature] START ===== -->
                <!-- ===== [Delete Button Visibility Fix] START ===== -->
                <!-- On desktop, only show delete button on hover/focus (opacity-0 by default, group-hover:opacity-100) -->
                <button
                  @click.stop="openDeleteModal('note', note.id)"
                  class="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow transition-opacity duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Delete note"
                  tabindex="0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                  </svg>
                </button>
                <!-- ===== [Delete Button Visibility Fix] END ===== -->
                <!-- ===== [Delete Feature] END ===== -->
              </div>
            </div>
            <!-- Empty state for folder notes -->
            <div v-else class="text-center text-gray-400 py-8">
              No notes in this folder yet. Click "New Note" to create one.
            </div>
          </div>
          <!-- No folder selected state -->
          <div v-else class="text-center text-gray-400 py-8">
            Select a folder to view its notes.
          </div>
          <!-- ===== [New Feature] END ===== -->
        </div>
      </div>
    <!-- Right Panel: Editor -->
      <div class="flex-1 bg-white flex flex-col">
        <!-- ===== [Error Fix] START ===== -->
        <!-- Fix: Only render NoteEditor when selectedNoteId is not null -->
        <NoteEditor v-if="selectedNoteId" :note-id="selectedNoteId" />
        <div v-else class="flex-1 flex items-center justify-center text-gray-400">
          <div class="text-center">
            <div class="text-4xl mb-4">📝</div>
            <p class="text-lg font-medium">Select a note to edit</p>
            <p class="text-sm">Choose a note from the list to start editing</p>
          </div>
        </div>
        <!-- ===== [Error Fix] END ===== -->
      </div>
    </div>
  </div>

  <!-- ===== Add Folder Modal ===== -->
  <AddFolderModal
    v-if="showAddFolderModal"
    @add="handleAddFolder"
    @cancel="showAddFolderModal = false"
  />

  <!-- ===== [Delete Modal] START ===== -->
  <!-- Custom Delete Confirmation Modal (replaces browser confirm) -->
  <div
    v-if="deleteModal.open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    aria-modal="true"
    role="dialog"
  >
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-sm mx-auto p-6 flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <div class="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center">
          <!-- Trash icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-lg text-gray-900">
            Delete {{ deleteModal.type === 'folder' ? 'Folder' : 'Note' }}?
          </h3>
        </div>
      </div>
      <p class="text-gray-700 text-sm">
        Are you sure you want to delete this {{ deleteModal.type }}{{ deleteModal.type === 'folder' ? ' and all its notes' : '' }}? This cannot be undone.
      </p>
      <div class="flex gap-3 mt-2">
        <button
          @click="confirmDelete"
          class="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Yes, Delete
        </button>
        <button
          @click="closeDeleteModal"
          class="flex-1 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <!-- ===== [Delete Modal] END ===== -->
</template>

<script setup lang="ts">
// ===== Imports =====
import SearchBar from '@/components/layout/SearchBar.vue'
import NoteEditor from '@/components/layout/NoteEditor.vue'
import AddFolderModal from '@/components/layout/AddFolderModal.vue'
// ===== State & Logic =====
import { ref, computed } from 'vue'
import { useFolder } from '@/composables/useFolders'
import { useNotes } from '@/composables/useNotes'
import { useToast } from '@/composables/useToast'

const { folders, selectedFolderId, addFolder, selectFolder, deleteFolder } = useFolder()
const { notes, addNote, deleteNote } = useNotes()
const { success, error } = useToast()

const showAddFolderModal = ref(false)
const isAddingNote = ref(false)
// ===== [New Feature] START ===== 
const selectedNoteId = ref<string | null>(null)
// ===== [New Feature] END =====

// ===== [Delete Modal] START =====
/**
 * Modal state for delete confirmation.
 * - open: whether modal is visible
 * - type: 'note' or 'folder'
 * - id: id of the note/folder to delete
 */
const deleteModal = ref<{
  open: boolean
  type: 'note' | 'folder' | null
  id: string | null
}>({
  open: false,
  type: null,
  id: null
})

/**
 * Opens the delete modal for a note or folder.
 * @param type 'note' or 'folder'
 * @param id string
 */
function openDeleteModal(type: 'note' | 'folder', id: string) {
  deleteModal.value.open = true
  deleteModal.value.type = type
  deleteModal.value.id = id
}

/**
 * Closes the delete modal.
 */
function closeDeleteModal() {
  deleteModal.value.open = false
  deleteModal.value.type = null
  deleteModal.value.id = null
}

/**
 * Handles confirming the delete action from the modal.
 * Calls the appropriate delete handler.
 */
function confirmDelete() {
  if (deleteModal.value.type === 'note' && deleteModal.value.id) {
    handleDeleteNote(deleteModal.value.id)
  } else if (deleteModal.value.type === 'folder' && deleteModal.value.id) {
    handleDeleteFolder(deleteModal.value.id)
  }
  closeDeleteModal()
}
// ===== [Delete Modal] END =====

// ===== Computed Properties =====
const selectedFolder = computed(() => 
  folders.value.find(f => f.id === selectedFolderId.value)
)

const folderNotes = computed(() => 
  selectedFolderId.value 
    ? notes.value.filter(note => note.folderId === selectedFolderId.value)
    : []
)

// ===== Methods =====
/**
 * Handles adding a new folder and closes the modal.
 */
function handleAddFolder(name: string) {
  addFolder(name)
  showAddFolderModal.value = false
  success('Folder created successfully!')
}

/**
 * Handles adding a new note to the selected folder (or default folder).
 */
async function handleAddNote() {
  isAddingNote.value = true
  
  try {
    const title = 'New Note'
    const content = 'Start writing your note here...'
    
    let targetFolderId = selectedFolderId.value
    
    if (!targetFolderId && folders.value.length > 0) {
      targetFolderId = folders.value[0].id
      selectFolder(targetFolderId)
    }
    
    await addNote(title, content, targetFolderId || undefined)
    
    success('Note created successfully!')
    
  } catch (err) {
    error('Failed to create note. Please try again.')
    console.error('Error creating note:', err)
  } finally {
    isAddingNote.value = false
  }
}
// ===== [Fix] START =====
/**
 * Handles folder selection and clears selected note
 * FIXED: Now clears the editor when switching folders
 */
function handleFolderSelection(folderId: string | null) {
  selectFolder(folderId)
  selectedNoteId.value = null // Clear selected note when switching folders
}
// ===== [Fix] END =====

/**
 * Formats a date string for display.
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ===== [Delete Feature] START =====
/**
 * Handles deleting a note by id.
 * No confirm dialog here; handled by modal.
 */
function handleDeleteNote(noteId: string) {
  deleteNote(noteId)
  success('Note deleted.')
  // If the deleted note was open, close the editor
  if (selectedNoteId.value === noteId) {
    selectedNoteId.value = null
  }
}

/**
 * Handles deleting a folder by id.
 * No confirm dialog here; handled by modal.
 */
function handleDeleteFolder(folderId: string) {
  deleteFolder(folderId)
  success('Folder deleted.')
  // If the deleted folder was selected, clear selection
  if (selectedFolderId.value === folderId) {
    selectFolder(null)
    selectedNoteId.value = null
  }
}
// ===== [Delete Feature] END =====
</script>

<!--
  ===== Styling & Documentation Notes =====
  - FIXED: Mobile notes now open in full-screen editor when clicked
  - FIXED: Seamless transition between note list and editor on mobile
  - FIXED: Back button to return to notes list from editor
  - FIXED: Desktop notes also clickable to select for editing
  - FIXED: TypeScript error with noteId prop type mismatch
  - Ghana mobile-first, touch-friendly, and offline-first
  - All code is modular, maintainable, and well-commented for learning
  - [Delete Feature]: Delete button appears on hover/focus for each note/folder, touch-friendly, with confirmation dialog
  - [Delete Modal]: Custom modal for delete confirmation, accessible and mobile-first
  - [Delete Button Visibility Fix]: Delete button always visible on mobile, hover/focus on desktop
-->