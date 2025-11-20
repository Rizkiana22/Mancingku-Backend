<template>
  <div class="booking-page">
    <!-- HEADER -->
    <div class="booking-header">
      <router-link :to="`/spot/${route.query.slug}`" class="btn-back">
        ←
      </router-link>
      <h2 class="booking-title">Form Pemesanan Tiket Mancing</h2>
    </div>

    <!-- FORM -->
    <form class="booking-form" @submit.prevent="pesanTiket">
      
      <!-- TANGGAL -->
      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" required />
      </div>

      <!-- PILIH SESI -->
      <div class="form-group">
        <label>Pilih Sesi</label>

        <div v-if="sessions.length === 0">Memuat sesi...</div>

        <div class="session-grid">
          <button
            v-for="s in sessions"
            :key="s.id"
            type="button"
            class="session-btn"
            :class="{ selected: form.session_id === s.id, penuh: s.seats_left === 0 }"
            :disabled="s.seats_left === 0"
            @click="form.session_id = s.id"
          >
            <strong>{{ s.session_name }}</strong><br>
            {{ s.start_time.slice(0,5) }} - {{ s.end_time.slice(0,5) }}<br>
            Harga: Rp {{ s.price.toLocaleString() }}<br>
            Sisa kursi: {{ s.seats_left }}
          </button>
        </div>
      </div>

      <!-- JUMLAH ORANG -->
      <div class="form-group">
        <label>Jumlah Orang</label>
        <input type="number" v-model.number="form.jumlahOrang" min="1" required />
      </div>

      <!-- SEWA ALAT -->
      <div class="form-group">
        <label>Sewa Alat Pancing?</label>
        <select v-model="form.sewaAlat">
          <option value="">Pilih</option>
          <option value="tidak">Tidak</option>
          <option value="ya">Ya</option>
        </select>
      </div>

      <!-- JENIS ALAT -->
      <div v-if="form.sewaAlat === 'ya'" class="form-group">
        <label>Pilih Jenis Alat</label>
        <select v-model="form.jenisAlat">
          <option value="">Pilih alat</option>
          <option v-for="alat in daftarAlat" :key="alat.nama" :value="alat.nama">
            {{ alat.nama }} — Rp{{ alat.harga.toLocaleString() }}
          </option>
        </select>
      </div>

      <!-- TOTAL BIAYA -->
      <div v-if="totalBiaya > 0" class="total-section">
        <p><strong>Total Biaya:</strong> Rp{{ totalBiaya.toLocaleString() }}</p>
      </div>

      <button type="submit">Pesan Sekarang</button>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const form = ref({
  tanggal: "",
  session_id: null,
  jumlahOrang: 1,
  sewaAlat: "",
  jenisAlat: "",
});

const sessions = ref([]);

// LOAD SEMUA SESI UNTUK SPOT INI
const loadSessions = async () => {
  try {
    const res = await axios.get(`/api/${route.params.id}/sessions`);
    sessions.value = res.data;
  } catch (err) {
    console.error("Gagal load sesi", err);
  }
};

onMounted(loadSessions);

const daftarAlat = [
  { nama: "Joran & Reel Spinning", harga: 15000 },
  { nama: "Joran Bambu Tradisional", harga: 10000 },
  { nama: "Set Pancing Profesional", harga: 25000 },
];

// HITUNG TOTAL
const totalBiaya = computed(() => {
  if (!form.value.session_id) return 0;

  const session = sessions.value.find(s => s.id === form.value.session_id);
  if (!session) return 0;

  let total = session.price * form.value.jumlahOrang;

  if (form.value.sewaAlat === "ya" && form.value.jenisAlat) {
    const alat = daftarAlat.find(a => a.nama === form.value.jenisAlat);
    if (alat) {
      total += alat.harga * form.value.jumlahOrang;
    }
  }

  return total;
});

// KIRIM BOOKING
const pesanTiket = async () => {
  if (!form.value.tanggal || !form.value.session_id) {
    alert("Harap pilih tanggal dan sesi!");
    return;
  }

  const payload = {
    user_id: localStorage.getItem("userId"),
    spot_id: route.params.id,
    session_id: form.value.session_id,
    booking_date: form.value.tanggal,
    jumlah_orang: form.value.jumlahOrang
  };

  await axios.post("/api/bookings", payload);

  router.push({
    path: `/payment/${route.query.slug}`,
    query: { total: totalBiaya.value }
  });
};
</script>

<style scoped>
.booking-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.booking-header {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}

.btn-back {
  position: absolute;
  left: 0;
  background: #0077cc;
  padding: 10px 14px;
  border-radius: 6px;
  color: white;
  text-decoration: none;
}

.session-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 10px;
}

.session-btn {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f7f7f7;
}

.session-btn.selected {
  background: #0077cc;
  color: white;
}

.session-btn.penuh {
  background: #ffdddd;
  color: #a00;
  border-color: #ff8888;
  cursor: not-allowed;
}
</style>
