<template>
  <div id="app">

  </div>
</template>

<script>
import axios from "axios";
const pokeapi = axios.create({
  baseURL:"https://pokeapi.co/api/v2/"
});

async function main(){
  const pokemons = await pokeapi.get("pokemon?limit=150&offset=50");
  console.table(pokemons);
}

main();


export default {
  name: 'App',
}
</script>

<style>

</style>
