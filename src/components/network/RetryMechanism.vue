<template>
  <div class="p-4 rounded-lg bg-white border shadow-sm" :class="{ 'border-red-300 bg-red-50': !networkInfo.isOnline }">
    <div class="flex flex-col gap-4" v-if="showRetry">
      <!-- Error State -->
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 p-2 rounded-full" :class="[
          isOfflineError ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
        ]">
          <svg v-if="isOfflineError" class="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M18.364 5.636L5.636 18.364m12.728 0L5.636 5.636" 
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 0 0 1.75-2.97L13.74 4.36a2 2 0 0 0-3.5 0L3.23 16.03A2 2 0 0 0 5.07 19Z" 
              stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <div class="flex-1">
          <h4 class="text-lg font-medium text-gray-900">{{ errorTitle }}</h4>
          <p class="text-sm text-gray-600">{{ errorDescription }}</p>
        </div>
      </div>

      <!-- Retry Progress -->
      <div v-if="isRetrying" class="space-y-1">
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            class="h-full bg-primary-600 transition-all duration-300"
            :style="{ width: `${retryProgress}%` }"
          ></div>
        </div>
        <span class="text-xs text-gray-500">
          Retrying in {{ retryCountdown }}s...
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <button
          v-if="!isRetrying"
          @click="handleRetry"
          class="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!canRetry"
        >
          Retry Now ({{ attemptsLeft }} attempts left)
        </button>

        <button
          v-if="isRetrying"
          @click="cancelRetry"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>

        <button
          v-if="showOfflineAction && !networkInfo.isOnline"
          @click="$emit('offline-action')"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ offlineActionText }}
        </button>
      </div>

      <!-- Additional Options -->
      <div v-if="showAdditionalOptions" class="flex flex-wrap gap-2 mt-2">
        <button 
          v-if="canUseFallback"
          @click="$emit('use-fallback')" 
          class="px-3 py-1 text-sm border rounded-md border-green-600 text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Use Offline Version
        </button>
        
        <button
          v-if="hasAlternative"
          @click="$emit('use-alternative')"
          class="px-3 py-1 text-sm border rounded-md border-purple-600 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Try Alternative Method
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import { useNetworkStatus } from '../../composables/useNetworkStatus'

const props = withDefaults(defineProps<{
  error?: Error
  maxRetries?: number
  retryDelay?: number
  showOfflineAction?: boolean
  offlineActionText?: string
  canUseFallback?: boolean
  hasAlternative?: boolean
  showAdditionalOptions?: boolean
}>(), {
  maxRetries: 3,
  retryDelay: 5000,
  showOfflineAction: false,
  offlineActionText: 'Work Offline',
  canUseFallback: false,
  hasAlternative: false,
  showAdditionalOptions: false
})

const emit = defineEmits<{
  (e: 'retry'): void
  (e: 'offline-action'): void
  (e: 'use-fallback'): void
  (e: 'use-alternative'): void
}>()

const { networkInfo } = useNetworkStatus()

const retryAttempts = ref(0)
const isRetrying = ref(false)
const retryTimeout = ref<number | null>(null)
const retryCountdown = ref(0)
const showRetry = ref(true)

// Computed properties
const attemptsLeft = computed(() => props.maxRetries - retryAttempts.value)

const canRetry = computed(() => 
  attemptsLeft.value > 0 && networkInfo.value.isOnline
)

const retryProgress = computed(() => 
  ((props.retryDelay) - retryCountdown.value * 1000) / props.retryDelay * 100
)

const isOfflineError = computed(() => 
  !networkInfo.value.isOnline || 
  props.error?.message?.toLowerCase().includes('network') ||
  props.error?.message?.toLowerCase().includes('offline')
)

const errorTitle = computed(() => {
  if (isOfflineError.value) {
    return 'Network Error'
  }
  return 'Operation Failed'
})

const errorDescription = computed(() => {
  if (isOfflineError.value) {
    return 'Please check your internet connection and try again.'
  }
  return props.error?.message || 'An error occurred while processing your request.'
})

// Methods
const startRetryCountdown = () => {
  isRetrying.value = true
  retryCountdown.value = props.retryDelay / 1000

  const countDown = () => {
    retryCountdown.value--
    if (retryCountdown.value <= 0) {
      handleRetry()
    } else {
      retryTimeout.value = window.setTimeout(countDown, 1000)
    }
  }

  retryTimeout.value = window.setTimeout(countDown, 1000)
}

const handleRetry = () => {
  if (!canRetry.value) return

  retryAttempts.value++
  cancelRetry()
  emit('retry')

  if (!networkInfo.value.isOnline) {
    startRetryCountdown()
  }
}

const cancelRetry = () => {
  isRetrying.value = false
  if (retryTimeout.value !== null) {
    clearTimeout(retryTimeout.value)
    retryTimeout.value = null
  }
}

// Watch for network changes
const stopNetworkWatch = watchEffect(() => {
  if (networkInfo.value.isOnline && isRetrying.value) {
    handleRetry()
  }
})

onMounted(() => {
  if (!networkInfo.value.isOnline) {
    startRetryCountdown()
  }

  // Watch for online status changes
  window.addEventListener('online', handleRetry)
})

onUnmounted(() => {
  cancelRetry()
  window.removeEventListener('online', handleRetry)
  stopNetworkWatch()
})
</script>
