<template>
    <div>
      <h2>
        Login
      </h2>
      <hr>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="notification is-danger" v-if="error != ''">
                <p>{{ error }}</p>
          </div>
          <label>Email:</label>
          <input v-model="email" type="email" name="email" class="input">

          <label>Senha:</label>
          <input v-model="password" type="password" name="password" class="input">
          <button @click="login" class="button is-success">Logar</button>
        </div>
      </div>
    </div>
</template>

<script>

import axios from 'axios';



export default {
  data(){
    return{
      password:"",
      email:"",
      error:""
    };
  },
  methods:{
    async login(){
      try{
        const data = {
          password:this.password,
          email:this.email
        }
        console.log(data);
        const resp = await axios.post("http://localhost:8686/auth",data);

        console.log(resp);

        const token = resp.data.token;
        console.log(token);


        if(token) {
          localStorage.setItem("token",token);
          this.$router.push({name: "Home"});
        }else{
          console.log("erro");
          throw new Error("Credenciais inválidas");
        }
      }catch (err){
        console.log(err);

        this.error = err.message;
      }

    }

  }

}

</script>

<style scoped>

</style>