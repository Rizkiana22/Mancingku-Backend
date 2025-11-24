<template>
  <div id="app">
    <!-- Navbar hanya muncul kalau bukan di halaman payment -->
    <Navbar v-if="!hideNavbar" />
    <router-view />
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/footer.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// Akses route aktif
const route = useRoute()

// untuk halaman payment navbar di hide
const hideNavbar = computed(() => {
  return route.path.includes('/payment')
})

// Footer cuma muncul di BERANDA & TENTANG
const showFooter = computed(() => {
  return route.path === '/Beranda' || route.path === '/tentang' || route.path === '/blog'
})
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-image: linear-gradient(rgba(1,1,1,0.1), rgba(0,0,0,0.2)), url('@/assets/Bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
html, body{
  width: 100%;
  overflow-x: hidden;
}
</style>
