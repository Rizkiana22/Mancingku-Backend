<template>
  <div class="indeks">
    <h1>📖 Indeks Halaman Mancingku</h1>
    <p>Pilih salah satu halaman untuk melihat UI yang sudah dibuat.</p>

    <ul class="link-list">
      <li><router-link to="/Beranda">🏠 Beranda</router-link></li>
      <li><router-link to="/tentang">ℹ️ Tentang</router-link></li>
      <li><router-link to="/spot">🎣 Cari Spot</router-link></li>
      <li><router-link to="/peralatan">🧰 Peralatan</router-link></li>
      <li><router-link to="/umpan">🐛 Umpan</router-link></li>
      <li><router-link to="/signIn">🔑 Sign In</router-link></li>
      <li><router-link to="/signUp">🆕 Sign Up</router-link></li>
      <li><router-link to="/profile">👤 Profil</router-link></li>
      <li><router-link :to="`/blog/${blogSlug}`">📰 Blog Detail</router-link></li>
      <li><router-link :to="`/spot/${spotSlug}`">📍 Detail Spot</router-link></li>
      <li><router-link :to="{ path: `/bookingpage/1`, query: { slug: spotSlug } }">🎫 Booking Page</router-link></li>
      <li><router-link to="/payment/saung-kemangi?tanggal=3223-02-11&jamMulai=12:00&durasi=1&jumlahOrang=1&sewaAlat=tidak&jenisAlat=&slug=saung-kemangi">💳 Payment Page (contoh ID)</router-link></li>
      <li><router-link to="/comment/1">💬 Comment Page (contoh ID)</router-link></li>
      <li><router-link to="/comment/add/1">➕ Tambah Ulasan</router-link></li>
      
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Indeks',
  data() {
    return {
      blogSlug: "tips-mancing-pemula",
      spotSlug: "saung-kemangi"
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
  color: inherit;
}

.indeks {
  text-align: center;
  padding: 40px;
  font-family: 'Segoe UI', sans-serif;
  color: #222;
  background: #f0f8ff;
  min-height: 100vh;
}

.indeks h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.indeks p {
  margin-bottom: 20px;
  color: #444;
}

.link-list {
  list-style: none;
  padding: 0;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.link-list li {
  background: #fff;
  margin: 6px 0;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.link-list li:hover {
  background: #e8f5e9;
}

.router-link-active {
  font-weight: bold;
}


</style>
