<template>
  <nav class="navbar" :class="{ 'navbar-profile': isProfilePage }">
    <div class="nav-logo">
      <RouterLink to="/"><h2>Mancingku</h2></RouterLink>
    </div>

    <!-- Burger -->
    <div class="burger" @click="toggleMenu">
      <span></span><span></span><span></span>
    </div>

    <!-- Nav Links -->
    <ul class="nav-links" :class="{ open: isOpen }">
      <li class="link"><RouterLink to="/Beranda" @click="closeMenu">BERANDA</RouterLink></li>
      <li class="link"><RouterLink to="/tentang" @click="closeMenu">TENTANG</RouterLink></li>
      <li class="link"><RouterLink to="/spot" @click="closeMenu">SPOT</RouterLink></li>

      <!-- Dropdown PERLENGKAPAN -->
      <li class="dropdown" @click.stop="toggleDropdown">
        <span class="link">PERLENGKAPAN <i class="ri-arrow-down-s-line"></i></span>
        <ul class="dropdown-menu" :class="{ open: isDropdownOpen }">
          <li><RouterLink to="/umpan" @click="closeMenu">Umpan</RouterLink></li>
          <li><RouterLink to="/peralatan" @click="closeMenu">Alat Pancing</RouterLink></li>
        </ul>
      </li>

      <!-- MOBILE -->
      <div class="mobile-buttons">

        <!-- Belum login -->
        <template v-if="!isLoggedIn">
          <RouterLink to="/Signin" @click="closeMenu"><button class="btn-signIN">Masuk</button></RouterLink>
          <RouterLink to="/Signup" @click="closeMenu"><button class="btn-signUP">Daftar</button></RouterLink>
        </template>

        <!-- Sudah login -->
        <template v-else>
          <RouterLink to="/profile" @click="closeMenu"><button class="btn-profile">Profile</button></RouterLink>
          <button class="btn-logout" @click="logout">Logout</button>
        </template>

      </div>
    </ul>

    <!-- DESKTOP BUTTONS -->
    <div class="button desktop-only">
      <template v-if="!isLoggedIn">
        <RouterLink to="/Signin"><button class="btn-signIN">Masuk</button></RouterLink>
        <RouterLink to="/Signup"><button class="btn-signUP">Daftar</button></RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/profile"><button class="btn-profile">Profile</button></RouterLink>
        <button class="btn-logout" @click="logout">Logout</button>
      </template>
    </div>

  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isOpen = ref(false);
const isDropdownOpen = ref(false);
const isLoggedIn = ref(false);

function checkLogin(){
  const user = localStorage.getItem("userId");
  isLoggedIn.value = !!user;
}
// Cek login dari localStorage
onMounted(() => {
  checkLogin();
  window.addEventListener("storage", checkLogin);
});

// Fungsi Logout
function logout() {
  localStorage.removeItem("userId");
  isLoggedIn.value = false;
  alert("Berhasil logout");
  router.push("/signin");
}

// Page cek profile
const isProfilePage = computed(() => route.path === "/profile");

function toggleMenu() {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) isDropdownOpen.value = false;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

window.addEventListener("click", () => (isDropdownOpen.value = false));

function closeMenu() {
  isOpen.value = false;
  isDropdownOpen.value = false;
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.min.css");

/* === Reset ul/li === */
.nav-links,
.nav-links ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links li {
  display: inline-block;
}

/* === Navbar utama === */
.navbar {
  background: rgba(202, 202, 202, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 40px;
  flex-wrap: wrap;
  backdrop-filter: blur(2px);
}

.nav-logo h2 {
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
}

.nav-logo a {
  text-decoration: none;
  color: inherit;
}

.navbar.navbar-profile {
  background-color: #014b69 !important; /* warna biru tua */
  transition: background-color 0.3s ease;
}

/* === Links === */
.nav-links {
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 80px;
  align-items: center;
}

.link,
.link a {
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.1s;
  color: #ffffff;
  text-decoration: none;
}

.link a:hover {
  color: #da9723;
}

/* === Dropdown === */
.link:hover {
  color: #da9723;
}
.dropdown {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #0a7096;
  min-width: 200px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  top: 100%;
  left: 0;
  z-index: 100;
}

.dropdown-menu.open {
  display: block;
}

.dropdown-menu li a {
  color: rgb(255, 255, 255);
  padding: 10px 14px;
  text-decoration: none;
  display: block;
}

.dropdown-menu li {
  display: block;
  width: 100%;
}

.dropdown-menu li a:hover {
  background-color: #e28e00;
}

/* === Buttons === */
.button {
  display: flex;
  gap: 10px;
  margin-right: 100px;
}

.btn-signIN,
.btn-signUP, .btn-profile, .btn-logout {
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  font-size: clamp(14px, 1vw, 16px);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s;
}

.btn-profile{
  background-color: #1b3c53;
  color: #fff;
  border: 0px;
}
.btn-logout {
  background-color: #da9723;
  color: #ffffff;
  border: 0px;
}

.btn-signIN {
  background-color: #da9723;
  color: #ffffff;
  border: 0px;
}

.btn-signUP {
  background-color: #1b3c53;
  color: #fff;
  border: 0px;
}

.btn-profile:hover{
  background: #e28e00;
}

.btn-logout:hover{
  background: #e28e00;
}
.btn-signIN:hover {
  background: #e28e00;
  color: #fff;
}

.btn-signUP:hover {
  background: #e28e00;
  border-color: #e28e00;
}

.desktop-only {
  display: flex;
}

/* === Burger === */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}
.burger span {
  width: 25px;
  height: 3px;
  background-color: #fff;
  position: relative;
  z-index: 200;
  border-radius: 2px;
}

/* === Mobile Buttons === */
.mobile-buttons {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

/* === Responsive === */
@media (max-width: 1302px) {
  .nav-logo a {
    text-decoration: none;
    color: inherit;
  }
  .nav-logo h2 {
    font-size: 22px;
  }

  .navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    z-index: 1000;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    align-items: center;
    background-color: #0a7096;
    width: 100%;
    border-radius: 0 0 10px 10px;
    padding: 1rem 0;
    gap: 20px;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 1050;
  }

  .nav-links.open {
    display: flex;
  }

  .link a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 0;
  }

  .desktop-only {
    display: none;
  }

  .mobile-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
  }

  .btn-signIN,
  .btn-signUP, .btn-profile{
    width: 100%;
    font-size: 16px;
    border: none;
    border-radius: 6px;
  }

  .btn-logout{
    width: auto;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    align-self: center;
     background-color: #da9723;
    color: #fff;

  }
  .btn-signIN {
    background-color: #da9723;
    color: #fff;
  }


  .btn-signUP {
    background-color: #1b3c53;
    color: #fff;
  }

  .burger {
    display: flex;
    flex-direction: column;
    position: absolute;
    gap: 5px;
    cursor: pointer;
    top: 35px;
    right: 45px;
    z-index: 300;
  }

  .burger span {
    width: 25px;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
  }

  .nav-links .dropdown-menu {
    position: static;
    background-color: #0a7096;
    box-shadow: none;
    width: 100%;
    text-align: center;
  }

  .dropdown-menu.open {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
