<!--
  StudyDockLogo.vue
  StudyDock brand logo component optimized for mobile-first design.
  - Responsive SVG logo with clean, modern design
  - Supports white/dark color variations
  - Optimized for Ghana's mobile-first audience
-->

<template>
  <div class="studydock-logo">
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      class="w-10 h-10"
      :class="{ 'text-primary': !white, 'text-white': white }"
    >
      <!-- Main Circle representing Ghana's unity -->
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
      
      <!-- 'S' shape representing StudyDock logo -->
      <path
        d="M30 16C30 14 28 12 24 12C20 12 18 14 18 16C18 20 30 20 30 24C30 26 28 28 24 28C20 28 18 26 18 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
      />
      
      <!-- Star representing Ghana's leadership in African tech -->
      <path
        d="M24 32L25.5 35.5L29.5 36L26.75 38.75L27.5 43L24 41L20.5 43L21.25 38.75L18.5 36L22.5 35.5L24 32Z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// ===== Props & Types =====
/**
 * StudyDock Logo component props
 * @param white - Use white color variant (for dark backgrounds)
 */
defineProps<{
  white?: boolean
}>()
</script>

<style scoped>
/* ===== StudyDock Logo Styles ===== */
.studydock-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
