import { onCLS, onINP, onLCP, onTTFB, onFCP } from 'web-vitals'
import { useNetworkStatus } from '../composables/useNetworkStatus'

export interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  connection: {
    effectiveType: string
    downlink: number
    rtt: number
    connectionQuality: 'excellent' | 'good' | 'fair' | 'poor'
  }
  device: {
    platform: string
    userAgent: string
    memory?: number
    deviceMemory?: number
  }
  region: string
  offlineCapable: boolean
}

export class WebVitalsService {
  private metrics: WebVitalMetric[] = []
  private static instance: WebVitalsService
  private networkStatus = useNetworkStatus()

  // Ghana-specific thresholds adjusted for local conditions
  private readonly thresholds = {
    CLS: { good: 0.15, poor: 0.3 },    // More lenient for variable connections
    INP: { good: 200, poor: 400 },      // Adjusted for slower devices
    LCP: { good: 3500, poor: 7000 },    // Adapted for 3G/4G mix
    TTFB: { good: 1000, poor: 2500 },   // Realistic for Ghana's infrastructure
    FCP: { good: 2500, poor: 5000 }     // Balanced for varied conditions
  }

  static getInstance() {
    if (!WebVitalsService.instance) {
      WebVitalsService.instance = new WebVitalsService()
    }
    return WebVitalsService.instance
  }

  init() {
    // Collect Core Web Vitals with retry mechanism
    this.initializeMetric('CLS', onCLS)
    this.initializeMetric('INP', onINP)
    this.initializeMetric('LCP', onLCP)
    this.initializeMetric('TTFB', onTTFB)
    this.initializeMetric('FCP', onFCP)

    // Set up offline sync
    window.addEventListener('online', () => this.syncOfflineMetrics())
  }

  private initializeMetric(metricName: string, collector: Function, retries = 3) {
    const attempt = () => {
      try {
        collector((metric: { value: number }) => this.handleMetric(metricName, metric))
      } catch (error) {
        if (retries > 0) {
          setTimeout(() => attempt(), 1000)
          retries--
        }
      }
    }
    attempt()
  }

  private handleMetric(metricName: string, metric: any) {
    const connection = (navigator as any).connection
    const memory = (navigator as any).deviceMemory
    const performanceMemory = (performance as any).memory

    const vitalMetric: WebVitalMetric = {
      name: metricName,
      value: metric.value,
      rating: this.getRating(metricName, metric.value),
      timestamp: Date.now(),
      connection: {
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        connectionQuality: this.networkStatus.networkInfo.value.connectionQuality
      },
      device: {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        memory: performanceMemory?.jsHeapSizeLimit,
        deviceMemory: memory
      },
      region: 'GH',
      offlineCapable: this.checkOfflineCapability()
    }

    this.metrics.push(vitalMetric)
    this.saveMetric(vitalMetric)
  }

  private getRating(metricName: string, value: number): WebVitalMetric['rating'] {
    const metric = this.thresholds[metricName as keyof typeof this.thresholds]
    if (!metric) return 'needs-improvement'

    if (value <= metric.good) return 'good'
    if (value >= metric.poor) return 'poor'
    return 'needs-improvement'
  }

  private async saveMetric(metric: WebVitalMetric) {
    try {
      await this.saveLocally(metric)
      if (navigator.onLine) {
        await this.sendToServer(metric)
      }
    } catch (error) {
      console.error('Failed to save metric:', error)
    }
  }

  private async saveLocally(metric: WebVitalMetric) {
    const storageKey = 'web-vitals-metrics'
    try {
      const stored = localStorage.getItem(storageKey)
      const metrics = stored ? JSON.parse(stored) : []
      metrics.push(metric)
      
      // Keep only last 1000 metrics to manage storage
      if (metrics.length > 1000) {
        metrics.splice(0, metrics.length - 1000)
      }
      
      localStorage.setItem(storageKey, JSON.stringify(metrics))
    } catch (error) {
      console.error('Failed to save metric locally:', error)
    }
  }

  private async sendToServer(metric: WebVitalMetric) {
    // Implement your server sending logic here
    // This is a placeholder for future dashboard integration
    console.debug('Metric ready for server:', metric)
  }

  private async syncOfflineMetrics() {
    const storageKey = 'web-vitals-metrics'
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return

      const metrics = JSON.parse(stored)
      for (const metric of metrics) {
        await this.sendToServer(metric)
      }
    } catch (error) {
      console.error('Failed to sync offline metrics:', error)
    }
  }

  private checkOfflineCapability(): boolean {
    try {
      return (
        'serviceWorker' in navigator &&
        'caches' in window &&
        'localStorage' in window &&
        'indexedDB' in window
      )
    } catch {
      return false
    }
  }

  // Public methods for dashboard integration
  getMetrics(timeframe?: { start: number; end: number }) {
    if (!timeframe) return this.metrics

    return this.metrics.filter(
      metric => 
        metric.timestamp >= timeframe.start && 
        metric.timestamp <= timeframe.end
    )
  }

  getAverages(timeframe?: { start: number; end: number }) {
    const relevantMetrics = this.getMetrics(timeframe)
    const metricsByName: { [key: string]: number[] } = {}

    relevantMetrics.forEach(metric => {
      if (!metricsByName[metric.name]) {
        metricsByName[metric.name] = []
      }
      metricsByName[metric.name].push(metric.value)
    })

    const averages: { [key: string]: number } = {}
    Object.entries(metricsByName).forEach(([name, values]) => {
      averages[name] = values.reduce((a, b) => a + b, 0) / values.length
    })

    return averages
  }

  getPerformanceScore(timeframe?: { start: number; end: number }): number {
    const averages = this.getAverages(timeframe)
    let score = 100

    // Weighted scoring based on Ghana-specific priorities
    if (averages.LCP > this.thresholds.LCP.good) score -= 25  // Higher weight for loading
    if (averages.INP > this.thresholds.INP.good) score -= 25  // Important for mobile
    if (averages.CLS > this.thresholds.CLS.good) score -= 20
    if (averages.TTFB > this.thresholds.TTFB.good) score -= 15
    if (averages.FCP > this.thresholds.FCP.good) score -= 15

    return Math.max(0, score)
  }

  getConnectionQualityStats(timeframe?: { start: number; end: number }) {
    const relevantMetrics = this.getMetrics(timeframe)
    const stats = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0,
      total: relevantMetrics.length
    }

    relevantMetrics.forEach(metric => {
      stats[metric.connection.connectionQuality]++
    })

    return stats
  }
}
