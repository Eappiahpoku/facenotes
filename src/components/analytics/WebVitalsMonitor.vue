<template>
  <div class="web-vitals-monitor p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 flex items-center justify-between">
      Performance Monitor
      <span v-if="!isOnline" class="text-sm text-orange-600 font-normal">
        Offline Mode
      </span>
    </h2>
    
    <!-- Network Status Bar -->
    <div class="mb-6 p-3 rounded-lg" :class="networkStatusColor">
      <div class="flex justify-between items-center">
        <span class="font-medium text-white">
          {{ connectionQuality }}
        </span>
        <span class="text-sm text-white/90">
          {{ networkType }}
        </span>
      </div>
    </div>

    <!-- Performance Score -->
    <div class="mb-6">
      <h3 class="text-lg font-medium mb-2 flex items-center gap-2">
        Overall Score
        <span v-if="offlineCapable" class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
          Offline Ready
        </span>
      </h3>
      <div class="flex items-center gap-4">
        <div class="text-3xl font-bold" :class="scoreColor">
          {{ Math.round(performanceScore) }}%
        </div>
        <div class="text-sm text-gray-600">
          {{ getScoreMessage(performanceScore) }}
        </div>
      </div>
    </div>

    <!-- Latest Metrics -->
    <div>
      <h3 class="text-lg font-medium mb-2">Latest Metrics</h3>
      <div class="space-y-2">
        <div v-for="metric in latestMetrics" 
             :key="metric.timestamp" 
             class="p-3 rounded-lg transition-colors"
             :class="getMetricBackgroundColor(metric.rating)">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-medium">{{ getMetricDisplayName(metric.name) }}</span>
              <p class="text-sm text-gray-600 mt-1">
                {{ getMetricDescription(metric.name) }}
              </p>
            </div>
            <div class="text-right">
              <span :class="getMetricValueColor(metric.rating)" class="font-semibold">
                {{ formatMetricValue(metric) }}
              </span>
              <p class="text-xs text-gray-500 mt-1">
                {{ getMetricRating(metric.rating) }}
              </p>
            </div>
          </div>
          <div class="mt-2 pt-2 border-t border-gray-200/50 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Network: {{ metric.connection.effectiveType }}</span>
              <span>RTT: {{ metric.connection.rtt }}ms</span>
              <span>Downlink: {{ formatDownlink(metric.connection.downlink) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <h3 class="text-sm font-medium text-gray-600 mb-3">Quick Actions</h3>
      <div class="flex gap-2">
        <button
          @click="enableDataSaving"
          class="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
        >
          Enable Data Saving
        </button>
        <button
          @click="syncNow"
          :disabled="!isOnline"
          class="px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sync Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { WebVitalsService, type WebVitalMetric } from '@/services/WebVitalsService.ts'
import { useNetworkStatus } from '@/composables/useNetworkStatus.ts'

const webVitals = WebVitalsService.getInstance()
const networkStatus = useNetworkStatus()
const metrics = ref<WebVitalMetric[]>([])
const performanceScore = ref(0)

// Constants for Ghana-specific thresholds
const NETWORK_QUALITY_COLORS = {
  excellent: 'bg-green-600',
  good: 'bg-blue-600',
  fair: 'bg-yellow-600',
  poor: 'bg-red-600'
}

const METRIC_DISPLAY_NAMES = {
  LCP: 'Largest Contentful Paint',
  FID: 'First Input Delay',
  CLS: 'Cumulative Layout Shift',
  TTFB: 'Time to First Byte',
  FCP: 'First Contentful Paint'
}

const METRIC_DESCRIPTIONS = {
  LCP: 'Time to load and render the main content',
  FID: 'Time until the page responds to user input',
  CLS: 'Visual stability of the page',
  TTFB: 'Time to receive the first byte of content',
  FCP: 'Time until the first content appears'
}

// Reactive state
const isOnline = computed(() => networkStatus.networkInfo.value.isOnline)
const connectionQuality = computed(() => networkStatus.networkInfo.value.connectionQuality)
const networkType = computed(() => networkStatus.networkInfo.value.connectionType)
const offlineCapable = ref(true) // Simplified for demo

// Network status styling
const networkStatusColor = computed(() => 
  NETWORK_QUALITY_COLORS[connectionQuality.value as keyof typeof NETWORK_QUALITY_COLORS] || 'bg-gray-600'
)

// Format and display functions
function getMetricDisplayName(name: string): string {
  return METRIC_DISPLAY_NAMES[name as keyof typeof METRIC_DISPLAY_NAMES] || name
}

function getMetricDescription(name: string): string {
  return METRIC_DESCRIPTIONS[name as keyof typeof METRIC_DESCRIPTIONS] || ''
}

function getMetricBackgroundColor(rating: WebVitalMetric['rating']): string {
  switch (rating) {
    case 'good': return 'bg-green-50'
    case 'needs-improvement': return 'bg-yellow-50'
    case 'poor': return 'bg-red-50'
    default: return 'bg-gray-50'
  }
}

function getMetricValueColor(rating: WebVitalMetric['rating']): string {
  switch (rating) {
    case 'good': return 'text-green-700'
    case 'needs-improvement': return 'text-yellow-700'
    case 'poor': return 'text-red-700'
    default: return 'text-gray-700'
  }
}

function formatMetricValue(metric: WebVitalMetric): string {
  if (metric.name === 'CLS') {
    return metric.value.toFixed(3)
  }
  return `${Math.round(metric.value)}ms`
}

function formatDownlink(downlink: number): string {
  return `${downlink.toFixed(1)} Mbps`
}

function getMetricRating(rating: WebVitalMetric['rating']): string {
  switch (rating) {
    case 'good': return 'Good'
    case 'needs-improvement': return 'Needs Improvement'
    case 'poor': return 'Poor'
    default: return 'Unknown'
  }
}

function getScoreMessage(score: number): string {
  if (score >= 90) return 'Excellent performance'
  if (score >= 70) return 'Good, but can improve'
  if (score >= 50) return 'Needs improvement'
  return 'Poor performance'
}

// Actions
async function enableDataSaving() {
  // TODO: Implement data saving mode
  console.log('Enabling data saving mode...')
}

function syncNow() {
  if (!isOnline.value) return
  updateMetrics()
  // Note: Removed direct call to syncOfflineMetrics as it's handled internally by WebVitalsService
}

// Latest metrics computed property
const latestMetrics = computed(() => {
  return metrics.value
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)
})

// Update metrics periodically
onMounted(() => {
  webVitals.init()
  updateMetrics()
  const interval = setInterval(updateMetrics, 30000) // Every 30 seconds
  
  // Cleanup
  onUnmounted(() => {
    clearInterval(interval)
  })
})

function updateMetrics() {
  // Get metrics from the last 5 minutes
  const timeframe = {
    start: Date.now() - 5 * 60 * 1000,
    end: Date.now()
  }
  metrics.value = webVitals.getMetrics(timeframe)
  performanceScore.value = webVitals.getPerformanceScore(timeframe)
}

// Score styling
const scoreColor = computed(() => {
  if (performanceScore.value >= 90) return 'text-green-600'
  if (performanceScore.value >= 70) return 'text-yellow-600'
  return 'text-red-600'
})
</script>
