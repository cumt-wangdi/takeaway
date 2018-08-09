// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import './assets/css/reset.css'
import {formatDate, parseTime} from './filter/formatDate.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.filter('formatDate', formatDate)
Vue.filter('parseTime', parseTime)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
