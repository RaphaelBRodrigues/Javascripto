<template>
    <div>
      <h2>
        Edição de usuario
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


          <button @click="update" class="button is-success">Atualizar</button>
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
      email:"",
      id:"",
      error:""
    };
  },
  created() {
    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    console.log(this.$route.params.id);
    axios.get("http://localhost:8686/user/"+this.$route.params.id,req).then((resp)=>{
    if(resp.data.user.length > 0){
      const user = resp.data.user[0];
      this.name = user.name;
      this.email = user.email;
      this.id = user.id;

    }else{
    this.$router.push({name:"Users"});
    }
    }).catch(err => {
      console.log(err);
    });
  },
  methods:{
    async update(){
      const req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
      try{
        const resp = await axios.put("http://localhost:8686/user/"+this.id,{
          name:this.name,
          email:this.email,
        },req);
        console.log(resp);
        this.$router.push({name:"Users"});
      }catch (err){
        this.error = err.response.data.err;
      }

    }

  }

}

</script>

<style scoped>

</style>