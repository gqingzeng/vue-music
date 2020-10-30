import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
 
Vue.use(VueLazyload,{
  loading: require('./assets/logo.png'),
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
