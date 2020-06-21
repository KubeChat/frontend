import Vue from "vue";
import Router from "vue-router";
import multiguard from "vue-router-multiguard"
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { authGuard } from "../auth";
import { socketGuard } from "../socket/socketGuard";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: multiguard([authGuard, socketGuard])
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    }
  ]
});

export default router;
