<template>
  <div>
    <h2>
      Admin
    </h2>
    <hr>
    <div class="columns is-mobile is-centered is-disabled">
      <div class="column is-half">
        <div class="notification is-danger" v-if="error != ''">
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

          <div v-for="(user) in users" :key="user.id">
            <div :class="{modal:true,'is-active':showModal}">
              <div class="modal-background"></div>
              <div class="modal-content">
                <div class="card">
                  <div class="card-content">
                    <div class="content">

                      <p>
                        Deseja deletar o usuário?
                      </p>
                      <button @click="deleteUser(user.id)" class="button is-danger">
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
            <tr>
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
                <button @click="showDeleteModal(user.id)" class="button is-success">
                  Editar
                </button>
                <button @click="showDeleteModal(user.id)" class="button is-danger">
                  Deletar
                </button>
              </td>
            </tr>
          </div>
          </tbody>

        </table>

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
      showModal: false
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
    showDeleteModal: function () {
      this.showModal = !this.showModal;
    },
    deleteUser: function (user) {
        const req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
        axios.delete("http://localhost:8686/user/" + user, req).then((resp) => {
              alert("Usuário deletado");
              console.log(resp);
              this.showModal = false;
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