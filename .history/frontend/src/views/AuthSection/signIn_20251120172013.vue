<template>
  <div class="signin-container">
    <div class="signin-box">
      <h2>Masuk ke Mancingku</h2>
      <p>Login dengan akun Anda untuk melanjutkan</p>

      <form @submit.prevent="loginUser">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Kata sandi"
          required
        />
        <button type="submit" class="login-btn">Masuk</button>
      </form>

      <a href="#" class="forgot">Lupa kata sandi?</a>

      <p class="switch-text">
        Belum punya akun?
        <RouterLink to="/signup">Daftar sekarang</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

async function loginUser() {
  const api = import.meta.env.VITE_API_URL;

  if (!email.value || !password.value) {
    alert("Harap isi email dan kata sandi!");
    return;
  }

  try {
    const res = await axios.post(`${api}/api/auth/login`, {
      email: email.value,
      password: password.value
    });

    // simpan data user ke localStorage
    localStorage.setItem("userId", JSON.stringify(res.data.user));

    window.dispatchEvent(new Event("storage"));
    
    // pindah ke halaman home
    router.push("/");

  } catch (err) {
    alert(err.response?.data?.message || "Login gagal");
  }
}
</script>


<style scoped>
.signin-container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url("@/assets/Bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signin-box {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

h2 {
  color: #1b3c53;
  font-size: 28px;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #1b3c53;
}

.login-btn {
  width: 100%;
  background: #1b3c53;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
  transition: 0.3s;
}

.login-btn:hover {
  background: #e28e00;
}

.forgot {
  display: block;
  margin-top: 10px;
  color: #000;
  font-size: 13px;
  text-decoration: none;
}

.switch-text {
  margin-top: 15px;
  color: #555;
  font-size: 14px;
}

.switch-text a {
  color: #e28e00;
  font-weight: 600;
  text-decoration: none;
}

.switch-text a:hover {
  text-decoration: underline;
}

@media (max-width:768px) {
  .signin-container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url("@/assets/Bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signin-box {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  height: 70%;
  width: 50%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

h2 {
  color: #1b3c53;
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #1b3c53;
}

.login-btn {
  width: 100%;
  background: #1b3c53;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
  transition: 0.3s;
}

.login-btn:hover {
  background: #e28e00;
}

.forgot {
  display: block;
  margin-top: 10px;
  color: #000;
  font-size: 13px;
  text-decoration: none;
}

.switch-text {
  margin-top: 15px;
  color: #555;
  font-size: 12px;
}

.switch-text a {
  color: #e28e00;
  font-weight: 600;
  text-decoration: none;
}

.switch-text a:hover {
  text-decoration: underline;
}

}
</style>
