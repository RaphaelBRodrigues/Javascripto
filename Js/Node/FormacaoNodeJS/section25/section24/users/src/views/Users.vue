<template>
  <div>
    <h2>
      Admin
    </h2>
    <hr>
    <div class="columns is-mobile is-centered is-disabled">
      <div class="column is-half">
        <div class="notification is-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(user) in users" :key="user.id">
              <td>
                {{ user.name }}
              </td>
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.role | showRole }}
              </td>
              <td>
                <router-link :to="{name:'edit',params:{id:user.id}}">
                  <button  class="button is-success">
                    Editar
                  </button>
                </router-link>

                <button @click="showDeleteModal(user.id)" class="button is-danger">
                  Deletar
                </button>
              </td>


          </tr>

          </tbody>
        </table>
        <div :class="{modal:true,'is-active':showModal}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="card">
              <div class="card-content">
                <div class="content">

                  <p>
                    Deseja deletar o usuário?
                  </p>
                  <button @click="deleteUser()" class="button is-danger">
                    Sim
                  </button> &nbsp;
                  <button @click="showDeleteModal()" class="button is-success">
                    Não
                  </button>
                  <br>
                </div>
              </div>
            </div>
          </div>
          <button @click="showDeleteModal" class="modal-close is-large" aria-label="close"></button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)


export default {
  created() {
    this.getUsers();
  },
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId:-1
    };
  },
  filters: {
    showRole: (role) => {
      if (role == 0) {
        return "Comum"
      } else {
        return "Administrador"
      }
    }
  },
  methods: {
    editUser(id){
      this.$router.push({path:"/edit/"+id});

    },
    getUsers() {
      try {

        const req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }

        axios.get("http://localhost:8686/user", req).then((data) => {
          console.log(data.data);
          this.users = JSON.parse(JSON.stringify(data.data))
          ;
        });

      } catch (err) {
        console.log(err);
        this.error = err.response.data.err;
      }

    },
    showDeleteModal: function (id) {
      this.deleteUserId = id;
      this.showModal = !this.showModal;
    },
    deleteUser: function () {
        const req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
        axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then((resp) => {
              alert("Usuário deletado");
              console.log(resp);
              this.showModal = false;
              this.users = this.users.filter(userInt => {
                return userInt.id != this.deleteUserId
              })
            }
        ).catch(err => {
        alert("Falha ao deletar usuário");
        console.log(err);
        this.showModal = false;
      }
        )

    }

  }
}

</script>

<style scoped>

</style>