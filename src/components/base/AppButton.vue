<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[48px] px-4" :class="[
      variantClasses,
      sizeClasses,
      { 
        'opacity-75 cursor-not-allowed': disabled,
        'hover:brightness-110': !disabled
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading State -->
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>

    <!-- Button Content -->
    <span :class="{ 'opacity-0': loading, 'opacity-100': !loading }" class="flex items-center gap-2">
      <slot name="icon-left"></slot>
      <span><slot>{{ text }}</slot></span>
      <slot name="icon-right"></slot>
    </span>

    <!-- Ripple Effect (Touch Feedback) -->
    <span 
      v-if="!disabled && !loading" 
      ref="rippleRef"
      class="absolute rounded-full bg-white/20 pointer-events-none"
      :style="rippleStyle"
    ></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  type: 'button' | 'submit' | 'reset' 
  text?: string
  loading: boolean  // Changed from optional to required with default
  disabled: boolean // Changed from optional to required with default
  onClick?: (event: MouseEvent) => void
}

// Provide non-undefined defaults for all optional props
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  text: '',
  loading: false,
  disabled: false

})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Variant-based classes with Ghana-specific color accessibility
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white focus:ring-primary-500'
    case 'secondary':
      return 'bg-gray-100 text-gray-900 focus:ring-gray-500 border border-gray-300'
    case 'outline':
      return 'bg-transparent border-2 border-primary-600 text-primary-600 focus:ring-primary-500'
    case 'danger':
      return 'bg-red-600 text-white focus:ring-red-500'
    case 'success':
      return 'bg-green-600 text-white focus:ring-green-500'
    default:
      return 'bg-primary-600 text-white focus:ring-primary-500'
  }
})

// Size classes (ensuring touch targets are large enough for mobile)
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm min-h-[40px]'
    case 'lg':
      return 'text-lg min-h-[56px]'
    default:
      return 'text-base min-h-[48px]' // Default size optimized for touch
  }
})

// Touch Ripple Effect
const rippleRef = ref<HTMLSpanElement | null>(null)
const rippleStyle = ref('')
let rippleTimeout: number | null = null

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return

  // Create ripple effect
  if (rippleRef.value) {
    const button = event.currentTarget as HTMLButtonElement
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    rippleStyle.value = `
      width: ${size}px;
      height: ${size}px;
      transform: scale(0);
      top: ${y}px;
      left: ${x}px;
    `

    // Force reflow
    rippleRef.value.offsetHeight

    // Add animation
    rippleStyle.value += 'transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform: scale(2);'

    // Cleanup
    if (rippleTimeout) clearTimeout(rippleTimeout)
    rippleTimeout = window.setTimeout(() => {
      rippleStyle.value = ''
    }, 500)
  }

  emit('click', event)
}
</script>

<style scoped>
button {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

/* High-contrast focus styles for accessibility */
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Active state feedback for touch devices */
@media (hover: none) {
  button:active {
    transform: scale(0.98);
  }
}
</style>