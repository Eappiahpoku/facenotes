<template>
  <div class="error-layout flex flex-col" :class="rootClasses" role="document">
    <!-- Header with app logo/name -->
    <header class="bg-primary-600 shadow-sm py-4" role="banner">
      <div class="container mx-auto px-4">
        <router-link
          to="/"
          class="flex items-center gap-2 router-link"
          aria-label="Return to StudyDock homepage"
        >
          <!-- <img 
            src="/icons/icon-96x96.png" 
            alt="StudyDock Logo" 
            class="w-8 h-8"
            loading="eager"
            width="32"
            height="32"
          /> -->
          <StudyDockLogo white />
          <span class="text-lg font-semibold text-white">StudyDock</span>
        </router-link>
      </div>
    </header>

    <!-- Main content area -->
    <main class="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <div class="max-w-lg w-full text-center">
        <!-- Error content slot -->
        <slot></slot>

        <!-- Default back to home button -->
        <div class="mt-8">
          <router-link
            to="/"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </main>

    <!-- Offline indicator -->
    <OfflineIndicator />
  </div>
</template>

<script setup lang="ts">
  import StudyDockLogo from '@/components/base/StudyDockLogo.vue'
  import OfflineIndicator from '../components/base/OfflineIndicator.vue'
  import { useNetworkStatus } from '@/composables/useNetworkStatus.ts'
  import { computed } from 'vue'

  // Network status integration for offline mode
  const { networkInfo } = useNetworkStatus()
  const isOffline = computed(() => !networkInfo.value.isOnline)
  const connectionQuality = computed(() => networkInfo.value.connectionQuality)

  // Add network status classes to root element
  const rootClasses = computed(() => ({
    'is-offline': isOffline.value,
    [`connection-${connectionQuality.value}`]: true
  }))
</script>

<style scoped>
  .error-layout {
    background-color: theme('colors.gray.50');
    min-height: 100vh;
  }

  .header {
    background-color: white;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 1rem 0;
  }

  .container {
    width: 100%;
    max-width: theme('maxWidth.7xl');
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .router-link {
    transition: color 0.2s;
  }

  .router-link:hover {
    color: theme('colors.primary.DEFAULT');
  }

  .router-link:focus {
    outline: 2px solid theme('colors.primary.DEFAULT');
    outline-offset: 2px;
  }

  /* Mobile Optimizations */
  @media (max-width: 640px) {
    .router-link {
      min-height: 48px;
      display: flex;
      align-items: center;
    }
  }

  /* Dark Mode */
  @media (prefers-color-scheme: dark) {
    .error-layout {
      background-color: theme('colors.gray.900');
    }

    .header {
      background-color: theme('colors.gray.800');
      border-color: theme('colors.gray.700');
    }

    .router-link:hover {
      color: theme('colors.primary.500');
    }
  }

  /* Network Status Indicators */
  .is-offline .content {
    border: 2px solid theme('colors.amber.500');
  }

  .connection-poor .content {
    background-color: theme('colors.amber.50');
  }

  /* High Contrast Mode */
  @media (prefers-contrast: more) {
    .router-link {
      color: black;
      outline-width: 3px;
    }

    :is([data-theme='dark']) .router-link {
      color: white;
    }

    .back-button {
      background-color: theme('colors.blue.800');
      border: 2px solid theme('colors.blue.200');
    }
  }
</style>
