import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import '../src/assets/icon/iconfont.css'
 
Vue.use(VueLazyload,{
  loading: require('./assets/img/loading/loading.gif'),
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
