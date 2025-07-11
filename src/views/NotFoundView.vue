<script setup lang="ts">
import { useNetworkStatus } from '@/composables/useNetworkStatus'
import { computed } from 'vue'

const { networkInfo } = useNetworkStatus()
const isOnline = computed(() => networkInfo.value.isOnline)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
    <div class="w-full max-w-md text-center">
      <!-- Offline status indicator -->
      <div v-if="!isOnline" class="mb-4">
        <div class="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm">
          <span class="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
          You're currently offline
        </div>
      </div>

      <h1 class="text-6xl font-bold text-primary-600 mb-4">404</h1>
      
      <!-- Fallback emoji for when image fails to load -->
      <div class="text-8xl mb-8 select-none" aria-hidden="true">
        🔍
      </div>
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p class="text-xl text-gray-600 mb-8">
        {{ isOnline 
          ? "The page you're looking for doesn't exist. Please visit our "
          : "You're offline. Please check your connection and visit our "
        }}
        <router-link to="/" class="text-primary-600 hover:text-primary-700 underline">
          homepage
        </router-link>
        {{ isOnline ? " to find what you need." : "." }}
      </p>

      <div class="mt-8 flex justify-center">
        <router-link 
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg 
                 hover:bg-primary-dark transition-colors font-medium
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 touch-target-[48px] min-w-[200px] text-lg"
        >
          Go to Homepage
        </router-link>
      </div>

      <p class="mt-8 text-sm text-gray-500">
        If you think this is a mistake, try refreshing the page when you're back online.
      </p>
    </div>
  </div>
</template>
