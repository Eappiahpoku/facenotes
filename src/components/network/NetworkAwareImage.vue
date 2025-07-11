<template>
  <div class="network-image-container">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading-state">
      Loading image...
    </div>

    <!-- Main image -->
    <img
      v-show="!isLoading"
      :src="imageSrc"
      :alt="alt"
      class="main-image"
      @load="onLoad"
      @error="onError"
    />

    <!-- Error state -->
    <div v-if="error" class="error-state">
      Failed to load image. Please check your connection.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Simple props
const props = defineProps<{
  src: string
  alt: string
}>()

// Basic state
const isLoading = ref(true)
const error = ref(false)

// Compute image source with basic quality reduction for slow connections
const imageSrc = computed(() => {
  const url = new URL(props.src)
  url.searchParams.set('q', '60') // Reduced quality for Ghana's bandwidth
  return url.toString()
})

// Event handlers
const onLoad = () => {
  isLoading.value = false
}

const onError = () => {
  isLoading.value = false
  error.value = true
}
</script>

<style scoped>
.network-image-container {
  position: relative;
  min-height: 200px;
}

.main-image {
  width: 100%;
  height: auto;
}

.loading-state,
.error-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1rem;
}

.error-state {
  color: #dc2626;
}
</style>
