import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Language from "@/plugins/Language";
import Components from "@/plugins/Components";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(Language);
Vue.use(Components);

new Vue({
  router,
  store,
  //@ts-ignore
  vuetify,
  render: h => h(App)
}).$mount("#app");
