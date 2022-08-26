import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdutoSingle from '@/views/ProdutoSingle'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    //O :id é o params puxados do PAI
    path: '/produto/:id',
    name: "produto",
    component: ProdutoSingle,
    //O PROPS informa o que :id vai ser usado como uma propriedade pelo filho
    props: true,
  }
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
