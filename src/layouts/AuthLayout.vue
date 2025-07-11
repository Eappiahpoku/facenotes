<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header with StudyDock Logo -->
    <header class="flex items-center justify-between px-4 py-3 bg-primary-600 shadow-sm">
      <div class="flex items-center space-x-2">
        <!-- Logo placeholder - replace with actual logo -->
        <StudyDockLogo white />
        <span class="text-lg font-semibold text-white">
          {{ appName }}
        </span>
      </div>
      <!-- Network Status Indicator -->
      <OfflineIndicator v-if="!isOnline" class="ml-auto" />
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <!-- Auth Content (Login/Register forms will be rendered here) -->
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in" appear>
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
  // ===== Imports =====
  import { computed } from 'vue'
  import { useNetworkStatus } from '@/composables/useNetworkStatus.ts'
  import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
  import StudyDockLogo from '@/components/base/StudyDockLogo.vue'
  import Footer from '@/components/common/Footer.vue'

  // ===== Constants & Config =====
  const appName = 'StudyDock Auth' // Change this based on your app name

  // ===== Composables =====
  const { networkInfo } = useNetworkStatus()

  // ===== Computed Properties =====
  const isOnline = computed(() => networkInfo.value.isOnline)
</script>

<style scoped>
  /* Transition Animations */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Mobile-first styles */
  @media (max-width: 640px) {
    .max-w-md {
      max-width: 100%;
    }
  }
</style>
