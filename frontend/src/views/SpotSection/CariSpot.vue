<template>
  <main class="spot-page">
    <Navbar />

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
import { ref, computed } from 'vue'
import SearchBar from '@/components/SpotPage/SearchBar.vue'
import SpotCard from '@/components/SpotPage/SpotCard.vue'
import spot1 from '@/assets/spot/Spot1-Main.jpeg'
import spot2 from '@/assets/spot/Spot2-Main.jpeg'

// Data dummy sementara
const spots = ref([
  {
    id: 1,
    slug: "saung-kemangi",
    name: 'Saung Kemangi',
    address: 'Jl. Cipaku Indah X No.2, RW.4, Ledeng, Kec. Cidadap, Kota Bandung, Jawa Barat',
    price: 'Rp. 20.000 / Jam',
    rating: 4.5,
    remaining: 5,
    capacity: 20, // 🆕 kapasitas (kursi)
    img: spot1
  },
  {
    id: 2,
    slug: "situ-ciburuy",
    name: "Situ Ciburuy",
    address: "Padalarang, Kabupaten Bandung Barat",
    price: "Rp. 15.000 / Jam",
    rating: 4.2,
    remaining: 2,
    capacity: 25, // 🆕 kapasitas (kursi)
    img: spot2
  }
])


const search = ref('')

const filteredSpots = computed(() => {
  return spots.value.filter(s => s.address.toLowerCase().includes(search.value.toLowerCase()))
})
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