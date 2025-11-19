<template>
  <main class="blog-page">
    <Navbar />

    <div class="content-wrapper" v-if="post">
      <!-- Title -->
      <h1>{{ post.title }}</h1>

      <!-- Meta -->
      <div class="meta">
        <span>{{ post.author }}</span> ·
        <span>{{ new Date(post.created_at).toLocaleDateString("id-ID", { 
          day: "numeric", month: "long", year: "numeric" 
        }) }}</span>
      </div>

      <!-- Cover -->
      <img :src="`/images/blog/${post.image}`" class="cover-img" />

      <!-- Article Content -->
      <div class="blog-content" v-html="post.content"></div>
    </div>

    <div v-else class="not-found">
      <h2>Artikel tidak ditemukan</h2>
      <router-link to="/" class="back-btn">Kembali</router-link>
    </div>
  </main>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const slug = route.params.slug;
  const api = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.get(`${api}/api/blog/${slug}`);
    post.value = res.data;
  } catch {
    post.value = null;
  }
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
.blog-page {
  background: #fff;
  padding-bottom: 3rem;
}

.content-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 2rem 1.5rem;
}

/* Judul */
h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: #111;
}

/* Meta */
.meta {
  color: #666;
  margin-bottom: 1.8rem;
  font-size: 14px;
}

/* Cover image */
.cover-img {
  width: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2rem;
}

/* Konten utama */
.blog-content {
  font-size: 18px;
  line-height: 1.8;
  color: #222;
}

/* Heading di konten */
.blog-content h2 {
  margin-top: 1.7rem;
  margin-bottom: .6rem;
  font-size: 22px;
  color: #004160;
  font-weight: 600;
}

/* Paragraf */
.blog-content p {
  margin-bottom: .9rem;
}

/* List */
.blog-content ul,
.blog-content ol {
  padding-left: 1.3rem;
  margin-bottom: 1.2rem;
}

.blog-content li {
  margin-bottom: .4rem;
}

/* Blockquote */
.blog-content blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.4rem;
  border-left: 4px solid #0077c2;
  background: #f5faff;
  font-style: italic;
  color: #333;
  border-radius: 6px;
}

/* Mobile */
@media(max-width:768px) {
  h1 { font-size: 26px; }
  .blog-content { font-size: 17px; }
  .cover-img { max-height: 250px; }
}

</style>
