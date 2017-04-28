import * as types from '../mutation-types';
import api from '../../api/login.js';

const state = {
  token: sessionStorage.getItem('token')
}

const actions = {
   createToken({ commit, state }, { username, password }) {
    return api.createToken(username, password).then(res => {
      if (res.data.success) {
        commit(types.CREATE_TOKEN, res.data.token);
      } else {
        commit(types.DELETE_TOKEN);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    });
  }
}

const mutations = {
  [types.CREATE_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem('token', token);
  },
  [types.DELETE_TOKEN](state) {
    sessionStorage.removeItem('token');
    state.token = null;
  }
}

export default { state, actions, mutations }
