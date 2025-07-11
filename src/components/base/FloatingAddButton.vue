<template>
  <button
    type="button"
    class="
      fixed bottom-6 right-6 
      w-16 h-16 
      flex items-center justify-center 
      bg-primary-600 hover:bg-primary-700
      text-white
      rounded-full 
      shadow-lg hover:shadow-xl
      transform transition-transform duration-200 hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
      touch-target-[60px]
      z-50  mb-16
    "
    aria-label="Add new item"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.5"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
// Component logic will be added later
</script>