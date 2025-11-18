<template>
  <div class="equip-card">
    <h2>{{ title }}</h2>
    <div class="content">
      <img :src="image" :alt="title" class="equip-img" />
      <p>{{ description }}</p>
    </div>
    <div class="card-footer">
      <button class="buy-btn" @click="buyItem">Beli</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentCard",
  props: {
    title: String,
    image: String,
    description: String,
    link: String // tambahkan prop untuk URL Shopee
  },
  methods: {
    buyItem() {
      // arahkan langsung ke Shopee
      if (this.link) {
        window.open(this.link, "_blank"); // buka di tab baru
      } else {
        alert("Link pembelian belum tersedia untuk " + this.title);
      }
    }
  }
};
</script>


<style scoped>
.equip-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* dorong tombol ke bawah */
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 300px;
}

.content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 10px;
  flex: 1; /* supaya konten mengambil ruang tersedia */
}

.equip-img {
  width: 180px;
  height: auto;
  object-fit: contain;
}

h2 {
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}

p {
  font-size: 20px;
  line-height: 1.6;
  color: #333;
}

/* Footer untuk tombol */
.card-footer {
  display: flex;
  justify-content: flex-end; /* tombol di pojok kanan bawah */
  margin-top: 15px;
}

.buy-btn {
  padding: 10px 25px;
  font-size: 18px;
  background-color: #ff7f00; /* oranye */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buy-btn:hover {
  background-color: #b15800;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: 18px;
    text-align: center;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
    text-align: justify;
  }

  .equip-img {
    width: 140px;
    height: auto;
  }

  .buy-btn {
    font-size: 16px;
    padding: 8px 20px;
  }
}
</style>
