<template>
  <div class="spot-card">
    <div class="spot-img-wrapper">
      <img :src="`/images/spots/${spot.image}`" class="spot-img" />
    </div>

    <div class="spot-details">
      <h3>{{ spot.name }}</h3>
      <p class="address">📍 {{ spot.address }}</p>

      <div class="rating">
        <span>{{ spot.rating }}</span>
        <span class="stars">⭐️⭐️⭐️⭐️⭐️</span>
      </div>
      <p><strong>Kapasitas:</strong> {{ spot.capacity }} kursi</p>
      <p class="availability">Tersisa {{ spot.remaining }} kursi!</p>
    </div>

    <div class="spot-price">
      <p>{{ spot.price }}</p>

      <router-link :to="`/spot/${spot.slug}`" class="btn-pilih">
      Pilih
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  spot: Object
})

const stars = computed(() => {
  const rating = Math.round(props.spot.rating)
  return "⭐️".repeat(rating) + "⭐️".repeat(5-rating)
})

</script>

<style scoped>
.spot-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden;
  align-items: center;
}
.spot-img {
  width: 250px;
  height: 220px;
  object-fit: cover;
}

.spot-details {
  flex: 1;
  padding: 0.8rem 1rem;
}

.spot-price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: #f9f9f9;
  padding: 1rem;
  min-width: 130px;
}

.btn-pilih {
  background: #d97706;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  text-decoration: none;
}

.btn-pilih:hover {
  background: #b45309;
}

@media (max-width : 768px) {
 
  .spot-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 100%;
  }

  .spot-img-wrapper {
    width: 100%;
    height: 200px;
  }

  .spot-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spot-price {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f3f3f3;
  }

  .btn-pilih {
    position: relative;
    right: 10px;
    margin: 1.5px;
    flex-shrink: 0;
  }
}



</style>