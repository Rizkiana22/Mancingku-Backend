<template>

  <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeModalSuccess">
  <div class="success-content">
    <h2>Pembayaran Berhasil</h2>
    <p>Terima kasih, pesanan kamu sudah dikonfirmasi.</p>
    <router-link :to="{path: `/profile`}">
    <button class="btn-close" @click="closeModalSuccess">Lihat Tiket</button>
    </router-link>
  </div>
</div>

  <div class="payment-page">
    <h2 class="title">Pembayaran Tiket Mancing</h2>

    <div class="btn-back">
     <router-link :to="{ path: `/BookingPage/${route.query.spotId}/${route.query.slug}`}">
        <button>←</button>
      </router-link>
    </div>

    <div class="payment-container">
      <!-- Metode Pembayaran -->
      <div class="payment-methods">
        <h3>Metode Pembayaran</h3>
        <hr />

        <div
          v-for="(method, index) in methods"
          :key="index"
          class="method"
          :class="{ active: selectedMethod === method.name }"
          @click="selectMethod(method.name)"
        >
          <img :src="method.logo" :alt="method.name" />
          <span>{{ method.name }}</span>
        </div>
      </div>

      <!-- Rincian Biaya -->
      <div class="payment-summary">
        <h3>Rincian Biaya</h3>
        <hr />
        <div class="summary-item">
          <div>
            <p>Subtotal Pesanan</p>
            <small>Nama Tempat: {{ nama }}</small
            ><br />
            <small>tanggal: {{ formatTanggal(tanggal) }}</small
            ><br />
            <small>Sesi: {{ sessionName }}</small><br />
            <small>Jam Mulai: {{formatTime(jamMulai)}} - {{ formatTime(jamSelesai) }}</small>
          </div>
          <span>Rp{{ formatNumber(subtotal) }}</span>
        </div>

        <div class="summary-item">
          <p>Pajak & Layanan</p>
          <span>Rp{{ formatNumber(pajak) }}</span>
        </div>

        <div class="total">
          <p>Total Pembayaran</p>
          <h2>Rp {{ formatNumber(total) }}</h2>
        </div>

        <button class="btn-pay" @click="lanjutkanPembayaran">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>

    <div v-if="showQRISModal" class="modal-overlay" @click.self="closeModal">
      <div class="QRIS-content">
        <h3>Pembayaran</h3>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Mancingku-QRIS-Dummy"
          alt="QRIS"
          class="qris-image"
        />
        <p>
          Scan QR Ini untuk Pembayaran<strong
            >Rp {{ formatNumber(total) }}</strong
          >
        </p>
          <button class="btn-close" @click="closeModal">Kembali</button>
      </div>
    </div>

    <div v-if="showBCAModal" class="modal-overlay" @click.self="closeModal">
      <div class="BCA-content">
        <h3>Pembayaran Melalui BCA</h3>
        <p>Total Pembayaran:</p>
        <h3>Rp {{ formatNumber(total) }}</h3>

        <div class="va-box">
          <p>Nomor Virtual Account:</p>
          <h3>827308912389123</h3>

          <p class="info">
            Silahkan transfer ke nomor VA di atas melalui:
            <br />
            <b>BCA Mobile / MY BCA / ATM BCA</b>
          </p>
          <button class="btn-close" @click="closeModal">Kembali</button>
        </div>
      </div>
    </div>

    <div v-if="showMandiriModal" class="modal-overlay" @click.self="closeModal">
      <div class="Mandiri-content">
        <h3>Pembayaran Melalui Mandiri</h3>
        <p>Total Pembayaran:</p>
        <h3>Rp {{ formatNumber(total) }}</h3>

        <div class="va-box">
          <p>Nomor Virtual Account:</p>
          <h3>827308912389123</h3>

          <p class="info">
            Silahkan transfer ke nomor VA di atas melalui:
            <br />
            <b>Livin By Mandiri / ATM Mandiri</b>
          </p>
          <button class="btn-close" @click="closeModal">Kembali</button>
        </div>
      </div>
    </div>

    <div v-if="showDanaModal" class="modal-overlay" @click.self="closeModal">
      <div class="Dana-content">
        <h3>Pembayaran Melalui Dana</h3>
        <p>Total Pembayaran:</p>
        <h3>Rp {{ formatNumber(total) }}</h3>

        <div class="No-box">
          <p>Nomor Dana:</p>
          <h3>0821313213</h3>

          <p class="info">
            Silahkan transfer ke nomor DANA di atas melalui:
            <br />
            <b>E - Wallet kesayangan</b>
          </p>
          <button class="btn-close" @click="closeModal">Kembali</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const booking = ref(null);
const subtotal = ref(Number(route.query.total_amount) || 0);
const pajak = 2500;
const total = ref(subtotal.value + pajak);

onMounted(async () => {
  try {
    const res = await axios.get(`/api/payments/booking/${route.params.bookingId}`);

    booking.value = res.data;

    subtotal.value = booking.value.total_amount;
    total.value = subtotal.value + pajak;
  } catch (err) {
    console.error("Gagal memuat booking:", err);
  }
});

// Query untuk tampilan
const nama = route.query.namaSpot || "-";
const tanggal = route.query.tanggal || "-";
const jamMulai = route.query.jamMulai || "-";
const jamSelesai = route.query.jamSelesai || "-";
const sessionName = route.query.sessionName || "-";

