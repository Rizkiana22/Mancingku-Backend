<template>
  <div class="about-content">
    <h1>TENTANG KAMI</h1>
    <p>
      <strong>Mancingku</strong> adalah platform booking tempat pemancingan air
      tawar di Indonesia yang memudahkan Anda menemukan spot terbaik, lengkap
      dengan informasi harga, fasilitas, dan sistem booking online. Tak hanya
      itu, <strong>Mancingku</strong> juga menyediakan rekomendasi joran dan
      umpan agar pengalaman memancing Anda semakin menyenangkan dan praktis.
      Kami percaya bahwa memancing bukan sekadar hobi, tetapi juga cara
      menikmati alam dan kebersamaan.
    </p>
  </div>
</template>

<style scoped>
.about-content {
  max-width: 600px; /* lebar konten nyaman dibaca */
  margin: 20px auto; /* center horizontal + jarak vertikal */
  text-align: center; /* teks rata tengah */
  padding: 0 10px; /* jarak kiri-kanan di layar kecil */
  box-sizing: border-box;
}

.about-content h1 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 35px;
  font-weight: 700;
  line-height: 1.3em;
}

.about-content p {
  margin-bottom: 2rem;
  color: #ccc;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
}

@media (max-width: 979px) {
  .about-content h1 {
    font-size: 30px;
    line-height: 2.2rem;
  }

  .about-content p {
    font-size: 15px;
  }
}
</style>
