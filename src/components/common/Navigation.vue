<!-- 
  Navigation.vue
  Modern, mobile-first navigation bar for StudyDock
  - Uses StudyDock color palette (teal green primary)
  - Touch-optimized for Ghana mobile users (48px+ touch targets)
  - Responsive hamburger menu for mobile
  - Offline-aware design
  - Clean, academic aesthetic
-->

<template>
  <nav class="bg-primary text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- ===== LEFT SIDE: StudyDock Logo ===== -->
        <div class="flex items-center space-x-3">
          <StudyDockLogo class="h-8 w-8" white />
          <router-link 
            to="/" 
            class="text-xl font-bold tracking-wide hover:text-accent transition-colors duration-200"
            aria-label="StudyDock Home"
          >
            StudyDock
          </router-link>
        </div>

        <!-- ===== DESKTOP NAVIGATION (Hidden on mobile) ===== -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.href"
              class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-primary-600 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              :class="isActiveRoute(item.href) ? 'bg-primary-600 text-accent' : 'text-white hover:text-accent'"
              :aria-current="isActiveRoute(item.href) ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- ===== MOBILE MENU BUTTON (Visible on mobile) ===== -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="inline-flex items-center justify-center p-3 rounded-md text-white hover:text-accent hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors duration-200"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <!-- Hamburger Icon -->
            <svg 
              class="h-6 w-6" 
              :class="isMobileMenuOpen ? 'hidden' : 'block'"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close Icon -->
            <svg 
              class="h-6 w-6" 
              :class="isMobileMenuOpen ? 'block' : 'hidden'"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== MOBILE MENU PANEL ===== -->
    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-primary-700 border-t border-primary-600"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          @click="closeMobileMenu"
          class="block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-primary-600 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-700"
          :class="isActiveRoute(item.href) ? 'bg-primary-600 text-accent' : 'text-white hover:text-accent'"
          :aria-current="isActiveRoute(item.href) ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import StudyDockLogo from '@/components/base/StudyDockLogo.vue'

// ===== Types & Interfaces =====
interface NavigationItem {
  name: string
  href: string
}

// ===== Constants & Config =====
/**
 * Main navigation items for StudyDock
 * Based on the PRD structure: Home, Tips, Blog, About, Contact
 */
const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

// ===== Reactive State =====
const route = useRoute()
const isMobileMenuOpen = ref(false)

// ===== Helper Functions =====
/**
 * Check if the current route matches the navigation item
 * Used for highlighting the active page
 */
function isActiveRoute(href: string): boolean {
  return route.path === href
}

/**
 * Toggle mobile menu visibility
 * Includes touch-friendly interaction for Ghana mobile users
 */
function toggleMobileMenu(): void {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

/**
 * Close mobile menu when navigation item is clicked
 * Improves UX by auto-closing menu after navigation
 */
function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
}
</script>

<!-- 
  All styling uses Tailwind utility classes for:
  - Mobile-first responsive design
  - StudyDock color palette consistency  
  - Touch-optimized interactions (48px+ targets)
  - Smooth transitions for modern feel
  - Accessibility compliance (focus states, ARIA labels)
-->