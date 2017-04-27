import Vue from 'vue';
import Vuex from 'vuex'
import * as actions from './actions';
import token from './modules/token';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  modules: {
    token
  },
  strict: debug,
})
