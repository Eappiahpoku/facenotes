<template>
  <main class="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
    <!-- Profile Image Section -->
    <div class="mb-8 flex justify-center">
      <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
        <img
          src="/edwardprofilepic.webp"
          alt="Edward Appiah-Poku"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- About Section -->
    <section class="space-y-6 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-primary mb-6 flex items-center justify-center md:justify-start">
        <span class="mr-2">👤</span> About Edward
      </h1>

      <!-- Bio Paragraphs with Mobile-First Design -->
      <div class="space-y-4 text-lg text-gray-700 leading-relaxed">
        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          Edward is a multifaceted entrepreneur and consultant holding leadership positions
          in construction, mining, and pharmaceuticals.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          He also consults on hotel developments across Africa. His academic background—spanning
          Management, Economics, Law, and Computer Science—gives him a rare mix of strategy and tech.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          Through StudyDock Ltd, he helps small and growing businesses thrive by improving strategy,
          operations, and digital systems.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          He's passionate about simplifying complexity and building sustainable companies.
        </p>
      </div>

      <!-- Contact Link with WhatsApp Integration -->
      <div class="mt-8 flex flex-col items-center md:items-start space-y-4">
        <a
          href="https://www.benappiahpoku.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <span class="mr-2">🌐</span>
          Learn more at benappiahpoku.com
        </a>

        <button
          @click="shareOnWhatsApp"
          class="inline-flex items-center px-6 py-3 text-lg font-medium text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span class="mr-2">💬</span>
          Connect on WhatsApp
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
function shareOnWhatsApp() {
  const message = "Hi Edward, I'd like to connect with you regarding business consulting."
  const url = `https://wa.me/+233?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
</script>

<style scoped>
/* Smooth transition for interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Progressive enhancement for better devices/connections */
@media (min-width: 768px) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}
</style>
