import Vue from 'vue'
import App from './App.vue'
import CNotify from './components/Notify/main'

// Then install the plugin to Vue
Vue.config.productionTip = false
Vue.use(CNotify)

new Vue({
  render: h => h(App),
}).$mount('#app')

