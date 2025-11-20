<template>
  <div class="spot-header">
    <!-- IMAGE SECTION -->
    <div class="image-section">
      <img :src="`/images/spots/${spot.image}`" class="main-image" />
    </div>

    <!-- SPOT INFO -->
    <div class="spot-info">
      <h1>{{ spot.name }}</h1>

      <p><strong>Kapasitas:</strong> {{ spot.capacity }} kursi</p>
      <p class="alamat">📍 {{ spot.address }}</p>

      <p class="rating">
        ⭐ {{ spot.rating ?? 0 }} ({{ reviews.length }} ulasan)
      </p>

      <h2>Ulasan Pengunjung</h2>

      <!-- LIST ULASAN -->
      <div v-if="reviews.length" class="ulasan">
        <div v-for="review in limitedReviews" :key="review.id" class="review-card">
          <p class="user">
            <strong>{{ review.user_name }}</strong> — ⭐ {{ review.rating }}
          </p>
          <p class="comment">{{ review.comment }}</p>
        </div>
      </div>

      <!-- DEFAULT JIKA BELUM ADA REVIEW -->
      <p v-else class="no-review">Belum ada ulasan untuk tempat ini.</p>
        <router-link :to="`/comment/${spot.id}`">
          <button class="btn-comment">Lihat semua</button>
        </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const props = defineProps({
  spot: {
    type: Object,
    required: true,
  },
});

const reviews = ref([]);


const limitedReviews = computed(() => reviews.value.slice(0, 2));

onMounted(async () => {
  try {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/${props.spot.id}`
    );
    reviews.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil review:", err);
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
}
/* Bagian header utama */
.spot-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 24px;
}

/* Gambar utama */
.image-section {
  margin-top: 30px;
}

.main-image {
  width: 420px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Info Spot */
.spot-info {
  flex: 1;
}

.spot-info h2 {
  margin-bottom: 5px;
  font-size: 1.4rem;
  color: #05496c;
}

.spot-info .alamat {
  color: #555;
  margin-bottom: 8px;
}

.spot-info .rating {
  font-weight: 500;
  color: #ffb400;
  margin-bottom: 16px;
}

/* Ulasan Pengunjung */
.ulasan {
  background-color: #18647b !important;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  max-height: 250px;
  overflow-y: auto;
  color: white;
}

.no-review {
  background-color: #18647b !important;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  max-height: 250px;
  overflow-y: auto;
  color: white;
}

/* Review Card */
.review-card {
  background-color: #ffffff;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-card:hover {
  transform: translateY(-2px);
}

.review-card .user {
  font-weight: 500;
  margin-bottom: 4px;
  color: #05496c;
}

.review-card .comment {
  color: #333;
  font-size: 12px;
}

/* Tombol lihat semua */
.btn-comment {
  background-color: #ff8800;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-left: 700;
  margin-top: 10px;
}

.btn-comment:hover {
  background-color: #e57200;
}

/* Media Query */
@media (max-width: 768px) {
  .spot-header {
    align-items: center;
    flex-direction: column;
  }

  .main-image {
    width: 90%;
  }

  .spot-info {
    width: 90%;
    text-align: center;
  }
}
</style>
