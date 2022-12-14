import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'font-awesome/scss/font-awesome.scss'

// FontAwesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { fa } from 'vuetify/iconsets/fa'

import '@mdi/font/css/materialdesignicons.css'

//import gsap from 'gsap'
//import ScrollTrigger from "gsap/ScrollTrigger";

//gsap.registerPlugin(ScrollTrigger);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    }
  },
})


createApp(App)/*.mixin({
    created: function () {
    this.gsap = gsap;
  }})*/
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vuetify)
  .mount('#app')
