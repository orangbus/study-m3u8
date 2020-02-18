import Vue from 'vue'
import App from './App.vue'
import router from "./components/router"
import "mdui/dist/css/mdui.min.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
