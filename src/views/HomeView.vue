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
  <AppHeader />
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
              @click="selectFolder(null)"
              class="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <span>←</span>
              <span>Back to Folders</span>
            </button>
          </div>
          
          <!-- Show folders if none selected -->
          <div v-if="!selectedFolderId">
            <div v-for="folder in folders" :key="folder.id" class="mb-2">
              <button
                @click="selectFolder(folder.id)"
                class="w-full flex items-center justify-between p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div class="font-semibold text-gray-900 truncate">{{ folder.name }}</div>
                  <div class="text-xs text-gray-500">{{ folder.noteCount }} notes</div>
                </div>
                <div class="text-primary">
                  <span>→</span>
                </div>
              </button>
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
              <button
                v-for="note in folderNotes"
                :key="note.id"
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
          <div v-for="folder in folders" :key="folder.id" class="mb-2">
            <button
              @click="selectFolder(folder.id)"
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
              <button
                v-for="note in folderNotes"
                :key="note.id"
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
</template>

<script setup lang="ts">
// ===== Imports =====
import AppHeader from '@/components/layout/AppHeader.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
import NoteEditor from '@/components/layout/NoteEditor.vue'
import AddFolderModal from '@/components/layout/AddFolderModal.vue'

// ===== State & Logic =====
import { ref, computed } from 'vue'
import { useFolder } from '@/composables/useFolders'
import { useNotes } from '@/composables/useNotes'
import { useToast } from '@/composables/useToast'

const { folders, selectedFolderId, addFolder, selectFolder } = useFolder()
const { notes, addNote } = useNotes()
const { success, error } = useToast()

const showAddFolderModal = ref(false)
const isAddingNote = ref(false)
// ===== [New Feature] START ===== 
const selectedNoteId = ref<string | null>(null)
// ===== [New Feature] END =====

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
-->