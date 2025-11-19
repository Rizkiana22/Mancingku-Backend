<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const latestPosts = ref([]);

onMounted(async () => {
  try {
    const api = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${api}/api/blog`);
    latestPosts.value = res.data.slice(0, 3);
  } catch (err) {
    console.error("Gagal ambil blog:", err);
  }
});

// ringkas konten jadi 20 kata
function summarize(html) {
  const text = html.replace(/<[^>]*>/g, " ");
  return text.split(" ").slice(0, 20).join(" ") + "...";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <div class="blog-section">
    <h2>Blog & Artikel Terbaru</h2>

    <div class="blog-cards">
      <router-link
        v-for="post in latestPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="blog-card"
      >
        <div class="blog-image">
          <img :src="`/images/blog/${post.image}`" :alt="post.title" />
        </div>

        <div class="blog-content">
          <h3>{{ post.title }}</h3>
          <p>{{ summarize(post.content) }}</p>

          <div class="blog-meta">
            <span>{{ formatDate(post.created_at) }}</span>
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
