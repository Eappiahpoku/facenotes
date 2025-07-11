<template>
  <div class="error-boundary">
    <!-- Show error state if there's an error -->
    <div v-if="error" class="error-container">
      <div class="error-content">
        <!-- Network error specific UI -->
        <div v-if="isNetworkError" class="network-error">
          <div class="icon-container">
            <!-- Network error icon -->
            <svg class="h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-900">Network Issue</h2>
          <p class="mt-2 text-base text-gray-600">
            Unable to connect to the internet. Your work is safely saved.
          </p>
          <div class="mt-4 flex gap-3">
            <app-button variant="primary"  type="button" :disabled="false" @click="retry" :loading="isRetrying">
              Try Again
            </app-button>
            <app-button   type="button"  :disabled="false"  :loading="false" variant="secondary" @click="workOffline">
              Work Offline
            </app-button>
          </div>
        </div>

        <!-- Generic error UI -->
        <div v-else class="generic-error">
          <div class="icon-container">
            <svg class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p class="mt-2 text-base text-gray-600">
            {{ getSimpleErrorMessage }}
          </p>
          <div class="mt-4">
            <app-button variant="primary" type="button" :disabled="false"  @click="retry" :loading="isRetrying">
              Try Again
            </app-button>
          </div>
        </div>

        <!-- Debug info (only in development) -->
        <div v-if="isDev" class="mt-4 text-left">
          <details class="debug-info">
            <summary class="text-sm text-gray-600 cursor-pointer">Technical Details</summary>
            <pre class="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">{{ error.stack }}</pre>
          </details>
        </div>
      </div>
    </div>

    <!-- Render default content if no error -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured, watch } from 'vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import AppButton from '../base/AppButton.vue'

// Props
const props = defineProps<{
  /** ID of the error boundary for tracking purposes */
  id?: string
}>()

const emit = defineEmits<{
  (e: 'offline-mode'): void
}>()
// Error state
const error = ref<Error | null>(null)
const isRetrying = ref(false)

// Network status integration
const { networkInfo } = useNetworkStatus()
const isOnline = computed(() => networkInfo.value.isOnline)
const connectionQuality = computed(() => networkInfo.value.connectionQuality)

// Watch for online status to auto-retry
watch(isOnline, (online: boolean) => {
  if (online && error.value && isNetworkError.value) {
    retry()
  }
})

// Computed
const isDev = computed(() => import.meta.env.MODE === 'development')
const isNetworkError = computed(() => {
  if (!error.value) return false
  if (!isOnline.value) return true
  
  // Check for common network-related errors
  return (
    error.value instanceof TypeError ||
    error.value.message.toLowerCase().includes('network') ||
    error.value.message.toLowerCase().includes('fetch') ||
    error.value.message.toLowerCase().includes('connection') ||
    error.value.message.toLowerCase().includes('timeout') ||
    // Check for poor connection quality
    (!isOnline.value || connectionQuality.value === 'poor')
  )
})

const getSimpleErrorMessage = computed(() => {
  if (!error.value) return 'An unknown error occurred'

  // Check connection quality first
  if (!isOnline.value) {
    return 'You are offline. Your work is safely saved and will sync when you\'re back online.'
  }
  if (['poor', 'fair'].includes(connectionQuality.value)) {
    return 'Your internet connection is weak. The app will work slower but your data is safe.'
  }
  
  // Convert technical error messages to simple, clear language
  const message = error.value.message.toLowerCase()
  
  if (message.includes('network') || message.includes('fetch')) {
    return networkInfo.value.isMetered 
      ? 'Network error. Switch to Wi-Fi if available to save data costs.'
      : 'Unable to connect to the internet. Please check your connection.'
  }
  if (message.includes('timeout')) {
    return ['poor', 'fair'].includes(connectionQuality.value)
      ? 'The connection is very slow. Try again or switch to offline mode.'
      : 'The request is taking too long. Please try again.'
  }
  if (message.includes('not found')) {
    return 'We could not find what you were looking for. Check if it was deleted or moved.'
  }
  
  // Default to a generic, friendly message
  return 'Something went wrong. Your work is safe and you can try again.'
})

// Error handling
onErrorCaptured((err) => {
  console.error(`[ErrorBoundary ${props.id || ''}]:`, err)
  error.value = err as Error
  // Prevent error from propagating
  return false
})

// Actions
const retry = async () => {
  isRetrying.value = true
  try {
    error.value = null
    // Wait a moment to allow potential network recovery
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (err) {
    error.value = err as Error
  } finally {
    isRetrying.value = false
  }
}

const workOffline = () => {
  // Clear the error to show the offline content
  error.value = null
  // Emit event for parent components to handle offline mode
  emit('offline-mode')
}

</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 1.5rem;
}

.error-content {
  text-align: center;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  padding: 1.5rem;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.debug-info {
  margin-top: 1.5rem;
  text-align: left;
  border-top: 1px solid theme('colors.gray.200');
  padding-top: 1rem;
}

.debug-info summary {
  font-size: 0.875rem;
  color: theme('colors.gray.600');
  cursor: pointer;
  transition: color 0.2s;
}

.debug-info summary:hover {
  color: theme('colors.gray.900');
}

/* Touch-friendly styling for mobile */
.error-content button {
  min-height: 48px;
  min-width: 48px;
}

/* Network error specific styling */
.network-error {
  color: theme('colors.amber.700');
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .error-content {
    background-color: theme('colors.gray.800');
    color: white;
  }
  
  .debug-info {
    border-color: theme('colors.gray.700');
  }
  
  .debug-info pre {
    background-color: theme('colors.gray.900');
    color: theme('colors.gray.300');
  }

  .debug-info summary:hover {
    color: theme('colors.gray.100');
  }
}

/* High contrast mode */
@media (prefers-contrast: more) {
  .error-content {
    border: 2px solid currentColor;
  }

  .debug-info {
    border-width: 2px;
  }
}

/* Animation for content */
.error-content {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


