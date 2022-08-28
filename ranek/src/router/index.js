import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdutoSingle from '@/views/ProdutoSingle'
import LoginView from '@/views/LoginView'
import UsuarioView from '@/views/usuario/UsuarioView'
import UsuarioProdutos from '@/views/usuario/UsuarioProdutos'
import UsuarioCompras from '@/views/usuario/UsuarioCompras'
import UsuarioEditar from '@/views/usuario/UsuarioEditar'
import UsuarioVendas from '@/views/usuario/UsuarioVendas'

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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/usuario',
    component: UsuarioView,
    //As informações passadas em META: se propagam para os filhos
    meta: {
      login: true,
    },
    children:[
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutos,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioCompras,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendas,
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditar,
      }
    ]
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

//Navigation GUARD
// router.beforeEach((to, from, next) => {
//   //Verifica se esta logado
//   if(to.matched.some(record => record.meta.login)){
//     //Se não estiver LOGADO envia para o /login
//     if(!window.localStorage.token){
//       next("/login");
//       //Se tiver logado, segue normal para /usuario
//     }else {
//       next();
//     }
//   }else {
//     next();
//   }
// })

export default router
