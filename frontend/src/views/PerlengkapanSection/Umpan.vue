<template>
  <main class="umpan-page">
  <Navbar />
  <div class="container">
    <h1>Macam - macam umpan</h1>

    <BaitCard
      title="Cacing tanah"
      :image="cacingImg"
      description="Cacing tanah adalah umpan alami favorit untuk ikan air tawar seperti mas, lele, mujair, dan nila. Aromanya kuat dan gerakannya hidup sehingga mudah menarik ikan. Gunakan segar dan tempel di kail sesuai ukuran ikan target."
      link="https://shopee.co.id/Cacing-Tanah-Hidup-Sehat-ANC-Cacing-Tanah-Merah-i.120732463.25380394817?extraParams=%7B%22display_model_id%22%3A233099297249%2C%22model_selection_logic%22%3A2%7D&sp_atk=f09fd4c7-0a0b-40f9-be6a-85f25deae6ef&xptdk=f09fd4c7-0a0b-40f9-be6a-85f25deae6ef"
    />

    <BaitCard
      title="Kroto"
      :image="krotoImg"
      description="Kroto, telur semut rangrang, populer untuk ikan mas, nila, mujair, dan lele. Aromanya kuat, teksturnya kecil, bisa dipakai langsung di kail atau dicampur pelet/adonan umpan."
      link="https://shopee.co.id/KROTO-Fresh-Baru-Setiap-Hari-Per-Gram-Ons-i.478312881.43424607983?extraParams=%7B%22display_model_id%22%3A224580251638%2C%22model_selection_logic%22%3A2%7D&sp_atk=2bc1df16-30ec-475b-8ca4-400b607bb049&xptdk=2bc1df16-30ec-475b-8ca4-400b607bb049"
    />
  </div>
  </main>
</template>

<script>
  import BaitCard from "@/components/PerlengkapanPage/BaitCard.vue";
  import cacingImg from "@/assets/cacing.png";
  import krotoImg from "@/assets/kroto.jpg";

  export default {
    name: "BaitView",
    components: { BaitCard },
    data() {
      return {
        cacingImg,
        krotoImg
      };
    }
  };
</script>

<style scoped>
.umpan-page{
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
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-bottom: 30px;
}

@media (max-width:768px) {
  h1{
      font-size: 20px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
}
</style>
