<template>
  <div class="comment-page">
    <div v-if="loading" class="loading">Memuat komentar...</div>
    <div v-else>
      <div class="nama-tempat">
          <center><h2>{{ spot.nama }}</h2></center>
          <center><p>Ulasan Pengunjung</p></center>
          <router-link :to="`/spot/${spot.slug}`" class="btn-back">
             ←       
          </router-link>
      </div>

      <div class="add-comment">
        <router-link :to="`/comment/add/${spot.id}`" class="btn-tambah">
        Tambah Komentar
        </router-link>
      </div>


      <div v-if="spot.ulasan && spot.ulasan.length">
        <div
          v-for="review in spot.ulasan"
          :key="review.id"
          class="review-card"
        >
          <p class="user">
            <strong>{{ review.user }}</strong> — ⭐ {{ review.stars }}
          </p>
          <p class="comment">{{ review.komentar }}</p>
        </div>
      </div>
      <p v-else>Belum ada ulasan untuk tempat ini.</p>

      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Ambil ID dari URL
const route = useRoute()
const spot = ref({})
const loading = ref(true)

// 🔹 Dummy data (harus sama seperti di DetailSpot)
const dummyData = [
  {
    id: 1,
    slug: "saung-kemangi",
    nama: "Saung Kemangi",
    ulasan: [
      { id: 1, user: "U***", komentar: "Tempat nyaman dan tenang", stars: "4.5" },
      { id: 2, user: "D***", komentar: "Kolam luas, cocok untuk keluarga", stars: "4.5" },
      { id: 3, user: "E***", komentar: "Pelayanan ramah dan cepat", stars: "5" },
      { id: 4, user: "N***", komentar: "Sedikit ramai di akhir pekan", stars: "4" },
      { id: 5, user: "R***", komentar: "Ikan besar-besar, tapi agak susah dapatnya, cocok buat yang suka tantangan.", stars: "4.2" },
      { id: 6, user: "A***", komentar: "Tempatnya bersih, tersedia warung makan dan area parkir cukup luas. Anak-anak juga bisa ikut mancing kecil-kecilan.", stars: "4.8" },
      { id: 7, user: "M***", komentar: "Harga umpan dan sewa alat lumayan mahal, tapi pengalaman memancing di sini tetap menyenangkan.", stars: "3.9" },
      { id: 8, user: "S***", komentar: "Air kolamnya jernih dan ikannya aktif, jadi seru banget kalau dapat strike terus!", stars: "5" },
      { id: 9, user: "T***", komentar: "Lokasi agak jauh dari jalan utama, tapi suasananya benar-benar damai. Cocok buat melepas stres.", stars: "4.7" },
      { id: 10, user: "Y***", komentar: "Tempat pemancingannya bagus tapi kurang tempat berteduh, jadi agak panas di siang hari.", stars: "4" },
      { id: 11, user: "L***", komentar: "Sudah beberapa kali ke sini, selalu puas. Stafnya sigap kalau ada masalah dengan alat atau ikan lepas.", stars: "4.9" },
      { id: 12, user: "P***", komentar: "Toiletnya bersih dan terawat, hal kecil tapi penting. Makanannya juga lumayan enak.", stars: "4.6" },
      { id: 13, user: "K***", komentar: "Sayang sekali waktu datang, hujan deras dan air kolam keruh. Tapi staf tetap melayani dengan baik.", stars: "4" },
      { id: 14, user: "F***", komentar: "Kolam khusus ikan mas dan patin sangat direkomendasikan! Banyak ikan besar dan suasananya adem.", stars: "5" },
      { id: 15, user: "H***", komentar: "Tempat parkir agak sempit, tapi secara keseluruhan tempatnya enak buat nongkrong sambil mancing.", stars: "4.3" },
      { id: 16, user: "I***", komentar: "Datang pagi-pagi dan langsung dapat ikan besar! Rasanya puas banget, apalagi sambil minum kopi dari warung sebelah.", stars: "4.8" },
      { id: 17, user: "W***", komentar: "Sangat direkomendasikan untuk pemancing pemula. Pengelola sabar menjelaskan cara pakai alat dan umpan yang cocok.", stars: "5" },
      { id: 18, user: "J***", komentar: "Kurang pencahayaan kalau malam, jadi agak susah kalau mancing malam hari.", stars: "3.8" },
      { id: 19, user: "O***", komentar: "Suasananya alami banget, dikelilingi pepohonan dan suara air mengalir. Serasa di pedesaan.", stars: "4.9" },
      { id: 20, user: "B***", komentar: "Salah satu tempat pemancingan terbaik yang pernah saya kunjungi. Kolam terawat, ikan sehat, dan pengelola benar-benar memperhatikan kenyamanan pengunjung.", stars: "5" }
    ]
  },
  {
    id: 2,
    slug: "situ-ciburuy",
    nama: "Situ Ciburuy",
    ulasan: [
      { id: 1, user: "A***", komentar: "Tempat nya enak dan dijamin STRIKEE!!!", stars: "4.5" },
      { id: 2, user: "U**S", komentar: "Tempat nya nyaman banget bOssss", stars: "4.5" },
  ]
  }
]

// 🔹 Cari spot berdasarkan ID dari route
onMounted(() => {
  const id = parseInt(route.params.id)
  const found = dummyData.find(s => s.id === id)
  if (found) {
    spot.value = found
  } else {
    spot.value = { nama: "Spot tidak ditemukan", ulasan: [] }
  }
  loading.value = false
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
  position: absolute;     /* supaya bisa ditempatkan bebas di area nama-tempat */
  top: 5px;              /* geser lebih ke atas */
  font-size: 45px;        /* 🔹 perbesar ukuran panah */
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
  text-align: right; /* posisi tombol di kanan */
  margin: 1rem 0;
}

/* tombolnya */
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
@media (max-width : 768px){
  .btn-back {
  position: absolute;     /* supaya bisa ditempatkan bebas di area nama-tempat */
  top: 5px;              /* geser lebih ke atas */
  font-size: 30px;        /* 🔹 perbesar ukuran panah */
  font-weight: 300;
  color: black;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  line-height: 1;
  margin-top: 80px;
}

.btn-tambah {
  display: inline-block;
  background-color: #da9723;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2);
}


}
</style>