<template>
  <div class="spot-card">
    <div class="spot-img-wrapper">
      <img :src="`/images/spots/${spot.image}`" class="spot-img" />
    </div>

    <div class="spot-details">
      <h3>{{ spot.name }}</h3>
      <p class="address">📍 {{ spot.address }}</p>

      <div class="rating">
        <span>{{ spot.rating }}</span>
        <span class="stars">{{ stars }}</span>
      </div>

      <!-- KAPASITAS DIAMBIL DARI SESSION -->
      <p><strong>Kapasitas:</strong> 
        {{ nextSession ? nextSession.capacity : '...' }} kursi
      </p>

      <!-- SISA KURSI SESI TERDEKAT -->
      <p class="availability" v-if="nextSession">
        Tersisa {{ nextSession.seats_left }} kursi!
      </p>
      <p v-else>memuat...</p>
    </div>

    <div class="spot-price">
      <!-- HARGA PER SESI TERDEKAT -->
      <p v-if="nextSession">Rp {{ nextSession.price }}</p>
      <p v-else>Rp ...</p>

      <router-link :to="`/spot/${spot.slug}`" class="btn-pilih">
        Pilih
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  spot: Object
})

// ▼▼▼ NEXT SESSION DIAMBIL DARI BACKEND ▼▼▼
const nextSession = ref(null)

const loadNextSession = async () => {
  try {
    const res = await axios.get(`/api/${props.spot.id}/next-session`)
    nextSession.value = res.data
  } catch (err) {
    console.error("Gagal memuat sesi:", err)
  }
}

onMounted(() => {
  loadNextSession()
})

// STAR RATING
const stars = computed(() => {
  const rating = Math.round(props.spot.rating)
  return "⭐️".repeat(rating) + "☆".repeat(5 - rating)
})
</script>
