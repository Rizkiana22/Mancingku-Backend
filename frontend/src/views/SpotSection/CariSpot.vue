<template>
  <main class="spot-page">
    <section class="search-section">
      <h1>Cari Spot Pemancingan</h1>
      <SearchBar v-model="search" @apply-filter="setFilter" @reset-filter="resetFilter"/>
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

const filter = ref({
  minPrice: null,
  maxPrice: null,
  rating: 0
})

const setFilter = (f) => {
  filter.value = f
}

const resetFilter = () => {
  filter.value = {
    minPrice: null,
    maxPrice: null,
    rating: 0
  }
}

onMounted(async () => {
  try {
    const api = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${api}/api/spots`);

    // 🔥 Ambil harga next-session untuk setiap spot
    const spotsWithPrice = await Promise.all(
      res.data.map(async sp => {
        try {
          const session = await axios.get(`${api}/api/sessions/${sp.id}/next-session`);
          return { ...sp, nextPrice: session.data?.price ?? null };
        } catch {
          return { ...sp, nextPrice: null };
        }
      })
    );

    spots.value = spotsWithPrice;
  } catch (err) {
    console.error("Gagal mengambil data spots:", err);
  }
});

const filteredSpots = computed(() => {
  return spots.value.filter(s => {
    const matchAddress = s.address.toLowerCase().includes(search.value.toLowerCase());

    const matchMin = filter.value.minPrice ? s.nextPrice >= filter.value.minPrice : true;
    const matchMax = filter.value.maxPrice ? s.nextPrice <= filter.value.maxPrice : true;
    const matchRating = filter.value.rating ? s.rating >= filter.value.rating : true;

    return matchAddress && matchMin && matchMax && matchRating;
  });
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