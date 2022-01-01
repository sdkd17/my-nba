import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Import main componenets
import Games from './components/Games/Games.vue';
import Season from './components/Season/Season.vue';
import Players from './components/Players/Players.vue';

Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Router
Vue.use(VueRouter)

const routes = [
  {path:'/games', component: Games},
  {path:'/season', component: Season},
  {path:'/players', component: Players}
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
