import HumanReview from 'human_review';
import Vue from 'vue';
import Quasar from 'quasar';
import iconSet from 'quasar-framework/icons/fontawesome';
import 'quasar-extras/fontawesome';
import './registerServiceWorker';
import './styles/quasar.styl';
import App from './App.vue';
import router from './router';

Vue.prototype.$api = new HumanReview.ApiClient();
Vue.prototype.$api.basePath = 'https://humanreview-labs-dev.apps.domino.rht-labs.com/api/v1';

Vue.use(Quasar, {
  config: {}, iconSet
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
