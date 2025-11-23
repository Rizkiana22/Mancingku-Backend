<template>
  <div class="search-bar">
    <div class="search-row">
      <div class="search-input">
        <span class="icon">📍</span>
        <input
          type="text"
          placeholder="Lokasi"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>

      <button class="btn-filter" @click="showFilter = !showFilter">
        ⚙️ Filter
      </button>
      
      <div v-if="showFilter" class="filter-panel">
        <h3>Batas Harga</h3>
        <div class="price-range">
         <input type="number" placeholder="Min" v-model="minPrice" />
         <span>—</span>
         <input type="number" placeholder="Max" v-model="maxPrice" />
        </div>

        <h3>Rating</h3>
        <div class="star-range">
          <input type="radio" name="star-range" id="s5" value="5" v-model="rating" />
          <label for="s5"></label>
          <input type="radio" name="star-range" id="s4" value="4" v-model="rating" />
          <label for="s4"></label>
          <input type="radio" name="star-range" id="s3" value="3" v-model="rating" />
          <label for="s3"></label>
          <input type="radio" name="star-range" id="s2" value="2" v-model="rating" />
          <label for="s2"></label>
          <input type="radio" name="star-range" id="s1" value="1" v-model="rating" />
          <label for="s1"></label>
        </div>

        <p>Penilaian: {{ rating }}</p>

        <div class="btn-row">
          <button class="btn-apply" @click="$emit('apply-filter', { minPrice, maxPrice, rating })">
            Terapkan
          </button>
          <button class="btn-reset" @click="resetFilter">Reset</button>
        </div>
      </div>
        

    </div>

    <div class="location-buttons">
      <button class="btn-location" @click="getLocation">📡 Lokasimu saat ini</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: String
})
const emit = defineEmits(["update:modelValue", "apply-filter", "reset-filter", "search-location"])

const minPrice = ref(null)
const maxPrice = ref(null)
const rating = ref(0)
const showFilter = ref(false)

const resetFilter = () => {
  minPrice.value = null
  maxPrice.value = null
  rating.value = 0        // ⬅ rating kembali ke 0
  showFilter.value = false
  emit("reset-filter")
}

const getLocation = () => {
  if (!navigator.geolocation) {
    alert("Browser tidak mendukung GPS");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      emit("search-location", { lat, lon });
    },
    () => {
      alert("Gagal mendapatkan lokasi. Pastikan GPS diizinkan.");
    }
  );
};

</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.search-input {
  display: flex;
  align-items: center;
  border: 1px solid #aaa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  flex: 1;
}

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
}

.btn-filter {
  border: 1px solid #999;
  background: transparent;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-filter:hover {
  background: rgba(0, 0, 0, 0.188);
}

.location-buttons {
  display: flex;
  gap: 1rem;
}

.btn-location,
.btn-map {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  background: #fff;
  cursor: pointer;
}

.btn-location:hover,
.btn-map:hover {
  background: rgba(0, 0, 0, 0.188);
}
.filter-panel {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #05496c;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.filter-panel h3 {
  font-size: 1rem;
  margin-bottom: 10px;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.price-range input {
  width: 80px;
  padding: 6px;
  border-radius: 4px;
  border: none;
  text-align: center;
}

.star-range {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 5px;
}

.star-range input {
  display: none;
}

.star-range label {
  font-size: 25px;
  color: #ccc; /* warna default abu-abu */
  cursor: pointer;
  transition: color 0.2s;
}

/* tampilkan bintang menggunakan pseudo-element */
.star-range label::before {
  content: "\2605";
}

/* saat di-hover atau di-klik */
.star-range label:hover,
.star-range label:hover ~ label,
.star-range input:checked ~ label {
  color: gold; /* bintang menyala */
}


.ratings {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rating-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  font-size: 1.2rem;
}

.btn-row {
  display: flex;
  justify-content: space-between; 
  gap: 10px; 
  margin-top: 15px;
}

.btn-apply,
.btn-reset {
  flex: 1;
  background: #f89b2a;
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-apply:hover,
.btn-reset:hover {
  background: #b8731f;
}

@media (max-width: 768px) {
  .search-row {
    align-items: stretch;
    gap: 8px;
  }
  
  .search-row {
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap; 
}

.search-input {
  flex: 1; 
  width: 100%;
  box-sizing: border-box;
}

.filter-panel {
  position: static; /* hilangkan absolute agar ikut layout */
  width: 100%;
  margin-top: 10px;
}

.filter-panel h3 {
  text-align: center;
}

.price-range {
  justify-content: center;
}

.star-range {
  justify-content: center;
}

.btn-apply {
  width: 100%;
}

.btn-reset {
  width: 100%;
}
}
</style>