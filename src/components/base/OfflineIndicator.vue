<template>
  <div v-if="!networkInfo.isOnline || isSlowConnection()" class="offline-indicator" role="status">
    <div class="flex items-center gap-2 p-2 text-sm" :class="indicatorClass">
      <span class="flex-shrink-0">
        <svg v-if="!networkInfo.isOnline" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938-9L12 4.062l6.938 6.938M19 12a7 7 0 01-7 7 7 7 0 01-7-7" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      <span class="flex-1">{{ statusMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNetworkStatus } from '../../composables/useNetworkStatus'

const { networkInfo, isSlowConnection } = useNetworkStatus()

const statusMessage = computed(() => {
  if (!networkInfo.value.isOnline) {
    return "You are currently offline. Your changes will be saved and synced when you're back online."
  }
  if (isSlowConnection()) {
    return 'Slow network detected. Some features may take longer to load.'
  }
  return ''
})

const indicatorClass = computed(() => ({
  'bg-orange-100 text-orange-800': !networkInfo.value.isOnline,
  'bg-yellow-100 text-yellow-800': networkInfo.value.isOnline && isSlowConnection()
}))
</script>

<style scoped>
.offline-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
