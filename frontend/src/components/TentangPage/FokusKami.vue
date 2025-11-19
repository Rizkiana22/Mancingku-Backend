<template>
  <div class="fokus-kami">
    <h1>FOKUS KAMI</h1>

    <div class="fokus-container">
      <div class="fokus-item">
        <img src="/src/assets/Icon/booking.png" alt="Booking Online" />
        <h3>Booking Online</h3>
      </div>

      <div class="fokus-item">
        <img src="/src/assets/Icon/fishing-tool.png" alt="Informasi Joran" />
        <h3>Informasi Joran</h3>
      </div>

      <div class="fokus-item">
        <img src="/src/assets/Icon/fishing.png" alt="Informasi Umpan" />
        <h3>Informasi Umpan</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fokus-kami {
  max-width: 1300px;
  margin: 100px auto;
  padding: 0 10px;
  text-align: center;
  box-sizing: border-box;
}

.fokus-kami h1 {
  font-size: 35px;
  font-weight: 700;
  line-height: 1.3rem;
  margin-bottom: 1rem;
  color: #fff;
}

.fokus-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px; /* Memberi jarak antar item */
}

.fokus-item {
  width: 280px;
  padding: 20px;
  text-align: center;
  border-radius: 16px;
}

.fokus-item img {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  filter: brightness(0) invert(1);
}

.fokus-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

/* Responsive */
@media (max-width: 979px) {
  .fokus-kami h1 {
    font-size: 30px;
    line-height: 2.2rem;
  }

  .fokus-container {
    justify-content: center;
    padding: 10px;
    overflow-x: hidden;
  }

  .fokus-item {
    width: 200px;
    padding: 20px;
  }

  .fokus-item img {
    width:50px;
    height: 50px;
  }

  .fokus-item h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