// metode pembayaran
const methods = [
  { name: "QRIS", logo: "https://tse1.mm.bing.net/th/id/OIP.SJk3_1NbGUAvZ-bJslHM4wHaC0?pid=Api&P=0&h=180" },
  { name: "BCA", logo: "https://tse2.mm.bing.net/th/id/OIP.SIiH0GXVJKMQl0Lary6_rQHaHa?pid=Api&P=0&h=180" },
  { name: "Mandiri", logo: "https://tse4.mm.bing.net/th/id/OIP.L2HwHrcAI66hMbOuhvYH-wHaFj?pid=Api&P=0&h=180" },
  { name: "Dana", logo: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/01gmcdxz8g143r0r2kebz7gpsf.jpg" },
];

const selectedMethod = ref(null);

const showQRISModal = ref(false);
const showBCAModal = ref(false);
const showMandiriModal = ref(false);
const showDanaModal = ref(false);

const selectMethod = method => {
  selectedMethod.value = method;
};

const lanjutkanPembayaran = () => {
  if (!selectedMethod.value) return alert("Pilih metode pembayaran dulu!");

  if (selectedMethod.value === "QRIS") showQRISModal.value = true;
  if (selectedMethod.value === "BCA") showBCAModal.value = true;
  if (selectedMethod.value === "Mandiri") showMandiriModal.value = true;
  if (selectedMethod.value === "Dana") showDanaModal.value = true;

  setTimeout( async () => {
    closeModal();
    showSuccessModal.value = true;

    try{
      const api = import.meta.env.VITE_API_URL;
      await axios.put(`${api}/api/bookings/${route.params.bookingId}/status`);
      console.log("berhasil");
    }catch(err){
      console.error("gaga", err);
    }
  }, 5000);
};

const closeModal = () => {
  showQRISModal.value = false;
  showBCAModal.value = false;
  showMandiriModal.value = false;
  showDanaModal.value = false;
};

const formatNumber = num => (num ? num.toLocaleString("id-ID") : "0");
const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.slice(0, 5);
};
const formatTanggal = (tgl) => {
  const date = new Date(tgl);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};
 
const showSuccessModal =  ref(false);
const closeModalSuccess = () => {
  showSuccessModal.value = false;
};


</script>


<style scoped>

.success-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  width: 350px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  animation: fadeIn 0.3s ease;
}

.success-content h2 {
  color: #28a745;
  margin-bottom: 10px;
}

.btn-back{
 width: 100%;
 display: flex;
 justify-content:left;
 align-items: center;
 padding-left: 20vh;
  margin-bottom: 10px;
  position: relative;
  top: -59px;
}

.btn-back button{
  background: transparent;
  color:#fff;
  border: none;
  font-size: 50px;
  
}

.btn-back button:hover{
  color: #f79e1b; 
}

.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(to bottom right, #004d73, #007fa3);
  min-height: 100vh;
  color: #222;
}

.title {
  color: #fff;
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-align: center;
}

.payment-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

/* === Metode Pembayaran === */
.payment-methods {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.payment-methods h3 {
  margin-bottom: 10px;
}

.method {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.method img {
  width: 35px;
  height: 35px;
  object-fit: contain;
}

.method:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.method.active {
  border: 2px solid #f79e1b;
  background-color: #fff8e7;
}

/* === Ringkasan Biaya === */
.payment-summary {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.payment-summary h3 {
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 12px 0;
  color: #555;
}

.summary-item span{
  padding-top: 15px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.total h2 {
  color: #f79e1b;
}

.btn-pay {
  width: 100%;
  background: #f79e1b;
  color: white;
  font-weight: bold;
  border: none;
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-pay:hover {
  background: #e38c00;
}

/*TOMBOL CLOSE */
.btn-close {
  background: #e57200;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-close:hover {
  background: #c55c00;
}


/*QRIS*/
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.QRIS-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.qris-image {
  margin: 15px 0;
  width: 200px;
  height: 200px;
}

/*BCA*/
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.BCA-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.va-box {
  background: #f1f1f1;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
}

.info {
  font-size: 14px;
  color: #444;
  margin-top: 8px;
}

/*MANDIRI */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.Mandiri-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.va-box {
  background: #f1f1f1;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
}

.info {
  font-size: 14px;
  color: #444;
  margin-top: 8px;
}


/*DANA */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.Dana-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.No-box {
  background: #f1f1f1;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
}

.info {
  font-size: 14px;
  color: #444;
  margin-top: 8px;
}
/* === Responsif untuk mobile === */
@media (max-width: 964px) {
  .title {
  color: #fff;
  margin-bottom: 5px;
  font-size: 1.4rem;
  text-align: center;
}
  .payment-container {
    flex-direction: column;
    align-items: center;
  }

  .payment-methods,
  .payment-summary {
    width: 90%;
  }

.btn-back {
    position: relative;
    top: -90px;            
    padding-left: 5px;   
    margin-bottom: 5px;  
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .btn-back button {
    background: transparent;
    color: #fff;
    border: none;
    font-size: 40px;      /* lebih kecil di HP */
    cursor: pointer;
  }

  .btn-back button:hover {
    color: #f79e1b;       /* efek hover */
  }
}

@media (max-width: 359px) {

  .title {
  color: #fff;
  margin-bottom: 5px;
  font-size: 1.4rem;
  text-align: center;
}
  .payment-container {
    flex-direction: column;
    align-items: center;
  }

  .payment-methods,
  .payment-summary {
    width: 90%;
  }

.btn-back {
    position: relative;
    top: -120px;            
    padding-left: 10px;   
    margin-bottom: 5px;  
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .btn-back button {
    background: transparent;
    color: #fff;
    border: none;
    font-size: 40px;      /* lebih kecil di HP */
    cursor: pointer;
  }

  .btn-back button:hover {
    color: #f79e1b;       /* efek hover */
  }
}
</style>
