import axios from 'axios';
import Vue from 'vue';
import Quasar from 'quasar';
import iconSet from 'quasar-framework/icons/fontawesome';
import 'quasar-extras/fontawesome';
import './registerServiceWorker';
import './styles/quasar.styl';
import App from './App.vue';
import router from './router';

Vue.prototype.$axios = axios.create({
  baseURL: window.apiBaseUrl,
  timeout: 1000
});


Vue.use(Quasar, {
  config: {}, iconSet
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
