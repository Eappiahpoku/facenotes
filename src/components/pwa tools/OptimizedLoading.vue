<template>
  <div class="flex flex-col items-center justify-center p-4" :class="{ 'animate-pulse-slow': isSlowConn }">
    <!-- Main Loading Indicator -->
    <div class="flex flex-col items-center gap-3" :class="[
      props.size === 'sm' && 'scale-75',
      props.size === 'lg' && 'scale-125'
    ]">
      <!-- Spinner with dynamic color based on network speed -->
      <svg
        class="animate-spin"
        :class="[
          props.size === 'sm' ? 'w-6 h-6' : props.size === 'lg' ? 'w-12 h-12' : 'w-8 h-8',
          spinnerClass
        ]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      <!-- Loading Text -->
      <div class="text-center" v-if="showText">
        <p class="text-sm font-medium text-gray-900">{{ loadingText }}</p>
        <p v-if="showSubtext" class="text-xs text-gray-500">{{ subText }}</p>
      </div>

      <!-- Progress Bar for Slow Connections -->
      <div v-if="isSlowConn && showProgress" class="w-full max-w-xs mt-2">
        <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            class="h-full bg-primary-600 transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <span class="text-xs text-gray-500 mt-1">{{ progress }}%</span>
      </div>

      <!-- Retry Button -->
      <button
        v-if="showRetry"
        @click="$emit('retry')"
        class="mt-4 px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        
        
      >
        <span v-if="!isRetrying">Try Again</span>
        <span v-else>Retrying...</span>
      </button>

      <!-- Slow Connection Message -->
      <div v-if="isSlowConn && showSlowConnectionMessage" class="mt-4 text-center text-sm text-gray-600">
        <p>Slow connection detected. Please wait...</p>
        <button 
          v-if="allowLowQuality" 
          @click="$emit('use-low-quality')"
          class="mt-2 px-3 py-1 text-xs text-primary-600 border border-primary-600 rounded hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Load Low Quality Version
        </button>
      </div>
    </div>

    <!-- Skeleton Loading for Slow Connections -->
    <div v-if="isSlowConn && useSkeleton" class="w-full max-w-md mt-6">
      <slot name="skeleton">
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  showSubtext?: boolean
  showProgress?: boolean
  showRetry?: boolean
  isRetrying?: boolean
  progress?: number
  useSkeleton?: boolean
  allowLowQuality?: boolean
  showSlowConnectionMessage?: boolean
  customLoadingText?: string
}>()

defineEmits<{
  (e: 'retry'): void
  (e: 'use-low-quality'): void
}>()

const { networkInfo, isSlowConnection } = useNetworkStatus()

// Computed property for slow connection status
const isSlowConn = computed(() => isSlowConnection())

// Spinner color class based on connection speed
const spinnerClass = computed(() => ({
  'text-primary-600': networkInfo.value.connectionQuality === 'excellent',
  'text-sky-600': networkInfo.value.connectionQuality === 'good',
  'text-amber-600': networkInfo.value.connectionQuality === 'fair',
  'text-red-600': networkInfo.value.connectionQuality === 'poor'
}))

// Loading text based on network condition
const loadingText = computed(() => {
  if (props.customLoadingText) return props.customLoadingText
  
  if (isSlowConn.value) {
    return 'Loading slowly...'
  }
  return 'Loading...'
})

// Subtext with network info
const subText = computed(() => {
  if (isSlowConn.value) {
    return `${networkInfo.value.effectiveType.toUpperCase()} connection detected`
  }
  return ''
})
</script>

<style scoped>
/* Only keeping the slow pulse animation since it can't be done with Tailwind */
@keyframes slowPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse-slow {
  animation: slowPulse 2s infinite;
}
</style>
