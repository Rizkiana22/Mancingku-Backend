<template>
  <div class="image-slider">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :class="['slide', { active: activeSlide === index }]"
    >
      <img :src="slide.src" :alt="slide.alt" />
    </div>

    <!-- Navigasi -->
    <button class="prev" @click="prevSlide">&#10094;</button>
    <button class="next" @click="nextSlide">&#10095;</button>

    <!-- Dots -->
    <div class="dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="['dot', { active: activeSlide === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import img1 from '@/assets/spot/Pemancingan1.jpg'
import img2 from '@/assets/spot/Pemancingan2.jpg'
import img3 from '@/assets/spot/Pemancingan3.jpg'

const slides = [
  { src: img1, alt: 'Iklan 1' },
  { src: img2, alt: 'Iklan 2' },
  { src: img3, alt: 'Iklan 3' },
]

const activeSlide = ref(0)

function nextSlide() {
  activeSlide.value = (activeSlide.value + 1) % slides.length
}

function prevSlide() {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
}

function goToSlide(index) {
  activeSlide.value = index
}
</script>

<style scoped>

.image-slider {
  position: relative;
  width: 500px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
}

.image-slider .slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.image-slider .slide.active {
  opacity: 1;
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Navigasi slider */
.image-slider .prev,
.image-slider .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2;
}

.image-slider .prev:hover,
.image-slider .next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.image-slider .prev { left: 10px; }
.image-slider .next { right: 10px; }

/* Slider dots */
.dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot.active {
  background: #1d4ed8;
}

@media (max-width: 768px) {
    .image-slider {
      width: auto;
    height: 55vw;
  }

  .image-slider .prev,
  .image-slider .next {
    padding: 8px 12px;
    font-size: 20px;
  }
}
</style>
