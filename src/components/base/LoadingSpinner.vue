<template>
  <div 
    class="loading-spinner" 
    :class="[size, { 'with-label': label }]"
    role="status"
    :aria-label="ariaLabel || 'Loading'"
  >
    <svg 
      class="spinner" 
      viewBox="0 0 50 50"
      :class="{ 'low-motion': useReducedMotion }"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
      />
    </svg>

    <span v-if="label" class="label" :class="{ 'sr-only': hideLabel }">
      {{ label }}
    </span>

    <div 
      v-if="showNetworkSpeed" 
      class="network-speed"
      :class="connectionQuality"
    >
      {{ networkSpeedLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

// Props with Ghana-specific defaults
interface Props {
  /** Size of the spinner (small, medium, large) */
  size?: 'sm' | 'md' | 'lg'
  /** Loading text to display */
  label?: string
  /** Hide label visually but keep for screen readers */
  hideLabel?: boolean
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Show network speed indicator */
  showNetworkSpeed?: boolean
}

const { size = 'md', label, hideLabel = false, ariaLabel, showNetworkSpeed = false } = defineProps<Props>()

// Network status integration
const { networkInfo } = useNetworkStatus()

// Prefers reduced motion for battery saving
const useReducedMotion = computed(() => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

// Network speed indicator
const connectionQuality = computed(() => networkInfo.value.connectionQuality)
const networkSpeedLabel = computed(() => {
  switch (networkInfo.value.connectionQuality) {
    case 'poor':
      return 'Slow Connection'
    case 'fair':
      return 'Fair Connection'
    default:
      return ''
  }
})
</script>

<style>
.loading-spinner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  min-width: 3rem;
  padding: 0.5rem;
}

.spinner {
  animation: spinner-rotate 1s linear infinite;
  width: 2.5rem;
  height: 2.5rem;
  color: #1F3A8A;
}

.spinner.low-motion {
  animation-duration: 3s;
}

.sm .spinner {
  width: 1.5rem;
  height: 1.5rem;
}

.md .spinner {
  width: 2.5rem;
  height: 2.5rem;
}

.lg .spinner {
  width: 4rem;
  height: 4rem;
}

.path {
  animation: spinner-dash 1.5s ease-in-out infinite;
}

@keyframes spinner-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.label {
  margin-top: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
}

.network-speed {
  margin-top: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #F3F4F6;
}

.network-speed.poor {
  background-color: #FEF3C7;
  color: #92400E;
}

.network-speed.fair {
  background-color: #DBEAFE;
  color: #1E40AF;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 3s;
  }
  
  .path {
    animation-duration: 2.5s;
  }
}

@media (prefers-color-scheme: dark) {
  .spinner {
    color: #60A5FA;
  }
  
  .label {
    color: #E5E7EB;
  }
  
  .network-speed.poor {
    background-color: #92400E;
    color: #FEF3C7;
  }
  
  .network-speed.fair {
    background-color: #1E40AF;
    color: #DBEAFE;
  }
}
</style>