import "./assets/tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import "flowbite";
import 'animate.css';
const app = createApp(App);

axios.defaults.headers.common["X-Requested-With"] = "XMLHttprequest";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

app.use(createPinia());
app.use(router);

app.mount("#app");
