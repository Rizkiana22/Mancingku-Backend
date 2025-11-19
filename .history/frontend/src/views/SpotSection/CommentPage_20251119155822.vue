<template>
  <div class="comment-page">
    <div v-if="loading" class="loading">Memuat komentar...</div>

    <div v-else>
      <div class="nama-tempat">
        <center><h2>{{ spot.name }}</h2></center>
        <center><p>Ulasan Pengunjung</p></center>

        <router-link :to="`/spot/${spot.slug}`" class="btn-back">
          ←
        </router-link>
      </div>

      <!-- Tombol Tambah Komentar -->
      <div class="add-comment">
        <router-link :to="`/comment/add/${spot.id}`" class="btn-tambah">
          Tambah Komentar
        </router-link>
      </div>

      <!-- Daftar Ulasan -->
      <div v-if="reviews.length">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <p class="user">
            <strong>User #{{ review.user_id }}</strong> — ⭐ {{ review.rating }}
          </p>
          <p class="comment">{{ review.comment }}</p>
        </div>
      </div>

      <p v-else>Belum ada ulasan untuk tempat ini.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const spot = ref({})
const reviews = ref([])
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id

  try {
    // Ambil detail spot
    const spotRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/spots/id/${id}`
    )
    spot.value = spotRes.data

    // Ambil review dari backend
    const reviewRes = await axios.get(
       `${import.meta.env.VITE_API_URL}/api/reviews/${id}`
    )
    reviews.value = reviewRes.data

  } catch (err) {
    console.error("Gagal mengambil data:", err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.nama-tempat{
  position: relative;
}

.nama-tempat h2{
  font-size: 25px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-bottom: 0.1rem;
}

.nama-tempat p{
  display: flex;
  justify-content: center;
  margin-top: 0;
  color: rgb(83, 83, 83);
}

.comment-page {
  background: #fff;
  padding: 1rem 6vw;
  font-family: 'Poppins', sans-serif;
  min-height: 86vh;
  color: #222;
}

.review-card {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.review-card .user {
  color: #05496c;
  font-weight: 500;
  margin-bottom: 4px;
}

.review-card .comment {
  color: #333;
  font-size: 14px;
}

.btn-back {
  position: absolute;
  top: 5px;
  font-size: 45px;
  font-weight: 300;
  color: black;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  line-height: 1;
}

.btn-back:hover {
  color: #005fa3;
}

.add-comment {
  text-align: right;
  margin: 1rem 0;
}

.btn-tambah {
  display: inline-block;
  background-color: #da9723;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2);
}

.btn-tambah:hover {
  background-color: #e28e00;
}

/* MOBILE */
@media (max-width : 768px){
  .btn-back {
    top: 5px;
    font-size: 30px;
    margin-top: 80px;
  }

  .btn-tambah {
    padding: 8px 14px;
    font-size: 12px;
  }
}
</style>
