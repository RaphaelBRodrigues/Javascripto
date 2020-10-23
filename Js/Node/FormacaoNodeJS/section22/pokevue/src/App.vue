<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <figure>
        <img src="./assets/main.png" />
      </figure>
      <hr>
      <input class="Rounded input" type="text" v-model="busca">
      <button @click="buscar()" class="is-fullwidth button is-success">
        Buscar
      </button>
      <h3 class="is-centered is-size-5">
        Pokedex
      </h3>
      <div v-for="(pokemon,index) in filteredPokemons" :key="pokemon.url">
        <Pokemon :pokemon="pokemon" :id="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "@/components/Pokemon";
const pokeapi = axios.create({
  baseURL:"https://pokeapi.co/api/v2/"
});
export default {
  name: 'App',
  components: {Pokemon},
  data(){
    return {
      pokemons:[],
      busca:"",
      filteredPokemons:""
    }
  },
  created:async function (){
    const response = await pokeapi.get("pokemon?limit=15&offset=0");
    const pokemonsResponse = response.data.results;
    this.filteredPokemons = response.data.results;

    this.pokemons = pokemonsResponse;
  },
  filters:{
    firstLetterUpercase: function (pokemon){
      return pokemon.toUpperCase();
    }
  },
  methods:{
    buscar:function (){
      this.filteredPokemons = this.pokemons;
      if(!this.busca){
          this.filteredPokemons = this.pokemons;
      }else{
        this.filteredPokemons = this.pokemons.filter(pokemon =>{
            return pokemon.name == this.busca;
        });
      }
    }
  },
  // computed:{
  //   searchResult:function (){
  //     if(!this.busca){
  //         return this.pokemons;
  //     }
  //     return this.pokemons.filter((pokemon)=>{
  //           return pokemon.name == this.busca;
  //     });
  //   }
  // }
}
</script>

<style>

</style>
