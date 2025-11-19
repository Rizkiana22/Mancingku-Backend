<template>
  <main class="blog-list-page">
    <div class="container">
      <h1 class="title">Artikel Terbaru</h1>

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
.container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
.title {
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-decoration: none;
  color: black;
  transition: 0.2s;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.thumb {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.info {
  padding: 1rem;
}

.info h2 {
  font-size: 20px;
  font-weight: 600;
}

.date {
  font-size: 14px;
  color: #666;
  margin-top: .4rem;
}
</style>
