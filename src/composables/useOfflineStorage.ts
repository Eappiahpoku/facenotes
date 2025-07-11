import { ref } from 'vue'
import { useNetworkStatus } from './useNetworkStatus'

interface PendingOperation {
  id: string
  timestamp: number
  operation: 'create' | 'update' | 'delete'
  resource: string
  data: any
}

export function useOfflineStorage() {
  const { networkInfo } = useNetworkStatus()
  const pendingOperations = ref<PendingOperation[]>([])
  const isSyncing = ref(false)

  // Save data locally with offline support
  const saveData = async (
    resource: string,
    data: any,
    operation: PendingOperation['operation'] = 'create'
  ) => {
    try {
      // First try online operation if we're connected
      if (networkInfo.value.isOnline) {
        // Implement your API call here
        // await api.save(resource, data)
        return true
      }

      // If offline or API call fails, queue the operation
      const pendingOp: PendingOperation = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        operation,
        resource,
        data
      }

      pendingOperations.value.push(pendingOp)
      
      // Save to IndexedDB or localStorage
      await localStorage.setItem(
        'pendingOperations',
        JSON.stringify(pendingOperations.value)
      )

      return true
    } catch (error) {
      console.error('Error saving data:', error)
      return false
    }
  }

  // Load pending operations from storage
  const loadPendingOperations = async () => {
    try {
      const stored = localStorage.getItem('pendingOperations')
      if (stored) {
        pendingOperations.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading pending operations:', error)
    }
  }

  // Sync pending operations when online
  const syncPendingOperations = async () => {
    if (!networkInfo.value.isOnline || isSyncing.value || !pendingOperations.value.length) {
      return
    }

    isSyncing.value = true

    try {
      // Sort operations by timestamp
      const sorted = [...pendingOperations.value].sort((a, b) => a.timestamp - b.timestamp)

      for (const operation of sorted) {
        try {
          // Implement your API calls here based on operation type
          // await api.sync(operation)
          
          // Remove from pending operations after successful sync
          pendingOperations.value = pendingOperations.value.filter(op => op.id !== operation.id)
          
          // Update storage
          await localStorage.setItem(
            'pendingOperations',
            JSON.stringify(pendingOperations.value)
          )
        } catch (error) {
          console.error(`Error syncing operation ${operation.id}:`, error)
        }
      }
    } finally {
      isSyncing.value = false
    }
  }

  // Watch for online status and sync when we reconnect
  if (networkInfo.value.isOnline) {
    syncPendingOperations()
  }

  return {
    saveData,
    loadPendingOperations,
    syncPendingOperations,
    pendingOperations,
    isSyncing
  }
}
