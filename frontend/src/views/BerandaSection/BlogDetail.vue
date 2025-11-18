<template>
  <main class="blog-page">
    <div class="content-wrapper">
      <component :is="componentName" v-if="componentName" />

      <div v-else class="not-found">
        <h2>Artikel tidak ditemukan</h2>
        <router-link to="/" class="back-btn">Kembali ke Beranda</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import "@/assets/blog.css";

// Import artikel lain disini
import TipsMancingPemula from "@/components/Blog/TipsMancingPemula.vue";
import SpotMancingJabar from "@/components/Blog/SpotMancingJabar.vue";
import UmpanJituIkanMas from "@/components/Blog/UmpanJituIkanMas.vue";

export default {
  name: "BlogDetail",
  components: { Navbar, TipsMancingPemula, SpotMancingJabar, UmpanJituIkanMas },
  computed: {
    componentName() {
      const slug = this.$route.params.slug;

      if (slug === "tips-mancing-pemula") return "TipsMancingPemula";
      if (slug === "spot-mancing-jabar") return "SpotMancingJabar";
      if (slug === "umpan-jitu-ikan-mas") return "UmpanJituIkanMas";

      return null;
    }
  }
};
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

.cover-img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  margin-bottom: 2rem;
  font-size: 14px;
}

.blog-content {
  font-size: 18px;
  line-height: 1.8;
  color: #222;
}

.blog-content h2 {
  margin-top: 1.7rem;
  margin-bottom: .5rem;
  font-size: 22px;
  color: #004160;
  font-weight: 600;
}

.blog-content p {
  margin-bottom: .9rem;
}

.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.back-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: .6rem 1.2rem;
  background: #0077c2;
  color: #fff;
  border-radius: 6px;
}

/* Mobile */
@media(max-width:768px) {
  h1 { font-size: 26px; }
  .blog-content { font-size: 17px; }
}
</style>
