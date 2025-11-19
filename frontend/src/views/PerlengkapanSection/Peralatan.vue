<template>
  <main class="peralatan-page">
    <div class="container">
      <h1>Macam - macam Alat Pancing</h1>

      <EquipmentCard
        v-for="item in alat"
        :key="item.id"
        :title="item.nama"
        :image="item.gambar"
        :description="item.deskripsi"
        :link="item.link_beli"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import EquipmentCard from "@/components/PerlengkapanPage/EquipmentCard.vue";

const alat = ref([]);

onMounted(async () => {
  const api = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${api}/api/alat`);
  
  alat.value = res.data.map(item => ({
    ...item,
    gambar: `/images/perlengkapan/pancingan/${item.gambar}`
  }));
});
</script>

<style scoped>
.peralatan-page {
  padding: 2rem 4vw;
  background: #fff;
  min-height: 100vh;
}
.container {
  max-width: 1000px;
  margin: auto;
  padding: 10px 20px;
}

h1 {
  font-size: 30px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
}
</style>
