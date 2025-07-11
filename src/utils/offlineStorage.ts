/**
 * offlineStorage.ts
 * StudyDock Notes App - Offline Storage Utility
 * ---------------------------------------------
 * - Provides named exports for getItem and setItem using localForage.
 * - Ghana mobile-first: reliable, simple, and type-safe.
 * - Used by composables for offline-first data.
 */

import localforage from 'localforage'

// ===== Helper Functions =====

/**
 * Gets a value from offline storage by key.
 * @param key - The storage key.
 * @returns The stored value or null.
 */
export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await localforage.getItem<T>(key)
    return value ?? null
  } catch {
    return null
  }
}

/**
 * Sets a value in offline storage by key.
 * @param key - The storage key.
 * @param value - The value to store.
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  await localforage.setItem<T>(key, value)
}