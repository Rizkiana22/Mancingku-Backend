<template>
  <div class="fasilitas-container">
    <div class="left">
      <h4>Fasilitas</h4>
      <div class="fasilitas-grid">
        <div v-for="(item, index) in spot.fasilitas" :key="index" class="fasilitas-item">
          <img :src="item.icon" alt="icon" class="icon" />
          <span>{{ item.nama }}</span>
        </div>
      </div>
    </div>

    <div class="right">
      <h4>JAM OPERASIONAL :</h4>
      <p>{{ spot.jam_operasional }}</p>
      <div class="harga-button-group">
        <div class="harga-info">
          <p>harga per jam<br><b>Rp {{ spot.harga.toLocaleString() }}</b></p>
        </div>
        <router-link :to="`/bookingpage/${spot.id}?slug=${spot.slug}`" class="btn-pesan">Pesan Sekarang</router-link>
      </div>
      <p class="kursi">Tersisa 5 kursi!</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  spot: Object
})
</script>

<style scoped>
  
.fasilitas-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #18647b;
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Poppins', sans-serif;
  gap: 30px;
}

/* Kolom kiri */
.left {
  flex: 2;
}

.left h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 25px;
}

.fasilitas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 30px;
}

.fasilitas-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 50px;
  height: 50px;
  filter: brightness(2) invert(0);
}

/* Kolom kanan */
.right {
  flex: 0.6;
  text-align: left;
}

.right h4 {
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 18px;
}

.right p {
  margin: 5px 0;
  color: white;
  font-size: 16px;
}

.harga-button-group {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
}

.harga-info b {
  color: #ffcc00;
}

.btn-pesan{
  text-decoration: none;
  background-color: #ff9f00;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.btn-pesan:hover {
  background-color: #e57200;
}

.right .kursi{
  color: #e57200;
}

.kursi {
  margin-top: 8px;
  font-size: 15px;
  text-align: right;
  width: fit-content;
  margin-left: auto;
}

/* Responsif */
@media (max-width: 768px) {
  .fasilitas-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #18647b;
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Poppins', sans-serif;
  gap: 30px;
  overflow-x: hidden;
}

/* Kolom kiri */
.left {
  flex: none;
  width: 100%;
}

.left h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
}

.fasilitas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 30px;
}

.fasilitas-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 25px;
  height: 25px;
  filter: brightness(2) invert(0);
}

/* Kolom kanan */
.right {
  flex: none;
  width: 100%;
  transform: none;
}

.right h4 {
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 15px;
  
}

.right p {
  margin: 4px 0;
  color: white;
  font-size: 15px;
}

.harga-info {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content:right;
  gap: 10px;
}

.harga b {
  color: #ffcc00;
}

.btn-pesan{
  text-decoration: none;
  background-color: #ff9f00;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

}

.btn-pesan:hover {
  background-color: #e57200;
}

.right .kursi{
  color: #e57200;
}

}

</style>