<template>
    <div>
      <input name="email" id="email" placeholder="Email"> <br>
      <input name="nome" id="nome" placeholder="nome"> {{rota}} <br>
      <button>
        Cadastrar
      </button>
      <router-view/>
    </div>
</template>

<script>
  export default {
    created() {
    },
    data:()=>{
      return {
        rota:""
      }
    }
  }
</script>