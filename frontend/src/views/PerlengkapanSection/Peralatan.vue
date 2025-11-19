<template>
  <main class="peralatan-page">
    <Navbar />
    <div class="container">
      <h1>Macam - macam Alat Pancing</h1>

      <EquipmentCard
        title="Joran & Reel Spinning"
        :image="spinningImg"
        description="Joran spinning ini ringan, sensitif, dan kuat, ideal untuk memancing di kolam ikan. Cocok untuk pemula maupun pemancing berpengalaman. Rekomendasi kami adalah Maguro Extrim Viper 180 dan TA Reel Spinning 5.5:1 – D3000."
        link="https://shopee.co.id/Joran-MAGURO-Extreme-VIPER-150-s-d-180-Spinning-Galatama-Kolam-Sungai-Danau-Empang-i.1321879620.28660373891?extraParams=%7B%22display_model_id%22%3A207785076846%2C%22model_selection_logic%22%3A3%7D&sp_atk=354bc273-2c76-47b1-8dc9-975ef821b34a&xptdk=354bc273-2c76-47b1-8dc9-975ef821b34a"
      />

      <EquipmentCard
        title="Joran & Reel Baitcasting"
        :image="baitcastImg"
        description="Joran baitcasting dirancang untuk memancing dengan presisi tinggi dan kekuatan besar, ideal untuk ikan besar dan teknik lempar jauh. Cocok untuk memancing di danau, sungai, maupun laut. Rekomendasi kami: Daido Athena III Pro dan Zorro Emperor."
        link="https://shopee.co.id/joran-daido-athena-III-joran-BC-athena-III-pro-series-i.85826751.18543268425?extraParams=%7B%22display_model_id%22%3A296875588021%2C%22model_selection_logic%22%3A3%7D&sp_atk=88c21fd6-7c97-4ffd-8d1e-8a2d148250d2&xptdk=88c21fd6-7c97-4ffd-8d1e-8a2d148250d2"
      />

      <EquipmentCard
        title="Joran Teleskopik"
        :image="teleskopikImg"
        description="Joran teleskopik dirancang agar ringan, ringkas, dan mudah dibawa, sehingga sangat ideal untuk pemancing yang sering bepergian. Jenis joran ini cocok digunakan di berbagai lokasi seperti kolam, sungai, hingga tepi danau. Meski bentuknya portabel, joran teleskopik tetap memiliki kekuatan yang baik untuk pemancing pemula maupun menengah. Rekomendasi dari kami untuk joran teleskopik adalah Pioneer Magnitude Anten Teleschopic dan Maguro Traveler Series."
        link="https://shopee.co.id/Joran-Pioneer-Magnitude-Anten-Teleschopic-Bahan-Graphite-Kaku-i.1549680695.41204622400?extraParams=%7B%22display_model_id%22%3A290392849566%2C%22model_selection_logic%22%3A3%7D&sp_atk=3692f7c0-e4d7-4e43-9ec0-30a73b36420b&xptdk=3692f7c0-e4d7-4e43-9ec0-30a73b36420b"
      />
    </div>
  </main>
</template>

<script>
  import EquipmentCard from "@/components/PerlengkapanPage/EquipmentCard.vue";
  import spinningImg from "@/assets/Perlengkapan/Pancingan/spinning.png";
  import baitcastImg from "@/assets/Perlengkapan/Pancingan/casting.png";
  import teleskopikImg from "@/assets/Perlengkapan/Pancingan/teleskopik.png";

  export default {
    name: "EquipmentView",
    components: {EquipmentCard },
    data() {
      return {
        spinningImg,
        baitcastImg,
        teleskopikImg
      };
    }
  };
</script>

<style scoped>
.peralatan-page {
  padding: 2rem 4vw;
  background: #fff;
  min-height: 100vh;
}
.container {
  max-width: 1000px;
  margin: auto;
  padding: 10px 20px;
}

h1 {
  font-size: 30px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
}
</style>
