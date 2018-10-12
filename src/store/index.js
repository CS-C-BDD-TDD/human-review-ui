import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: String,
  },

  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },

    updateToken(state, token) {
      console.log(`update token ${token}`);
      state.token = token;
    },
  },

  actions: {
    getLoginToken({ commit }, input) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };

      const authCredentials = {
        username: `${input.username}`,
        password: `${input.password}`,
      };
      
      console.log(`backend: ${process.env.VUE_APP_HUMAN_REVIEW_BACKEND}`);

      axios.put(process.env.VUE_APP_HUMAN_REVIEW_BACKEND, authCredentials, config)
        .then(result => commit('updateToken', result.data))
        .catch(console.error);
    },
  },
});
