import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './layouts/Default.vue';
import LogIn from './views/LogIn.vue';
import Pending from './views/Pending.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LogIn,
        }, {
          path: '/pending',
          name: 'pending',
          component: Pending,
        },
      ],
    },
  ],
});
