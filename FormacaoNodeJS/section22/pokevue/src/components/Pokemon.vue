<template>
  <div class="card">
    <div class="card-image">
      <figure>
        <img v-if="isFront" :src="FrontImage" alt="Placeholder image">
        <img v-else="" :src="BackImage" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">

        </div>
        <div class="media-content">
          <p class="title is-4">{{ Pokemon.name | upper }}</p>
          <p class="subtitle is-6">{{ Type }}</p>
        </div>
      </div>

      <div class="content">
        <button class="button is-medium" @click="invertImage()">
          Ver o outro lado
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data(){
      return {
        PokemonData:{},
        isFront:true,
        Type:"",
        FrontImage:"",
        BackImage:"",
      }
    },
    props:{
      Pokemon: Object,
      id:Number
    },
    filters:{
      upper:function (name){
        const newName = name[0].toUpperCase() + name.slice(1) ;
        return newName;
      }
    },
    methods:{
      invertImage:function (){
        this.isFront = !this.isFront;
        console.table(this.isFront);
      }
    },
    created: async function (){
     const pokemonData = await axios.get(this.Pokemon.url);
      this.Type =pokemonData.data.types[0].type.name;
      this.FrontImage = pokemonData.data["sprites"]["front_default"];
      this.BackImage = pokemonData.data["sprites"]["back_default"];
    }
  }
</script>

<style>
  .card{
    text-align: center;
  }
</style>