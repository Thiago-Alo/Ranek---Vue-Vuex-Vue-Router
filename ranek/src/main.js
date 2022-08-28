import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PaginaCarregando from '@/components/PaginaCarregando';
import ErroNotificacao from '@/components/ErroNotificacao';

Vue.config.productionTip = false

//Registrando componentes globais
Vue.component("PaginaCarregando", PaginaCarregando);
Vue.component("ErroNotificacao", ErroNotificacao)

//Filtra se é um Number, Transforma para Number e devolve em MOEDA
Vue.filter("numeroPreco", valor => {
  //Transforma em Number
  valor = Number(valor);
  //Verifica se existe
  if(valor) {
    //Faz a conversão para MOEDA
    return valor.toLocaleString("EUR", {style: "currency", currency: "EUR"});
    //se não for um Number retorna vazio
  } else {
    return "";
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
