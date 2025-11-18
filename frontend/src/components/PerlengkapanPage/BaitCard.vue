<template>
  <div class="bait-card">
    <h2>{{ title }}</h2>
    <div class="content">
      <img :src="image" :alt="title" class="bait-img" />
      <p>{{ description }}</p>
    </div>
    <div class="card-footer">
      <button class="buy-btn" @click="buyItem">Beli</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaitCard",
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
.bait-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  min-height: 300px;
}

.content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 10px;
  flex: 1;
}

.bait-img {
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

/* Tombol beli */
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

@media (max-width: 768px){
   .content {
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
    color: #333;
    text-align: justify;
  }

  h2 {
    font-size: 18px;
    text-align: center;
  }

  .equip-img {
    width: 140px;
    height: auto;
    justify-content: center;
  }

  .buy-btn {
    font-size: 16px;
    padding: 8px 20px;
  }
}

</style>
