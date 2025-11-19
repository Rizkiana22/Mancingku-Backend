<template>
  <div class="spot-header">
    <div class="image-section">
      <img :src="spot.image" alt="Spot" class="main-image" />
      <div class="gallery">
        <img
          v-for="(img, i) in spot.galeri"
          :key="i"
          :src="img"
          class="gallery-img"
          alt="galery"
        />
      </div>
    </div>

    <div class="spot-info">
      <h2>{{ spot.nama }}</h2>
      <p><strong>Kapasitas:</strong> {{ spot.capacity }} kursi</p>
      <p class="alamat">📍 {{ spot.alamat }}</p>

      <!-- RATING SPOT -->
      <p class="rating">
        <span
          v-for="i in 5"
          :key="i"
          :style="{ color: i <= Math.round(spot.rating) ? '#ffb400' : '#ddd' }"
        >
          ★
        </span>
        ({{ spot.rating?.toFixed(1) || '0.0' }})
        <span style="color:#333; font-size:13px"> • {{ ulasan.length }} ulasan</span>
      </p>

      <!-- ULASAN -->
      <h2>Ulasan Pengunjung</h2>

      <div class="ulasan" v-if="ulasan.length">
        <div
          v-for="review in ulasan"
          :key="review.id"
          class="review-card"
        >
          <p class="user">
            <strong>User #{{ review.user_id }}</strong> — ⭐ {{ review.rating }}
          </p>
          <p class="comment">{{ review.comment }}</p>
        </div>

        <div class="more-comments">
          <router-link :to="`/comment/${spot.id}`">
            <button class="btn-comment">Lihat semua</button>
          </router-link>
        </div>
      </div>

      <p v-else>Belum ada ulasan untuk tempat ini.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  spot: {
    type: Object,
    required: true,
  },
});

const API = import.meta.env.VITE_API_URL;
const ulasan = ref([]);

// FETCH ULASAN DARI BACKEND
const fetchReviews = async () => {
  try {
    const res = await fetch(`${API}/api/reviews/${props.spot.id}`);
    ulasan.value = await res.json();
  } catch (err) {
    console.error("Gagal mengambil ulasan:", err);
  }
};

onMounted(() => {
  fetchReviews();
});
</script>

<style scoped>
/* Bagian header utama */
.spot-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 24px;
}

/* Gambar utama dan galeri */
.image-section {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.main-image {
  width: 420px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.gallery {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.gallery-img {
  width: 135px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery-img:hover {
  transform: scale(1.05);
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
  background-color: #18647b;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  max-height: 250px;
  overflow-y: auto;
}

.ulasan::-webkit-scrollbar {
  width: 6px;
}
.ulasan::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.review-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-card .user {
  font-weight: 400;
  margin-bottom: 4px;
  color: #05496c;
}

.review-card .comment {
  color: #333;
  font-size: 12px;
  line-height: 1.4;
}

a {
  text-decoration: none;
}

.btn-comment {
  background-color: #ff8800;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: block;
  margin-left: auto;
  margin-top: 10px;
  transition: background 0.2s;
}

.btn-comment:hover {
  background-color: #e57200;
}

@media (max-width: 768px) {
  .spot-header {
    align-items: center;
    flex-direction: column;
  }

  .main-image {
    margin-left: 20px;
    width: 90%;
  }

  .gallery {
    justify-content: center;
  }

  .spot-info {
    width: 90%;
    text-align: center;
  }

  .ulasan {
    max-height: 200px;
  }
}
</style>
