<template>
  <div class="add-review-page">
    <!-- Tombol Kembali -->
    <router-link :to="`/comment/${spotId}`" class="btn-back">←</router-link>

    <h2>Tulis Ulasan</h2>
    <p>Bagikan pengalamanmu di tempat pemancingan ini</p>

    <form class="review-form" @submit.prevent="submitReview">
      
      <label>Rating</label>
      <select v-model="rating" required>
        <option disabled value="">Pilih rating</option>
        <option v-for="r in [1,2,3,4,5]" :key="r">{{ r }}</option>
      </select>

      <label>Komentar</label>
      <textarea v-model="comment" rows="4" placeholder="Tulis ulasanmu di sini" required></textarea>

      <button type="submit" class="btn-submit">Kirim Ulasan</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Ambil spot id dari URL
const spotId = route.params.id

// State form
const rating = ref('')
const comment = ref('')

// User ID (misal Login sudah simpan user di localStorage)
const user = JSON.parse(localStorage.getItem('user')) || null
const userId = user?.id || null 

const submitReview = async () => {
  if(!userId){
    alert("Silahkan login untuk menambahkan komentar!");
    router.push("/login");
  return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews`, {
      user_id: userId,
      spot_id: spotId,
      rating: rating.value,
      comment: comment.value
    })

    alert("Ulasan berhasil ditambahkan!")
    router.push(`/comment/${spotId}`)
    
  } catch (err) {
    console.error("Gagal mengirim review:", err)
    alert("Gagal mengirim ulasan.")
  }
}
</script>

<style scoped>
.add-review-page {
  max-width: 100%;
  margin:auto;
  background: #fff;
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
  min-height: 85vh;
}

h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #000;
}

p {
  text-align: center;
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

.review-form label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.3rem;
  color: #333;
}

.review-form input,
.review-form select,
.review-form textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
}

.review-form input:focus,
.review-form select:focus,
.review-form textarea:focus {
  border-color: #f79e1b;
  box-shadow: 0 0 5px rgba(247, 158, 27, 0.3);
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #1b3c53;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:hover {
  background: #e38c00;
}

.btn-back {
  position: absolute;
  top: 30px;
  left: 60px;
  font-size: 50px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #f79e1b;
}

@media (max-width: 768px) {
  .add-review-page {
    margin: 0;
    padding: 1.6rem;
    min-height: 83vh;
  }
  h2 {
    font-size: 20px;
  }
  .btn-back {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 35px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #f79e1b;
}
}
</style>
