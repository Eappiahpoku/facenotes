/**
 * offlineStorage.ts
 * StudyDock Notes App - Offline Storage Utility
 * ----------------------------------------------
 * - Centralized LocalForage configuration
 * - Wrapper functions for consistent storage operations
 * - Optimized for Ghana's intermittent connectivity
 * - All data persists offline and syncs when online
 */

// ===== Imports =====
import localforage from 'localforage'

// ===== Configuration =====
/**
 * Initialize LocalForage with StudyDock-specific settings
 * - Uses IndexedDB for better performance on mobile devices
 * - Falls back to WebSQL, then localStorage for older browsers
 * - Configured for Ghana mobile-first usage
 */
localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ],
  name: 'StudyDock-FaceNotes',
  version: 1.0,
  storeName: 'facenotes_data',
  description: 'StudyDock FaceNotes offline storage for Ghana users'
})

// ===== Helper Functions =====

/**
 * Saves a value to LocalForage under the given key.
 * If value is a Vue ref or contains any non-cloneable objects, it will be converted to a plain JS object/array.
 * @param key - Storage key (string)
 * @param value - Any serializable value (array/object)
 * @returns Promise<void>
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    // ===== [New Feature] START =====
    // If value is a Vue ref, save its .value, else save as is
    // Also, deeply convert any proxies/refs to plain objects/arrays
    function toRawDeep(val: any): any {
      if (val && typeof val === 'object') {
        if ('value' in val && Object.keys(val).length === 1) {
          // Vue ref
          return toRawDeep(val.value)
        }
        if (Array.isArray(val)) {
          return val.map(toRawDeep)
        }
        // Plain object: recursively convert all properties
        const out: any = {}
        for (const k in val) {
          out[k] = toRawDeep(val[k])
        }
        return out
      }
      return val
    }
    const toSave = toRawDeep(value)
    await localforage.setItem(key, toSave)
    // ===== [New Feature] END =====
  } catch (error) {
    console.error(`Failed to save ${key} to offline storage`, error)
    throw error
  }
}

/**
 * Retrieves data from offline storage with error handling
 * @param key - Storage key (string)
 * @returns Promise<T | null>
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await localforage.getItem<T>(key)
    if (value !== null) {
      console.log(`✅ Loaded from offline storage: ${key}`)
    }
    return value
  } catch (error) {
    console.error(`❌ Failed to load from offline storage: ${key}`, error)
    return null
  }
}

/**
 * Removes data from offline storage
 * @param key - Storage key (string)
 * @returns Promise<void>
 */
export async function removeItem(key: string): Promise<void> {
  try {
    await localforage.removeItem(key)
    console.log(`✅ Removed from offline storage: ${key}`)
  } catch (error) {
    console.error(`❌ Failed to remove from offline storage: ${key}`, error)
    throw new Error(`Failed to remove ${key} from offline storage`)
  }
}

/**
 * Clears all data from offline storage (use with caution)
 * @returns Promise<void>
 */
export async function clearAll(): Promise<void> {
  try {
    await localforage.clear()
    console.log('✅ Cleared all offline storage')
  } catch (error) {
    console.error('❌ Failed to clear offline storage', error)
    throw new Error('Failed to clear offline storage')
  }
}

/**
 * Gets all keys from offline storage
 * @returns Promise<string[]>
 */
export async function getAllKeys(): Promise<string[]> {
  try {
    const keys = await localforage.keys()
    return keys
  } catch (error) {
    console.error('❌ Failed to get storage keys', error)
    return []
  }
}

/**
 * Checks if LocalForage is ready and working
 * @returns Promise<boolean>
 */
export async function isStorageReady(): Promise<boolean> {
  try {
    await localforage.ready()
    return true
  } catch (error) {
    console.error('❌ LocalForage not ready', error)
    return false
  }
}

/*
  ===== Educational Notes =====
  - LocalForage automatically chooses the best storage driver available
  - IndexedDB is preferred for better performance on mobile devices
  - All functions include error handling for Ghana's connectivity challenges
  - Console logging helps with debugging during development
  - This utility makes storage operations consistent across the app
*/