// import Vue from "vue";
// import VueRouter from "vue-router";
import { createRouter, createWebHistory } from 'vue-router';
import Pokedex from "../views/Pokedex.vue";
import Pokemon from "../views/Pokemon.vue";
import Deck from "../views/Deck.vue";
import Arena from "../views/Arena.vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Pokedex",
    component: Pokedex,
  },
  {
    path: "/pokemon/:name",
    name: "Pokemon",
    component: Pokemon,
    props: true,
  },
  {
    path: "/deck",
    name: "Deck",
    component: Deck,
  },
  {
    path: "/arena",
    name: "Arena",
    component: Arena,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;