<template>
  <div id="app">
    <h3>
      Cadastro
    </h3>
    <div>
      <input v-model="formCliente.nome" type="text" placeholder="name">
      <input v-model="formCliente.email" type="email" placeholder="email">
      <input v-model="formCliente.idade" type="idade" placeholder="idade">
      <button @click="cadastrar">
        Cadastrar
      </button>
    </div>
    <cliente show-idade :cliente="formCliente" />
    <h1>
      Guia Clientes
    </h1>
    <div v-for="(cliente,index) in clientes" :key="cliente.id">
      <h1>{{ index + 1}}</h1>
      <Cliente :cliente="cliente" />
      <input v-model="cliente.nome">

    </div>
    <Produto />
  </div>
</template>

<script>
import Cliente from "./components/Cliente";
import Produto from "./components/Produto";
export default {
  name: 'App',
  methods:{
    cadastrar:function (){
      this.clientes.push(this.formCliente);
      this.formCliente = {};
      alert();
    }
  },
  data(){
    return {
      formCliente: {
        nome: "",
        idade: 0,
        email: ""
      },
      clientes:[
        {
          id:1,
          nome:"Raphael",
          idade:3,
          email:"raphael@4ve.scom",
          descricao:"DASDSA Sdsad asdas",
          numero:"dasdsaads"
        },
        {
          id:2,
          nome:"Rodrigues",
          idade:2,
          email:"raphael@4ve.scom",
          descricao:"DASDSA Sdsad asdas",
          numero:"dasdsaads"
        },
        {
          id:3,
          nome:"Barbosa",
          idade:4,
          email:"raphael@4ve.scom",
          descricao:"DASDSA Sdsad asdas",
          numero:"dasdsaads"
        },
      ]

  }
  },
  components: {
    Cliente,
    Produto
  }
}
</script>
