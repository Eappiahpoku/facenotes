/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:generated-layouts' {
  export function setupLayouts(routes: any): any
}

declare module '~pages' {
  const routes: any
  export default routes
}

declare module 'virtual:generated-pages' {
  const routes: any
  export default routes
}

declare module 'virtual:pwa-register/vue' {
  import type { Ref } from 'vue'
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types'

  export type { RegisterSWOptions }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: Ref<boolean>
    offlineReady: Ref<boolean>
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}
