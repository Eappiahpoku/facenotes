<!--
  StudyDockLogo.vue
  StudyDock brand logo component optimized for mobile-first design.
  - Responsive SVG logo with clean, modern design
  - Supports white/dark color variations
  - Optimized for Ghana's mobile-first audience
-->

<template>
  <div class="studydock-logo">
    <!--
  StudyDock Favicon SVG
  - Optimized for favicon use (simple, solid color, no dynamic props)
  - Ghana mobile-first, offline-first, and accessible
-->
<svg
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
  width="48"
  height="48"
  fill="none"
>
  <!-- Main Circle representing Ghana's unity -->
  <circle cx="24" cy="24" r="22" fill="white" stroke="#2C7865" stroke-width="2"/>
  <!-- 'S' shape representing StudyDock logo -->
  <path
    d="M30 16C30 14 28 12 24 12C20 12 18 14 18 16C18 20 30 20 30 24C30 26 28 28 24 28C20 28 18 26 18 24"
    fill="none"
    stroke="#2C7865"
    stroke-width="3"
    stroke-linecap="round"
  />
  <!-- ===== [New Feature] START: Book icon representing education ===== -->
  <!-- Book representing StudyDock's educational mission -->
  <g fill="#2C7865">
    <!-- Book cover -->
    <rect x="18" y="32" width="12" height="9" rx="1" fill="#2C7865"/>
    <!-- Book pages -->
    <rect x="19" y="33" width="10" height="7" fill="white"/>
    <!-- Book spine line -->
    <line x1="24" y1="33" x2="24" y2="40" stroke="#2C7865" stroke-width="0.5"/>
    <!-- Page lines -->
    <line x1="20" y1="35" x2="28" y2="35" stroke="#2C7865" stroke-width="0.3"/>
    <line x1="20" y1="37" x2="28" y2="37" stroke="#2C7865" stroke-width="0.3"/>
    <line x1="20" y1="39" x2="28" y2="39" stroke="#2C7865" stroke-width="0.3"/>
  </g>
  <!-- ===== [New Feature] END: Book icon representing education ===== -->
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
