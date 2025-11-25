<template>
  <footer class="footer">
    <div class="footer-content">

      <!-- Brand -->
      <div class="footer-section">
        <h2 class="brand">Mancingku</h2>
        <p class="desc">
          Platform booking kolam pemancingan dan panduan mancing modern.
          Biar nggak boncos lagi tiap turun ke kolam.
        </p>
      </div>

      <!-- Links -->
      <div class="footer-section">
        <h3 class="title">Navigasi</h3>
        <div class="footer-links">
          <p><router-link to="/blog">Blog</router-link></p>
          <p><router-link to="/tentang">Tentang Kami</router-link></p>
        </div>
      </div>

      <!-- Contact -->
      <div class="footer-section">
        <h3 class="title">Kontak</h3>
        <p>Email: mancingku@gmail.com</p>
        <p>WhatsApp: 0892-1231-4213</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Mancingku.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.65);
  padding: 40px 20px 20px;
  color: #fff;
  margin-top: 60px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
}

.footer-section {
  flex: 1;
  min-width: 240px;
}

.brand {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

.desc {
  color: #ccc;
  line-height: 1.5;
  max-width: 300px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.footer-links a{
  list-style: none;
  padding: 0;
  margin: 6px 0;
  text-decoration:none; 
  color: white;
}

.footer-links a:hover {
  color: #ffa600
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 30px;
  padding-top: 15px;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}
</style>
