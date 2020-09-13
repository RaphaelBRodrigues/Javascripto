<template>


  <div id="cliente" :class="{'cliente':true,'cliente-premium': isPremium}" >
    <h1>CLIENTE </h1>
    <h4 :v-if="cliente.nome">
    Nome:   {{ cliente.nome }}
    </h4>
    <p>
    Descrição:  {{ cliente.descricao }}
    </p>
    <p>
     Número: {{ cliente.numero }}
    </p>
    <p v-show="showIdade">
      Idade: {{ cliente.idade }}
    </p>
    <p v-if="showIdade">
      Idade: {{ cliente.idade }}
    </p>
    <p v-else-if="false">Idade oculta else</p>
    <p v-else>Idade oculta</p>
    <p>
      Email: {{ cliente.email }}
    </p>
    <button @click="mudarCor($event)">
      Mudar cor
    </button>
  </div>

</template>

<script>
export default {
  methods:{
    mudarCor:function (e){
      console.log(e);
      this.isPremium = !this.isPremium
    }
  },
  data(){
      return{
        isPremium: false
    }
  },
  props:{
    cliente: Object,
    showIdade:Boolean
  }
}
</script>

<style scoped>
  .cliente{
    color:blue;
    font-family: "Abyssinica SIL";
  }
  .cliente-premium{
    background-color: black;
    color:yellow;
  }
</style>