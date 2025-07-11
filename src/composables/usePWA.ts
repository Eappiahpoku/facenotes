import { ref } from 'vue'
import type { Ref } from 'vue'

interface PWAState {
  offlineReady: Ref<boolean>
  needRefresh: Ref<boolean>
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  isRegistered: Ref<boolean>
  registration: Ref<ServiceWorkerRegistration | null>
}

export function usePWA(): PWAState {
  const offlineReady = ref(false)
  const needRefresh = ref(false)
  const isRegistered = ref(false)
  const registration = ref<ServiceWorkerRegistration | null>(null)

  const updateServiceWorker = async (reloadPage = true) => {
    try {
      if (registration.value) {
        await registration.value.update()
        if (reloadPage) window.location.reload()
      }
    } catch (error) {
      console.error('Failed to update service worker:', error)
    }
  }

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        registration.value = await navigator.serviceWorker.register('/sw.js')
        isRegistered.value = true
        
        registration.value.addEventListener('controllerchange', () => {
          needRefresh.value = true
        })

        if (registration.value.active) {
          offlineReady.value = true
        }
      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    })
  }

  return {
    offlineReady,
    needRefresh,
    updateServiceWorker,
    isRegistered,
    registration
  }
}
