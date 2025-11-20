<template>
  <div class="booking-page">
    <!-- HEADER -->
    <div class="booking-header">
      <router-link :to="`/spot/${route.query.slug}`" class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </router-link>
      <h2 class="booking-title">Form Pemesanan Tiket Mancing</h2>
    </div>

    <!-- FORM -->
    <form class="booking-form" @submit.prevent="pesanTiket">
      <div class="form-group">
        <label>Tanggal</label>
        <input type="date" v-model="form.tanggal" @change="checkJadwal" required />
      </div>

      <div class="form-group">
        <label>Jam Mulai</label>
        <div class="jam-grid">
          <button
            v-for="slot in jamTersedia"
            :key="slot.jam"
            type="button"
            class="jam-btn"
            :class="{ selected: form.jamMulai === slot.jam, penuh: slot.status === 'Penuh' }"
            :disabled="slot.status === 'Penuh'"
            @click="form.jamMulai = slot.jam"
          >
            {{ slot.jam }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>Durasi (jam)</label>
        <input type="number" v-model.number="form.durasi" min="1" placeholder="Masukkan durasi (jam)" required />
      </div>

      <div class="form-group">
        <label>Jumlah Orang</label>
        <input type="number" v-model.number="form.jumlahOrang" min="1" placeholder="Jumlah orang" required />
      </div>

      <div class="form-group">
        <label>Apakah ingin sewa alat pancing?</label>
        <select v-model="form.sewaAlat">
          <option disabled value="">Pilih opsi</option>
          <option value="tidak">Tidak, saya bawa sendiri</option>
          <option value="ya">Ya, sewa alat pancing</option>
        </select>
      </div>

      <div v-if="form.sewaAlat === 'ya'" class="form-group alat-section">
        <label>Pilih jenis alat</label>
        <select v-model="form.jenisAlat">
          <option disabled value="">Pilih jenis alat</option>
          <option v-for="alat in daftarAlat" :key="alat.nama" :value="alat.nama">
            {{ alat.nama }} — Rp{{ alat.harga.toLocaleString() }}/jam
          </option>
        </select>
      </div>

      <div v-if="totalBiaya > 0" class="total-section">
        <p><strong>Total Biaya:</strong> Rp{{ totalBiaya.toLocaleString() }}</p>
      </div>

      <button type="submit">Pesan Sekarang</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = ref({
  tanggal: "",
  jamMulai: "",
  durasi: 1,
  jumlahOrang: 1,
  sewaAlat: "",
  jenisAlat: "",
});

const semuaJam = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

const dataPenuh = {
  "2025-11-06": ["08:00", "09:00", "14:00"],
  "2025-11-07": ["07:00", "10:00"],
};

const daftarAlat = [
  { nama: "Joran & Reel Spinning", harga: 15000 },
  { nama: "Joran Bambu Tradisional", harga: 10000 },
  { nama: "Set Pancing Profesional", harga: 25000 },
];

const hargaSpotPerOrangPerJam = 20000;
const jamTersedia = ref([]);

const checkJadwal = () => {
  const tgl = form.value.tanggal;
  const penuh = dataPenuh[tgl] || [];
  jamTersedia.value = semuaJam.map(jam => ({
    jam,
    status: penuh.includes(jam) ? "Penuh" : "Tersedia"
  }));
};

const totalBiaya = computed(() => {
  if (!form.value.durasi || !form.value.jumlahOrang) return 0;
  let total = hargaSpotPerOrangPerJam * form.value.durasi * Number(form.value.jumlahOrang);
  if (form.value.sewaAlat === "ya" && form.value.jenisAlat) {
    const alat = daftarAlat.find(a => a.nama === form.value.jenisAlat);
    if (alat) total += alat.harga * form.value.durasi * Number(form.value.jumlahOrang);
  }
  return total;
});

const pesanTiket = () => {
  if (!form.value.tanggal || !form.value.jamMulai || !form.value.durasi) {
    alert("Mohon lengkapi semua field terlebih dahulu.");
    return;
  }

  const slot = jamTersedia.value.find(s => s.jam === form.value.jamMulai);
  if (slot && slot.status === "Penuh") {
    alert("Slot waktu ini sudah penuh. Silakan pilih jam lain.");
    return;
  }
  router.push({
    path: `/payment/${route.query.slug}`,
    query: { ...form.value, slug: route.query.slug },
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
