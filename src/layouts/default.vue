<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!networkInfo.isOnline" />

  
<Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
<Footer />
    
  </div>
</template>

<script setup lang="ts">


  //== To Always See and Edit Donation Control ==//
  // const showDonation = ref(true)

  //== To Always See and Edit Donation Control ==//


 // ===== File-Level Imports =====
  import { useNetworkStatus } from '@/composables/useNetworkStatus'

  import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
import Navigation from '@/components/common/Navigation.vue';
import Footer from '@/components/common/Footer.vue';
 

 

  
  // Get network info for offline indicator
  const { networkInfo } = useNetworkStatus()
</script>

<style>
  /* Add any additional global styles here */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>