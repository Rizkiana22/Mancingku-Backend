<template>
  <main class="container">
    <ImageSlider />
    <HeroContent />
  </main>
  <BlogSection />
</template>

<script setup>
import ImageSlider from "@/components/BerandaPage/ImageSlider.vue";
import HeroContent from "@/components/BerandaPage/HeroContent.vue";
import BlogSection from '@/components/BerandaPage/BlogSection.vue';
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  overflow-x: hidden;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 5vw 4vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 4vw;
}

/* Responsif di mobile */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 4vw 3vw;
    gap: 2rem;
  }
}
</style>
