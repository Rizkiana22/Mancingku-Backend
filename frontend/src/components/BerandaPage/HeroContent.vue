<template>
  <div class="hero-content">
    <h2>“Booking Tempat Pemancingan di Sekitar Anda”</h2>
    <p>
      Temukan pemancingan terdekat, lihat fasilitas dan harga, lalu pesan tempat
      dengan mudah
    </p>
    <router-link to="/spot">
      <button class="btn">Lihat</button>
    </router-link>
  </div>
</template>

<style scoped>
.hero-content {
  width: 100%;
}

.hero-content h2 {
  color: #fff;
  margin-bottom: 15px;
  font-size: 1.8rem;
  font-weight: 600;
}

.hero-content p {
  line-height: 1.6;
  margin-bottom: 20px;
  color: #ccc;
  font-size: 1.2rem;
}

.hero-content .btn {
  background-color: #fea100;
  border: none;
  padding: 12px 35px;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.hero-content .btn:hover {
  background-color: #e28e00;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
    line-height: 2.2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }
}
</style>
