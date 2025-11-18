<template>
  <div class="blog-section">
    <h2>Blog & Artikel Terbaru</h2>
    <div class="blog-cards">

        <!-- Blog 1 -->
        <router-link to="/blog/tips-mancing-pemula" class="blog-card">
        <div class="blog-image">
          <img src="https://hellscanyon.tours/wp-content/uploads/2023/01/RiverAdventuresInc-214207-Pieces-Fishing-Equipment-blogbanner1.jpg" alt="Tips Memancing" />
        </div>
        <div class="blog-content">
          <h3>Tips Memancing untuk Pemula</h3>
          <p>
            Panduan lengkap bagi pemula yang ingin memulai hobi memancing. Mulai dari
            pemilihan alat hingga teknik dasar.
          </p>
          <div class="blog-meta">
            <span>5 Menit Baca</span>
            <span>1 Nov 2025</span>
          </div>
        </div>
      </router-link>

      <!-- Blog 2 -->
      <router-link to="/blog/spot-mancing-jabar" class="blog-card">
        <div class="blog-image">
          <img
            src="https://www.kabarmancing.com/wp-content/uploads/2014/05/114.jpg" alt="Spot Favorit"/>
        </div>
        <div class="blog-content">
          <h3>5 Spot Mancing Favorit di Jawa Barat</h3>
          <p>
            Temukan lokasi memancing terbaik di Jawa Barat dengan pemandangan
            indah dan ikan melimpah.
          </p>
          <div class="blog-meta">
            <span>4 Menit Baca</span>
            <span>30 Okt 2025</span>
          </div>
        </div>
      </router-link>

      <!-- Blog 3 -->
      <router-link to="/blog/umpan-jitu-ikan-mas" class="blog-card">
        <div class="blog-image">
          <img
            src="https://id-test-11.slatic.net/p/cbf927cf066519fa7e64f5fe04d334a4.jpg"alt="Umpan Terbaik"/>
        </div>
        <div class="blog-content">
          <h3>Rahasia Umpan Jitu untuk Ikan Mas</h3>
          <p>
            Berbagai racikan umpan khusus yang terbukti ampuh untuk memancing
            ikan mas di kolam maupun waduk.
          </p>
          <div class="blog-meta">
            <span>6 Menit Baca</span>
            <span>28 Okt 2025</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

.blog-section {
  max-width: 1200px;
  margin: 100px auto 10px;
  padding: 0 20px;
}

.blog-section h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.blog-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.blog-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  text-decoration: none;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 20px;
}

.blog-content h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 10px;
  line-height: 1.4;
}

.blog-content p {
  color: #ccc;
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.6;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .blog-cards {
    grid-template-columns: 1fr;
  }
  
  .blog-section {
    margin-bottom: 60px;
  }
}
</style>
