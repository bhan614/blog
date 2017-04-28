// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from "axios";
import ElementUI from 'element-ui';
import { Message, MessageBox, Input, Button } from 'element-ui';

import './style/main.styl';
import App from './App';
import Login from './components/Login.vue';
import Hello from './components/Hello.vue';

import store from './store';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

const routes = [
  { path: '/', component: Login, meta: { authPage: true } },
  { path: '/admin', component: Hello },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //console.log(store);
    console.log(to.meta.authPage)
   if (to.meta.authPage) { //login
     console.log("login")
     if (store.state.auth.token) {
       next('/admin')
     }
     next()
   } else {
     console.log("admin")
     if (store.state.auth.token) {
       Axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token; // 全局设定header的token验证，注意Bearer后有个空格
       next()
     } else {
       console.log('没有token')
       next('/')
     }
   }
 });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
