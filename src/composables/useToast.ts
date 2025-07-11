/**
 * useToast.ts
 * StudyDock Notes App - Toast Notification Composable
 * ---------------------------------------------------
 * - Provides simple toast notifications for user feedback.
 * - Ghana mobile-first: clear, concise, and accessible messages.
 * - Wraps vue-toastification for consistent usage across the app.
 * - All toast messages should use simple English for clarity.
 */

// ===== Imports =====
import { useToast as useVueToast } from 'vue-toastification'

// ===== Main Logic =====

/**
 * useToast composable
 * - Returns functions for showing success, error, info, and warning toasts.
 * - All messages should be clear and actionable for Ghanaian users.
 */
export function useToast() {
  // Get the toast instance from vue-toastification
  const toast = useVueToast()

  // Return toast functions for different message types
  return {
    /**
     * Show a success toast
     * @param message - Message to display (simple English)
     */
    success: (message: string) => toast.success(message),

    /**
     * Show an error toast
     * @param message - Message to display (simple English)
     */
    error: (message: string) => toast.error(message),

    /**
     * Show an info toast
     * @param message - Message to display (simple English)
     */
    info: (message: string) => toast.info(message),

    /**
     * Show a warning toast
     * @param message - Message to display (simple English)
     */
    warning: (message: string) => toast.warning(message)
  }
}

/*
  ===== Educational Notes =====
  - All toast messages should be short, clear, and use simple English.
  - Use for user feedback, errors, and confirmations.
  - In future, customize toast appearance for Ghana mobile-first UX.
*/