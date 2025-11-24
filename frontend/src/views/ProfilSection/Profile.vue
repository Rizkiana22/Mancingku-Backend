<template>
  <div class="profile-container">
    <aside class="sidebar">
      <div class="menu">
        <!-- Profil -->
        <div
          class="menu-item"
          :class="{ active: activeMenu === 'profil' }"
          @click="activeMenu = 'profil'"
        >
          <i class="ri-user-3-line"></i>
          <span>Profil</span>
        </div>

        <!-- Tiket Saya -->
        <div class="menu-item" @click="toggleTicketMenu">
          <i class="ri-ticket-line"></i>
          <span>Tiket Saya</span>
          <i
            class="ri-arrow-down-s-line arrow"
            :class="{ open: showTickets }"
          ></i>
        </div>

        <!-- Dropdown daftar tiket -->
        <ul v-show="showTickets" class="ticket-dropdown">
          <li
            v-for="ticket in tickets"
            :key="ticket.id"
            @click="selectTicket(ticket)"
            class="ticket-item"
          >
            • {{ ticket.spot_name }}
          </li>
        </ul>
      </div>
    </aside>

    <!-- Content -->
    <main class="profile-content">
      <h2>{{ pageTitle }}</h2>

      <!-- === PROFIL === -->
      <div v-if="activeMenu === 'profil'">
        <form class="profile-form">
          <label>
            Username
            <input type="text" v-model="username" readonly />
          </label>

          <label>
            Nama Lengkap
            <input
              type="text"
              v-model="name"
              placeholder="Masukan nama lengkap Anda"
            />
          </label>

          <label>
            Email
            <input type="email" v-model="email" readonly />
          </label>

          <label>
            Nomor Telepon
            <input
              type="text"
              v-model="phone"
              placeholder="contoh: 081234567"
            />
          </label>

          <div class="save-container">
            <button class="btn-save" @click.prevent="saveProfile">Simpan</button>
          </div>
        </form>
      </div>

      <!-- === DETAIL TIKET === -->
      <div v-else-if="activeMenu === 'tiket' && selectedTicket">
        <div class="ticket-detail">
          <h3>{{ selectedTicket.spot_name}}</h3>
          <p><strong>Tanggal:</strong> {{formatTanggal( selectedTicket.booking_date )}}</p>
          <p><strong>Sesi:</strong> {{ selectedTicket.session_name }} 
           ({{ formatJam(selectedTicket.start_time) }} - {{ formatJam(selectedTicket.end_time) }})
          </p>

          <p><strong>Jumlah:</strong> {{ selectedTicket.jumlah_orang }} tiket</p>
          <p><strong>Harga:</strong> Rp {{ formatNumber(selectedTicket.total_amount) }}</p>

          <!-- Barcode -->
          <div class="barcode-wrapper">
           <img :src="qrS" alt="Barcode Tiket" class="barcode-img" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import QRcode from "qrcode";


const activeMenu = ref("profil");
const showTickets = ref(false);
const selectedTicket = ref(null);
const tickets  = ref([]);
// === DATA USER ===
const username = ref("");
const name = ref("");    
const email = ref("");
const phone = ref("");

// === AMBIL DATA USER DARI LOCALSTORAGE + DATABASE ===
onMounted(async () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return;

  const userObj = JSON.parse(storedUser);

  email.value = userObj.email;
  username.value = userObj.email.split("@")[0];

  try {
    const api = import.meta.env.VITE_API_URL;

    const res = await axios.get(`${api}/api/user/${userObj.id}`);

    name.value = res.data.name || "";
    phone.value = res.data.phone || "";

    //ambil tiket user
   const resTickets = await axios.get(`${api}/api/bookings/user/${userObj.id}`);
    tickets.value = resTickets.data;
  } catch (err) {
    console.error("Gagal mengambil data user:", err);
  }
});

// === Title Halaman ===
const pageTitle = computed(() =>
  activeMenu.value === "profil"
    ? "Profil Saya"
    : selectedTicket.value
    ? "Detail Tiket"
    : "Tiket Saya"
);

function toggleTicketMenu() {
  showTickets.value = !showTickets.value;
}

function selectTicket(ticket) {
  activeMenu.value = "tiket";
  selectedTicket.value = ticket;
  generateQr(ticket);
}

const qrS= ref("");

const generateQr = (ticket) => {
  const api = import.meta.env.VITE_API_URL;
  const data = `${api}/api/bookings/${ticket.id}`;

  QRcode.toDataURL(data)
  .then(url => {
    qrS.value = url;
  })
  .catch(err => console.error(err));
};


async function saveProfile() {
  const storedUser = localStorage.getItem("user");
  if(!storedUser)return;

  const userObj = JSON.parse(storedUser);
  const api  = import.meta.env.VITE_API_URL;

  try{
    await axios.put(`${api}/api/user/${userObj.id}`, {
      name: name.value, 
      phone: phone.value,
    });
    alert("profil berhasil disimpan!");
  }catch(err){
    alert("gagal menyimpan profil");
    console.error(err);
  }
}

const formatTanggal = (tgl) => {
  const date = new Date(tgl);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

const formatNumber = (num) => {
  if (!num) return "0";
  return Number(num).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const formatJam = (jam) => {
  if (!jam) return "-";

  // Misal input "13:00:00"
  const [h, m] = jam.split(":");
  return `${h}:${m}`;
};

</script>


<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.min.css");

.profile-container {
  display: flex;
  height: 90vh;
  background: linear-gradient(135deg, #005f85, #00344d);
  color: #fff;
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
}

.ticket-owner {
  margin-top: 10px;
  background: #f6f6f6;
  padding: 10px 12px;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

/* Barcode */
.barcode-wrapper {
  margin-top: 20px;
  text-align: center;
}

.barcode-img {
  width: 180px;
  height: auto;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
}

.ticket-code {
  margin-top: 6px;
  font-size: 14px;
  color: #222;
  background: #fff;
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: #002c3e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #bbb;
  font-size: 16px;
  transition: 0.3s;
}

.menu-item.active,
.menu-item:hover {
  color: #ffb341;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}
.arrow.open {
  transform: rotate(180deg);
}

/* Dropdown daftar tiket */
.ticket-dropdown {
  margin-left: 30px;
  list-style: none;
  padding: 0;
  margin-top: 2px;
}

.ticket-item {
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  margin: 4px 0;
  transition: color 0.2s;
}

.ticket-item:hover {
  color: #ffb341;
}

/* Content */
.profile-content {
  flex: 1;
  background: linear-gradient(to bottom right, #035e83, #004160);
  padding: 50px 60px 60px 120px;
  overflow-y: auto;
}

h2 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 30px;
}

/* Form profil */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #fff;
}

input {
  margin-top: 6px;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 15px;
  background: #e8e8e8;
  color: #000000;
}

input[readonly] {
  color: #000000;
}

.save-container {
  justify-content: center;
  display: flex;
}

.btn-save {
  border: none;
  border-radius: 5px;
  width: 20vh;
  background-color: #ffb341;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  transition: 0.3s;
}

.btn-save:hover {
  background-color: #e28e00;
}

/* Detail tiket */
.ticket-detail {
  background: #ffffff;
  color: #333;
  border-radius: 10px;
  padding: 25px;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    background: #004160;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 20px;
  }

  .profile-content {
    padding: 20px;
    background: #004160;
  }

  h2 {
    color: #ffffff;
  }

  .btn-save {
    width: 30vh;
    font-size: 15px;
    height: 30px;
  }

  .ticket-detail {
    width: 100%;
    max-width: none;
    padding: 20px;
  }
}
</style>
