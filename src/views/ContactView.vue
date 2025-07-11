<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Main Hero Section with gradient background -->
    <section class="relative">
      <!-- Contact Header Section with stronger background -->
      <div class="bg-primary pt-20 pb-24 px-4 relative">
        <div class="container mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p class="text-xl text-gray-100 max-w-2xl mx-auto">
            We're here to help. Reach out anytime.
          </p>
        </div>
        <!-- Decorative bottom curve -->
        <div
          class="absolute bottom-0 left-0 right-0 h-16 bg-gray-50"
          style="clip-path: ellipse(100% 100% at 50% 100%)"
        ></div>
      </div>
    </section>

    <!-- Contact Information Section -->
    <section class="container mx-auto px-4 py-12 max-w-4xl -mt-8 relative z-20">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Contact Details -->
        <div class="space-y-8 bg-white p-8 rounded-xl shadow-sm">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Need to Reach Us?</h2>
          <p class="text-gray-600 mb-8">You can contact us directly using the details below.</p>

          <!-- Contact Cards -->
          <div class="space-y-6">
            <!-- Address Card -->
            <div
              class="group p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div class="flex items-start">
                <span class="text-2xl mr-4">📍</span>
                <div>
                  <h3 class="font-semibold text-gray-800 mb-1">Address</h3>
                  <p class="text-gray-600">29 Labone Crescent, Accra</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp Card -->
            <div
              class="group p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div class="flex items-start">
                <span class="text-2xl mr-4">💬</span>
                <div>
                  <h3 class="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                  <p class="text-gray-600 mb-2">+233-244-314-463</p>
                  <button
                    @click="openWhatsApp"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#25D366] hover:bg-[#128C7E] rounded-md transition-colors duration-300"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <!-- Email Card -->
            <div
              class="group p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div class="flex items-start">
                <span class="text-2xl mr-4">📧</span>
                <div>
                  <h3 class="font-semibold text-gray-800 mb-1">Email</h3>
                  <p class="text-gray-600 mb-2">StudyDockConsult@gmail.com</p>
                  <a
                    href="mailto:StudyDockConsult@gmail.com"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md transition-colors duration-300"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Time Notice -->
          <div class="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p class="text-gray-600 text-sm text-center">
              We'll respond within 24 hours on business days.
            </p>
          </div>
        </div>

        <!-- Map Section -->
        <div class="h-full">
          <div class="bg-white p-4 rounded-xl shadow-sm h-full">
            <div class="relative h-full min-h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0126766543274!2d-0.1794844!3d5.5603666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9082a141400f%3A0x3b31d8a77909a7e9!2s29%20Labone%20Crescent%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2s!4v1621234567890!5m2!1sen!2s"
                class="absolute inset-0 w-full h-full"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="StudyDock Office Location"
              ></iframe>
              <div
                v-if="!isOnline"
                class="absolute inset-0 flex items-center justify-center bg-gray-100"
              >
                <p class="text-gray-600 text-center p-4">
                  Map is currently unavailable offline.<br />
                  Please check your internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const isOnline = ref(navigator.onLine)

  onMounted(() => {
    window.addEventListener('online', () => isOnline.value = true)
    window.addEventListener('offline', () => isOnline.value = false)
  })

  function openWhatsApp() {
    const message = encodeURIComponent("Hello, I'd like to get in touch regarding your services.")
    window.open(`https://wa.me/233244314463?text=${message}`, '_blank')
  }
</script>

<style scoped>
  .transition-all {
    transition: all 0.3s ease;
  }

  /* Hover effects */
  .group:hover {
    transform: translateY(-2px);
  }

  /* Progressive enhancement for better devices/connections */
  @media (min-width: 768px) {
    .hover\:shadow-md:hover {
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
  }
</style>
