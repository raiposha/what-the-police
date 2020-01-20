import Vue from "vue";
import VueRouter from "vue-router";

import About from "@/views/About.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);
// const About = () => import(/* webpackChunkName: "about" */ "@/views/About.vue");
// const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
