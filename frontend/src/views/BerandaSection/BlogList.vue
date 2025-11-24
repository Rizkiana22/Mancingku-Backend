<template>
  <main class="blog-list-page">
    <div class="container">
      <h1 class="title">Blog & Artikel Terbaru</h1>

      <div class="blog-grid">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="blog-card"
        >
          <img :src="`/images/blog/${post.image}`" class="thumb" />

          <div class="info">
            <h2>{{ post.title }}</h2>
            <p class="date">{{ formatDate(post.created_at) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);

onMounted(async () => {
  const api = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${api}/api/blog`);
  posts.value = res.data;
});

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
</script>

<style scoped>
.blog-list-page {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.blog-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

/* Thumbnail */
.thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .thumb {
  transform: scale(1.05);
}

/* Konten */
.info {
  padding: 20px;
}

.info h2 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 10px;
  line-height: 1.4;
}

.date {
  color: #bbb;
  font-size: 0.85rem;
  margin-top: 12px;
}

</style>
