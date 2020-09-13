<template>
  <div id="cliente">
    <h2>
      {{ nome }}
    </h2>
    <h3>
      {{ descricao }}
    </h3>
  </div>

</template>

<script>
export default {
  data(){
    return {
      nome:"Raphael",
      numero:"",
      descricao:"dasadsaads sadsad asdsa"
    }
  }
}
</script>

<style scoped>
  #cliente{
    color:blue;
    background-color: black;
  }
</style>