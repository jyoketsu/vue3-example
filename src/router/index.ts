import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../pages/login/index.vue";
import Welcome from "../pages/welcome/index.vue";
import Home from "../pages/home/index.vue";
import Songoku from "../pages/home/songoku/index.vue";
import Piccolo from "../pages/home/piccolo/index.vue";
import Vegeta from "../pages/home/vegeta/index.vue";

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "songoku",
    children: [
      { path: "songoku", component: Songoku },
      { path: "piccolo", component: Piccolo },
      { path: "vegeta", component: Vegeta },
    ],
  },
  { path: "/login", component: Login },
  { path: "/welcome", component: Welcome },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
