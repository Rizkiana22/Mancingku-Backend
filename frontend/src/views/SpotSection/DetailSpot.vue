<template>
  <div class="detail-spot">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>

      <SpotHeader :spot="spot" />
      <SpotFasilitas :spot="spot" />
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SpotHeader from '@/components/DetailSpot/SpotHeader.vue'
import SpotFasilitas from '@/components/DetailSpot/SpotFasilitas.vue'
import spot1 from '@/assets/spot/Spot1-Main.jpeg'
import spot1g1 from '@/assets/spot/Spot1-Galeri1.jpeg'
import spot1g2 from '@/assets/spot/Spot1-Galeri2.jpeg'
import spot1g3 from '@/assets/spot/Spot1-Galeri3.jpeg'
import spot2 from '@/assets/spot/Spot2-Main.jpeg'
import spot2g1 from '@/assets/spot/Spot2-Galeri-1.jpeg'
import spot2g2 from '@/assets/spot/Spot2-Galeri-2.jpeg'
import spot2g3 from '@/assets/spot/Spot2-Galeri-3.jpg'

const route = useRoute()
const spot = ref({})
const loading = ref(true)

const dummyData = [
  {
    id: 1,
    slug: "saung-kemangi",
    nama: "Saung Kemangi",
    alamat: "Jl. Cipaku Indah X No.2, Ledeng, Bandung",
    rating: 4.5,
    harga: 20000,
    jam_operasional: "10.00 - 22.00",
    capacity: 20,
    image: spot1,
    galeri: [
      spot1g1,
      spot1g2,
      spot1g3
    ],
    fasilitas: [
      { nama: "Tempat Istirahat", icon: "https://cdn-icons-png.flaticon.com/128/2881/2881924.png" },
      { nama: "Toilet", icon: "https://cdn-icons-png.flaticon.com/128/185/185547.png" },
      { nama: "Mushola", icon: "https://cdn-icons-png.flaticon.com/128/6152/6152893.png" },
      { nama: "Sewa Alat", icon: "https://cdn-icons-png.flaticon.com/128/2265/2265049.png" },
      { nama: "Restoran", icon: "https://cdn-icons-png.flaticon.com/128/10372/10372638.png" },
      { nama: "Parkir", icon: "https://cdn-icons-png.flaticon.com/128/15767/15767705.png" }
    ],
    ulasan: [
      { id: 1, user: "U***", komentar: "Tempat nyaman dan tenang", stars: "4.5" },
      { id: 2, user: "D***", komentar: "Kolam luas, cocok untuk keluarga", stars: "4.5" },
    ]
  },
  {
    id: 2,
    slug: "situ-ciburuy",
    nama: "Situ Ciburuy",
    alamat: "Padalarang, Kabupaten Bandung Barat",
    rating: 4.5,
    harga: 15000,
    jam_operasional: "08.00 - 20.00",
    capacity: 25,
    image: spot2,
    galeri: [
      spot2g1,
      spot2g2,
      spot2g3
    ],
    fasilitas: [
      { nama: "Toilet", icon: "https://cdn-icons-png.flaticon.com/128/185/185547.png" },
      { nama: "Sewa Alat", icon: "https://cdn-icons-png.flaticon.com/128/2265/2265049.png" },
      { nama: "Parkir", icon: "https://cdn-icons-png.flaticon.com/128/15767/15767705.png" }
    ],
    ulasan: [
      { id: 1, user: "A***", komentar: "Tempat nya enak dan dijamin STRIKEE!!!", stars: "4.5" },
      { id: 2, user: "U**S", komentar: "Tempat nya nyaman banget bOssss", stars: "4.5" }
    ]
  }
]

onMounted(() => {
  const slug = route.params.slug
  const found = dummyData.find(s => s.slug === slug)

  if (found) {
    spot.value = found
    document.title = `${found.nama} | Mancingku`
  } else {
    spot.value = { nama: "Spot tidak ditemukan" }
  }
  loading.value = false
})

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