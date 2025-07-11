<template>
  <div class="p-4">
    <div class="bg-white rounded-lg shadow-sm border p-4 max-w-sm mx-auto" 
         :class="borderColorClass">
      <!-- Connection Quality Gauge -->
      <div class="relative flex flex-col items-center">
        <svg class="w-32 h-32" viewBox="0 0 120 120">
          <!-- Gauge background -->
          <path
            class="gauge-background"
            d="M40,90 A40,40 0 1,1 80,90"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="8"
          />
          <!-- Gauge value -->
          <path
            class="gauge-value transition-all duration-300 ease-in-out"
            :d="gaugeValuePath"
            fill="none"
            :stroke="qualityColor"
            stroke-width="8"
            :style="{ strokeDasharray: `${gaugePercent}, 100` }"
          />
          <!-- Quality Icon -->
          <g :transform="`translate(${iconPosition.x}, ${iconPosition.y})`">
            <circle
              :fill="qualityColor"
              r="12"
              opacity="0.2"
            />
            <circle
              :fill="qualityColor"
              r="8"
            />
          </g>
        </svg>
        
        <!-- Central Display -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-0 flex flex-col items-center text-center">
          <span class="text-sm font-medium">{{ connectionQualityText }}</span>
          <span class="text-xs opacity-75">{{ formattedSpeed }}</span>
        </div>
      </div>

      <!-- Network Metrics -->
      <div v-if="showDetails" class="mt-4 grid grid-cols-3 gap-4 text-center">
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">Download</span>
          <span class="text-sm font-medium">{{ formattedDownlink }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">Latency</span>
          <span class="text-sm font-medium">{{ formattedLatency }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">Type</span>
          <span class="text-sm font-medium">{{ effectiveTypeDisplay }}</span>
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="showRecommendations" class="mt-4 text-center">
        <p class="text-sm text-gray-600">{{ recommendationText }}</p>
        <button 
          v-if="showOptimizeButton"
          @click="$emit('optimize')" 
          class="mt-2 px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Optimize for Current Network
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNetworkStatus } from '../../composables/useNetworkStatus'

interface Props {
  showDetails?: boolean
  showRecommendations?: boolean
  showOptimizeButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showDetails: false,
  showRecommendations: false,
  showOptimizeButton: false
})

defineEmits<{
  (e: 'optimize'): void
}>()

const { networkInfo } = useNetworkStatus()

// Store connection quality for easier access
const networkQuality = computed(() => networkInfo.value.connectionQuality)

// Format effective type for display
const effectiveTypeDisplay = computed(() => networkInfo.value.effectiveType.toUpperCase())

// Calculate gauge percentage based on connection quality
const gaugePercent = computed(() => {
  switch (networkQuality.value) {
    case 'excellent': return 100
    case 'good': return 75
    case 'fair': return 50
    case 'poor': return 25
    default: return 0
  }
})

// Generate gauge path (half circle)
const gaugeValuePath = computed(() => {
  return 'M40,90 A40,40 0 1,1 80,90'
})

// Calculate icon position on the gauge
const iconPosition = computed(() => {
  const percent = gaugePercent.value / 100
  const angle = percent * Math.PI
  const x = 60 - Math.cos(angle) * 40
  const y = 90 - Math.sin(angle) * 40
  return { x, y }
})

// Dynamic border color class
const borderColorClass = computed(() => ({
  'border-green-200': networkQuality.value === 'excellent',
  'border-sky-200': networkQuality.value === 'good',
  'border-amber-200': networkQuality.value === 'fair',
  'border-red-200': networkQuality.value === 'poor'
}))

// Determine quality color
const qualityColor = computed(() => {
  switch (networkQuality.value) {
    case 'excellent': return '#059669' // green-600
    case 'good': return '#0284c7'      // sky-600
    case 'fair': return '#d97706'      // amber-600
    case 'poor': return '#dc2626'      // red-600
    default: return '#6b7280'          // gray-500
  }
})

// Format speed for display (adapted for Ghana's typical network speeds)
const formattedSpeed = computed(() => {
  const speed = networkInfo.value.downlink
  if (speed >= 1) {
    return `${speed.toFixed(1)} Mbps`
  }
  return `${(speed * 1000).toFixed(0)} Kbps`
})

// Format downlink speed
const formattedDownlink = computed(() => {
  return `${networkInfo.value.downlink.toFixed(1)} Mbps`
})

// Format latency
const formattedLatency = computed(() => {
  return `${networkInfo.value.rtt}ms`
})

// Connection quality text
const connectionQualityText = computed(() => {
  return networkQuality.value.charAt(0).toUpperCase() + networkQuality.value.slice(1)
})

// Ghana-specific network recommendations
const recommendationText = computed(() => {
  switch (networkQuality.value) {
    case 'poor':
      return 'Consider enabling data saver mode. Videos and images will load in lower quality.'
    case 'fair':
      return 'Network may be unstable. Content will load in optimized quality.'
    case 'good':
      return 'Connection is stable. Most features available at good quality.'
    case 'excellent':
      return 'Great connection! Full access to high-quality content.'
    default:
      return ''
  }
})
</script>

<style scoped>
.gauge-value {
  transition: stroke-dasharray 0.3s ease-in-out;
}
</style>
