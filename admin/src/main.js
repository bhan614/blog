// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

import './style/main.styl';
import App from './App';
import Login from './components/Login.vue';
import Hello from './components/Hello.vue';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: Hello },
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
