// Base store configuration with offline persistence support
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRootStore = defineStore('root', () => {
  // State
  const lastSyncTime = ref<number | null>(null)
  const isOnline = ref(navigator.onLine)
  const networkType = ref<string | null>(null)
  const pendingSync = ref(false)

  // Getters
  const needsSync = computed(() => pendingSync.value && isOnline.value)
  const networkStatus = computed(() => isOnline.value ? 'online' : 'offline')

  // Actions
  function updateOnlineStatus(status: boolean) {
    isOnline.value = status
    if (status && pendingSync.value) {
      syncData()
    }
  }

  async function syncData() {
    if (!isOnline.value) {
      pendingSync.value = true
      return
    }

    try {
      // Implement your sync logic here
      lastSyncTime.value = Date.now()
      pendingSync.value = false
    } catch (error) {
      console.error('Sync failed:', error)
      pendingSync.value = true
    }
  }

  return {
    // State
    lastSyncTime,
    isOnline,
    networkType,
    pendingSync,
    // Getters
    needsSync,
    networkStatus,
    // Actions
    updateOnlineStatus,
    syncData
  }
})
