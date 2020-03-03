import Vue from 'vue';
import Vuex from 'vuex';
import VuexStore from './store';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store(VuexStore);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
