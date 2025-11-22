<template>
  <main class="spot-page">
    <section class="search-section">
      <h1>Cari Spot Pemancingan</h1>
      <SearchBar v-model="search" />
    </section>

    <section class="spot-list">
      <SpotCard
        v-for="(spot, index) in filteredSpots"
        :key="index"
        :spot="spot"
      />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import SearchBar from "@/components/SpotPage/SearchBar.vue";
import SpotCard from "@/components/SpotPage/SpotCard.vue";

const spots = ref([]);
const search = ref("");

onMounted(async () => {
  try {
    const api = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${api}/api/spots`);
    spots.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil data spots:", err);
  }
});

const filteredSpots = computed(() => {
  return spots.value.filter(s =>
    s.address.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>


<style scoped>
.spot-page {
  padding: 2rem 4vw;
  background: #fff;
  min-height: 100vh;
}

.search-section h1 {
  margin-bottom: 1rem;
  color: #111;
  font-weight: 700;
}

.spot-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (max-width: 768px){
  
}
</style>