<template>
  <div v-if="shouldShowWarning" class="fixed bottom-0 left-0 right-0 p-4 z-50 bg-white border-t shadow-lg" role="alert">
    <div class="flex items-start gap-4 max-w-3xl mx-auto" :class="severityClassStyles">
      <div class="flex-shrink-0">
        <svg v-if="isHighUsage" class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 9v2m0 4h.01m-6.938-9L12 4.062l6.938 6.938M19 12a7 7 0 01-7 7 7 7 0 01-7-7" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <div class="flex-1">
        <h4 class="text-lg font-semibold mb-1">{{ title }}</h4>
        <p class="text-sm opacity-90">{{ message }}</p>
        
        <div v-if="showDataStats" class="mt-2 grid grid-cols-2 gap-4 text-sm">
          <div class="flex flex-col">
            <span class="font-medium">Current Session:</span>
            <span class="text-lg">{{ formatBytes(sessionData) }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">Estimated Cost:</span>
            <span class="text-lg">GHS {{ estimatedCost }}</span>
          </div>
        </div>

        <div class="mt-4 flex gap-2">
          <button 
            v-if="showDataSaverOption" 
            @click="enableDataSaver" 
            class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Enable Data Saver
          </button>
          <button 
            v-if="showDismiss" 
            @click="dismiss" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNetworkStatus } from '../../composables/useNetworkStatus'

interface Props {
  sessionData?: number // bytes transferred in current session
  threshold?: number // bytes threshold for warning
  showDataStats?: boolean
  showDataSaverOption?: boolean
  showDismiss?: boolean
  estimatedCostPerMB?: number // cost in GHS per MB
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 5 * 1024 * 1024, // 5MB default
  showDataStats: true,
  showDataSaverOption: true,
  showDismiss: true,
  estimatedCostPerMB: 0.05 // Default cost per MB in GHS
})

const emit = defineEmits<{
  (e: 'enable-data-saver'): void
  (e: 'dismissed'): void
}>()

const { networkInfo, shouldReduceDataUsage } = useNetworkStatus()
const dismissed = ref(false)

const isHighUsage = computed(() => 
  props.sessionData ? props.sessionData > props.threshold : false
)

const shouldShowWarning = computed(() => {
  if (dismissed.value) return false
  return isHighUsage.value || shouldReduceDataUsage()
})

type SeverityType = 'high-usage' | 'metered-connection' | 'slow-connection' | 'normal'

const severityType = computed((): SeverityType => {
  if (isHighUsage.value) return 'high-usage'
  if (networkInfo.value.isMetered) return 'metered-connection'
  if (networkInfo.value.connectionQuality === 'poor') return 'slow-connection'
  return 'normal'
})

const severityClassStyles = computed(() => {
  switch (severityType.value) {
    case 'high-usage':
      return 'text-red-800 bg-red-50 p-4 rounded-lg'
    case 'metered-connection':
      return 'text-yellow-800 bg-yellow-50 p-4 rounded-lg'
    case 'slow-connection':
      return 'text-blue-800 bg-blue-50 p-4 rounded-lg'
    default:
      return ''
  }
})

const title = computed(() => {
  if (isHighUsage.value) return 'High Data Usage Warning'
  if (networkInfo.value.isMetered) return 'Metered Connection Detected'
  if (networkInfo.value.connectionQuality === 'poor') return 'Slow Connection Detected'
  return 'Data Usage Information'
})

const message = computed(() => {
  if (isHighUsage.value) {
    return 'You have used a significant amount of data. Consider enabling data saver mode.'
  }
  if (networkInfo.value.isMetered) {
    return 'You are on a metered connection. Data charges may apply.'
  }
  if (networkInfo.value.connectionQuality === 'poor') {
    return 'Your connection is slow. Loading times may be increased.'
  }
  return 'Monitor your data usage to avoid high costs.'
})

const estimatedCost = computed(() => {
  if (!props.sessionData || !props.estimatedCostPerMB) return '0.00'
  const mbUsed = props.sessionData / (1024 * 1024)
  return (mbUsed * props.estimatedCostPerMB).toFixed(2)
})

const formatBytes = (bytes: number | undefined): string => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

const enableDataSaver = () => {
  emit('enable-data-saver')
}

const dismiss = () => {
  dismissed.value = true
  emit('dismissed')
}
</script>
