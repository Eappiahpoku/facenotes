<!-- 
  Footer.vue
  Modern footer component for StudyDock
  - Uses StudyDock color palette (teal green primary)
  - Social media icons (Twitter, Snapchat, WhatsApp)
  - StudyDock branding with logo
  - Quick links to external study apps
  - Mobile-first responsive design
  - Touch-optimized for Ghana mobile users
  - Appears at end of content (not sticky)
  - ALL CONTENT PROPERLY CENTERED ON ALL DEVICES
-->

<template>
  <footer class="bg-primary text-white mt-auto">
    <!-- ===== MAIN FOOTER CONTENT ===== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- ===== [FULLY CENTERED CONTENT] START ===== -->
      <div class="flex flex-col items-center justify-center text-center space-y-8">
        
        <!-- ===== StudyDock Branding Section - Always Centered ===== -->
        <div class="space-y-4 flex flex-col items-center">
          <!-- StudyDock Logo and Name - Always Centered -->
          <div class="flex items-center space-x-3">
            <StudyDockLogo class="h-10 w-10" white />
            <h3 class="text-xl font-bold tracking-wide">StudyDock</h3>
          </div>
          
          <!-- StudyDock Description - Always Centered -->
          <p class="text-primary-100 text-sm leading-relaxed max-w-xs text-center">
            Master the art of studying with science-backed techniques and interactive tools designed for academic success.
          </p>

          <!-- Social Media Icons - Always Centered -->
          <div class="flex space-x-4 pt-2 justify-center">
            <!-- Twitter Icon -->
            <button 
              class="p-3 rounded-full bg-primary-600 hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Follow us on Twitter"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </button>

            <!-- Snapchat Icon -->
            <button 
              class="p-3 rounded-full bg-primary-600 hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Follow us on Snapchat"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.957 1.404-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001 12.017.001z"></path>
              </svg>
            </button>

            <!-- WhatsApp Icon -->
            <button 
              class="p-3 rounded-full bg-primary-600 hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Contact us on WhatsApp"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"></path>
              </svg>
            </button>
          </div>
        </div>

      </div>
      <!-- ===== [FULLY CENTERED CONTENT] END ===== -->
    </div>
        
    <!-- ===== BOTTOM BAR: Copyright - Also Fully Centered ===== -->
    <div class="border-t border-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-center">
          <!-- Copyright Text - Always Centered -->
          <p class="text-primary-100 text-sm text-center">
            {{ currentYear }} StudyDock. Built with ❤️ by Edward Appiah-Poku
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StudyDockLogo from '@/components/base/StudyDockLogo.vue'

// ===== Constants & Config =====
/**
 * Get current year for copyright display
 * Automatically updates each year without manual changes
 */
const currentYear = computed(() => new Date().getFullYear())
</script>

<!-- 
  All styling uses Tailwind utility classes for:
  - Mobile-first responsive design with COMPLETE CENTERING
  - StudyDock color palette consistency (primary, accent colors)
  - Touch-optimized social media buttons (48px+ targets)
  - Smooth transitions for modern feel
  - Accessibility compliance (ARIA labels, focus states)
  - Flexbox layout that centers everything perfectly on all screen sizes
  - Proper contrast ratios for outdoor visibility in Ghana
  
  CENTERING STRATEGY UPDATED:
  - ALL DEVICES: Everything centered using flexbox with items-center and justify-center
  - Removed responsive grid layout that was causing left-alignment on desktop
  - Single column layout that centers all content both horizontally and vertically
  - Social icons: Always centered with justify-center
  - Copyright: Always centered with justify-center
-->