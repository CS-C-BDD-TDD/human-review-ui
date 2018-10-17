import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const getters = {

};

export const state = {
  token: String,
  pendingList: [{
    stix_id: String,
    field_name: String,
    field_value: String,
    date: Date,
    object_type: String,
    status: String,
    action: String,
  }],
};

export const mutations = {
  updateToken(token) {
    state.token = token;
  },

  updateHRPending(pendingList) {
    console.log('stixid: ', pendingList[0]);
    state.pendingList = pendingList;
    console.log(state.pendingList);
  },
};

export const actions = {
  getLoginToken({ commit }, input) {
    //  const urlPathVars = `/api/v1/user?username=${input.username}&password=${input.password}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const authCredentials = {
      username: `${input.username}`,
      password: `${input.password}`,
    };

    axios.put('/api/v1/user', authCredentials, config).then(result => commit('updateToken', result.data))
      .catch(console.error);
  },

  getHRPending({ commit }) {
    const config = {
      headers: {
        Token: 'rnadom-value',
      },
    };
    axios.get('/api/v1/humanreview/pending', null, config)
      .then(result => commit('updateHRPending', result.data))
      .catch(console.error());
  },
};

export const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
});
