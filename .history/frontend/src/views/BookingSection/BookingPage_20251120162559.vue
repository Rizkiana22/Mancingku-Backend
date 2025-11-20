<template>
  <div class="booking-page">
    <!-- HEADER -->
    <div class="booking-header">
      <router-link :to="`/spot/${route.params.slug}`" class="btn-back">
        ←
      </router-link>
      <h2 class="booking-title">Form Pemesanan Tiket Mancing</h2>
    </div>

    <!-- FORM -->
    <form class="booking-form" @submit.prevent="pesanTiket">

      <!-- Tanggal -->
      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" required />
      </div>

      <!-- PILIH SESI (pengganti jam) -->
      <div class="form-group">
        <label>Pilih Sesi</label>

        <div v-if="sessions.length === 0">Memuat sesi...</div>

        <div class="jam-grid">
          <button
            v-for="s in sessions"
            :key="s.id"
            type="button"
            class="jam-btn"
            :class="{ selected: form.session_id === s.id, penuh: s.seats_left === 0 }"
            :disabled="s.seats_left === 0"
            @click="form.session_id = s.id"
          >
            {{ s.session_name }} <br>
            {{ s.start_time.slice(0,5) }} - {{ s.end_time.slice(0,5) }} <br>
            Sisa: {{ s.seats_left }}
          </button>
        </div>
      </div>

      <!-- Jumlah Orang -->
      <div class="form-group">
        <label>Jumlah Orang</label>
        <input type="number" v-model.number="form.jumlahOrang" min="1" required />
      </div>

      <!-- Sewa alat -->
      <div class="form-group">
        <label>Apakah ingin sewa alat pancing?</label>
        <select v-model="form.sewaAlat">
          <option value="">Pilih opsi</option>
          <option value="tidak">Tidak</option>
          <option value="ya">Ya, sewa alat</option>
        </select>
      </div>

      <!-- Jenis alat -->
      <div v-if="form.sewaAlat === 'ya'" class="form-group">
        <label>Pilih jenis alat</label>
        <select v-model="form.jenisAlat">
          <option v-for="alat in daftarAlat" :key="alat.nama" :value="alat.nama">
            {{ alat.nama }} — Rp{{ alat.harga.toLocaleString() }}
          </option>
        </select>
      </div>

      <!-- TOTAL -->
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

const loadSessions = async () => {
  try {
    const res = await axios.get(`/api/${route.params.spotId}/sessions`);
    sessions.value = res.data;
  } catch (err) {
    console.error("Gagal memuat sesi:", err);
  }
};


onMounted(loadSessions);

const daftarAlat = [
  { nama: "Joran & Reel Spinning", harga: 15000 },
  { nama: "Joran Bambu Tradisional", harga: 10000 },
  { nama: "Set Pancing Profesional", harga: 25000 },
];

const totalBiaya = computed(() => {
  if (!form.value.session_id) return 0;

  const session = sessions.value.find(s => s.id === form.value.session_id);
  if (!session) return 0;

  let total = session.price * form.value.jumlahOrang;

  if (form.value.sewaAlat === "ya" && form.value.jenisAlat) {
    const alat = daftarAlat.find(a => a.nama === form.value.jenisAlat);
    if (alat) total += alat.harga * form.value.jumlahOrang;
  }

  return total;
});

const pesanTiket = async () => {
  if (!form.value.tanggal || !form.value.session_id) {
    alert("Harap pilih tanggal & sesi!");
    return;
  }

  const payload = {
    user_id: localStorage.getItem("userId"),
    spot_id: route.query.id,   // ← FIX DISINI
    session_id: form.value.session_id,
    booking_date: form.value.tanggal,
    jumlah_orang: form.value.jumlahOrang,
  };

  try {
    await axios.post("/api/bookings", payload);

    router.push({
      path: `/payment/${route.params.slug}`, // INI BENAR
      query: { total: totalBiaya.value }
    });

  } catch (error) {
    console.error("Error booking:", error);
  }
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
  font-family: "Poppins", sans-serif;
}

/* Header Section */
.booking-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.booking-title {
  color: #05496c;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
}

/* Tombol back elegan */
.btn-back {
  position: absolute;
  left: 0;
  background: #0077cc;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.btn-back:hover {
  background: #005fa3;
}

/* Form styling */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group input,
.form-group select,
.jam-btn {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0077cc;
  box-shadow: 0 0 4px rgba(0, 119, 204, 0.3);
}

button[type="submit"] {
  background-color: #0077cc;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background-color: #005fa3;
}

/* Jam grid */
.jam-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
}

.jam-btn {
  cursor: pointer;
  background: #f7f7f7;
}

.jam-btn.selected {
  background: #0077cc;
  color: #fff;
}

.jam-btn.penuh {
  background: #ffcccc;
  color: #a00;
  cursor: not-allowed;
}

/* Responsif */
@media (max-width: 600px) {
  .booking-page {
    margin: 20px;
    padding: 1.5rem;
  }
  .booking-title {
    font-size: 1.3rem;
  }
  .btn-back {
    width: 36px;
    height: 36px;
  }
}
</style>
