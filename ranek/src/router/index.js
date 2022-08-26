import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //Sempre que mudar de ROUTER, volta para o topo
  scrollBehavior () {
    return window.scrollTo({top: 0, behavior: "smooth"})
  }
})

export default router
