import { createApp } from "vue";
import { store, key } from "./store";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales";
import { ClickOutside } from "element-plus";
import "./assets/font_3285303_inyc3mdax0o";

const app = createApp(App);
app.directive("clickoutside", ClickOutside);
app.use(store, key).use(router).use(i18n).mount("#app");
