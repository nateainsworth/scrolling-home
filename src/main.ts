import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
