<template>
  <div class="admin-container">
    <aside class="sidebar">
      <div class="menu">
        <div
          class="menu-item"
          :class="{ active: activeMenu === 'dashboard' }"
          @click="activeMenu = 'dashboard'"
        >
          <i class="ri-dashboard-line"></i>
          <span>Dashboard</span>
        </div>

        <div
          class="menu-item"
          :class="{ active: activeMenu === 'users' }"
          @click="activeMenu = 'users'"
        >
          <i class="ri-user-3-line"></i>
          <span>Kelola User</span>
        </div>

        <div
          class="menu-item"
          :class="{ active: activeMenu === 'bookings' }"
          @click="activeMenu = 'bookings'"
        >
          <i class="ri-ticket-line"></i>
          <span>Kelola Booking</span>
        </div>

        <div
          class="menu-item"
          :class="{ active: activeMenu === 'spots' }"
          @click="activeMenu = 'spots'"
        >
          <i class="ri-map-pin-line"></i>
          <span>Kelola Spot</span>
        </div>
      </div>
    </aside>

    <main class="admin-content">
      <h2>{{ pageTitle }}</h2>

      <!-- DASHBOARD -->
      <div v-if="activeMenu === 'dashboard'">
        <div class="box">
          <h3>Selamat datang, Admin!</h3>
          <p>Kamu bisa mengelola semua data dari menu sebelah kiri.</p>
        </div>
      </div>

      <!-- USERS -->
      <div v-if="activeMenu === 'users'">
        <div class="box">
          <h3>Daftar users</h3>
          <p>Akan diisi data users</p>
        </div>
      </div>

      <!-- BOOKINGS -->
      <div v-if="activeMenu === 'bookings'">
        <div class="box">
          <h3>Daftar Booking</h3>
          <p>Akan diisi data booking…</p>
        </div>
      </div>

      <!-- SPOTS -->
      <div v-if="activeMenu === 'spots'">
        <div class="box">
          <h3>Kelola Spot</h3>
          <p>Akan diisi data spot</p>
        </div>
      </div>

    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const activeMenu = ref("dashboard");
const users = ref([]);

const api = import.meta.env.VITE_API_URL;

onMounted(async () => {
  const res = await axios.get(`${api}/api/user`);
  users.value = res.data;
});

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/signin";
};

const pageTitle = computed(() => {
  if (activeMenu.value === "dashboard") return "Dashboard Admin";
  if (activeMenu.value === "users") return "Kelola User";
  if (activeMenu.value === "bookings") return "Kelola Booking";
  return "Kelola Spot";
});
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.min.css");

.admin-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #005f85, #00344d);
  color: #fff;
  font-family: "Poppins", sans-serif;
}

/* Sidebar sama seperti Profile */
.sidebar {
  width: 250px;
  background: #002c3e;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #bbb;
  font-size: 16px;
  padding: 8px 4px;
  transition: 0.2s;
}

.menu-item.active,
.menu-item:hover {
  color: #ffb341;
}

.logout {
  margin-top: 40px;
  color: #ff6b6b;
}

.admin-content {
  flex: 1;
  padding: 50px 70px;
  overflow-y: auto;
}

.box {
  background: #ffffff;
  color: #333;
  padding: 25px;
  border-radius: 10px;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
}

.tabel {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.tabel th,
.tabel td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.tabel th {
  background: #f5f5f5;
  color: #333;
  font-weight: 600;
}
</style>
