<script setup lang="ts">
import PWAUpdateNotification from '@/components/pwa tools/PWAUpdateNotification.vue'
// App.vue now just needs to render the layout system
</script>

<template>
  <router-view />
  <PWAUpdateNotification />
</template>
