import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


const app = createApp(App);

library.add(faLink, faUser, faPowerOff);

app
  .use(createRouter(app))
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
