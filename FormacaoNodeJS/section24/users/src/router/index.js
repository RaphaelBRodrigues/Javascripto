import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios';

Vue.use(VueRouter);

async function AdminAuth(to,from,next){
  if(localStorage.getItem("token") != ""){
    const req = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token")}
    }

    try{
      const resp = await axios.post("http://localhost:8686/validate",{},req);
      console.table(resp);
      next();
    }catch (err){
      console.log(err);
      next("/login");
    }
  }else{
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter:AdminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
