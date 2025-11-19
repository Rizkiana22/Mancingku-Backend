<template>
  <main class="umpan-page">
    <div class="container">
      <h1>Macam - macam Umpan</h1>

      <EquipmentCard
        v-for="item in umpan"
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

const umpan = ref([]);

onMounted(async () => {
  const api = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${api}/api/umpan`);
  
  umpan.value = res.data.map(item => ({
    ...item,
    gambar: `/images/perlengkapan/umpan/${item.gambar}`
  }));
});
</script>

<style scoped>
.umpan-page{
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
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-bottom: 30px;
}

@media (max-width:768px) {
  h1{
      font-size: 20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
}
</style>
