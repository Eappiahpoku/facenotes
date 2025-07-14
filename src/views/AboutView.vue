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
        <span class="mr-2">👋🏽</span> About Me
      </h1>

      <!-- Bio Paragraphs with Mobile-First Design -->
      <div class="space-y-4 text-lg text-gray-700 leading-relaxed">
        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          Hi, I’m Edward — a passionate student, aspiring software engineer, and the creator of StudyDock.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        I’m deeply curious about how technology and smart learning techniques can transform education.
         I love exploring science-backed ways to study better and sharing those insights with others to make learning more effective and enjoyable.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
          Beyond academics, I enjoy playing basketball, football, and pushing myself to grow 
          — mentally, academically, and creatively.
        </p>

        <p class="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
       StudyDock is my way of sharing what I’ve learned so far: 
       a digital home for tools and techniques that help students study smarter, not harder.
        </p>
      </div>

      <!-- Contact Link with WhatsApp Integration -->
      <div class="mt-8 flex flex-col items-center md:items-start space-y-4">
        <a
          href="https://www.edwardappiahpoku.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <span class="mr-2">🌐</span>
          Learn more at edwardappiahpoku.com
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">

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
