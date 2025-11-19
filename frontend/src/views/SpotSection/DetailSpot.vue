<template>
  <div class="detail-spot">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <h1>TeSSSSS</h1>
      <SpotHeader :spot="spot" />
      <SpotFasilitas :spot="spot" />
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import SpotHeader from "@/components/DetailSpot/SpotHeader.vue";
import SpotFasilitas from "@/components/DetailSpot/SpotFasilitas.vue";

const route = useRoute();
const spot = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const api = import.meta.env.VITE_API_URL;
    const slug = route.params.slug;

    const res = await axios.get(`${api}/api/spots/${slug}`);
    spot.value = res.data;

    document.title = `${spot.value.name} | Mancingku`;
  } catch (err) {
    console.error("Gagal fetch data detail:", err);
    spot.value = { name: "Spot tidak ditemukan" };
  } finally {
    loading.value = false;
  }
});
</script>


<style scoped>
.detail-spot {
  background: #fff;
  padding: 1rem 4vw;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #222;
}
</style>