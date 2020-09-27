<template>
    <div>
      <h2>
        Registro de usuario
      </h2>
      <hr>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="notification is-danger" v-if="error != ''">
                <p>{{ error }}</p>
          </div>
          <label>Email:</label>
          <input v-model="email" type="email" name="email" class="input">

          <label>Nome:</label>
          <input v-model="name" type="text" name="name" class="input">

          <label>Senha:</label>
          <input v-model="password" type="password" name="password" class="input">
          <button @click="register" class="button is-success">Cadastrar</button>
        </div>
      </div>
    </div>
</template>

<script>

import axios from 'axios';



export default {
  data(){
    return{
      name:"",
      password:"",
      email:"",
      error:""
    };
  },
  methods:{
    async register(){
      try{
        await axios.post("http://localhost:8686/user",{
          name:this.name,
          password:this.password,
          email:this.email,
        });
        this.$router.push({name:"Home"});
      }catch (err){
        this.error = err.response.data.err;
      }

    }

  }

}

</script>

<style scoped>

</style>