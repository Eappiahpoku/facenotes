<!--
  Header.vue
  StudyDock app header pattern for Pomodoro Timer.
  - Left: StudyDock logo (SVG)
  - Center: App name centered
  - Right: Settings gear icon (clickable to open settings)
  - Mobile-first, accessible, and responsive alignment.
  - All styling via Tailwind utility classes.
-->

<template>
  <!-- ===== [RESPONSIVE HEADER ALIGNMENT] START ===== -->
  <header class="flex items-center justify-between w-full max-w-lg mx-auto px-4 py-3 bg-primary text-white rounded-xl shadow mb-6">
    <!-- Left: StudyDock Logo (SVG) -->
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

    <!-- Center: App Name (Perfectly Centered) -->
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <span class="text-lg font-bold tracking-wide">StudyDock Notes</span>
    </div>

    </header>
  <!-- ===== [RESPONSIVE HEADER ALIGNMENT] END ===== -->
</template>

<script setup lang="ts">
</script>

<!--
  Styling uses Tailwind utility classes for:
  - Perfect center alignment using absolute positioning
  - Responsive sizing and spacing
  - Clear visual hierarchy
  - Touch-friendly button targets
-->