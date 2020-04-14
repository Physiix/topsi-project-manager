import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingPage from "@/components/LandingPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: LandingPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
