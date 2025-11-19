<template>
  <div class="add-review-page">
    <!-- Tombol Kembali -->
    <router-link :to="`/comment/${$route.params.id}`" class="btn-back">←</router-link>



    <h2>Tulis Ulasan</h2>
    <p>Bagikan pengalamanmu di tempat pemancingan ini</p>

    <form class="review-form">
      <label>Rating</label>
      <select>
        <option disabled selected>Pilih rating</option>
        <option v-for="r in [1,2,3,4,5]" :key="r">{{ r }}</option>
      </select>

      <label>Komentar</label>
      <textarea rows="4" placeholder="Tulis ulasanmu di sini"></textarea>
      <button type="button" class="btn-submit">Kirim Ulasan</button>
    </form>
  </div>
</template>

<style scoped>
.add-review-page {
  max-width: 100%;
  margin:auto;
  background: #fff;
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
  min-height: 85vh;
}

h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #000;
}

p {
  text-align: center;
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

.review-form label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.3rem;
  color: #333;
}

.review-form input,
.review-form select,
.review-form textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
}

.review-form input:focus,
.review-form select:focus,
.review-form textarea:focus {
  border-color: #f79e1b;
  box-shadow: 0 0 5px rgba(247, 158, 27, 0.3);
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: #1b3c53;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:hover {
  background: #e38c00;
}

.btn-back {
  position: absolute;
  top: 30px;
  left: 60px;
  font-size: 50px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #f79e1b;
}

@media (max-width: 768px) {
  .add-review-page {
    margin: 0;
    padding: 1.6rem;
    min-height: 83vh;
  }
  h2 {
    font-size: 20px;
  }
  .btn-back {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 35px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #f79e1b;
}
}
</style>
