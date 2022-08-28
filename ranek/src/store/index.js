import { api } from '@/services';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  stric:true,
  //STATE = DATA, ou seja variaveis
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    }
  },
  getters: {
  },
  //No mutations = METHODS se declara o que será alterado
  mutations: {
    //STATE é o estado/variavel e o payload e o que será retornado
    UPDATE_LOGIN(state, payload){
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload){
      //o  Object.assign faz uma combinação das propriedades de .USUARIO
      //assim cada V-MODELs passados no UsuarioForm.vue, preenchera a propriedade passada no V-MODEL
      //No Object.assign({}, este objeto vazio seria uma resposta caso não conseguise encontrar o STATE.USUARIO
      state.usuario = Object.assign({}, state.usuario, payload);
    }
  },
  //Action = methods
  // Actions enviar para o mutations e o mutations envia para o state
  actions: {
    //Método para fazer login através do usuario
    getUsuario(context, payload){
      //endereço do usuario
      api.get(`/usuario/${payload}`).then(r => {
        //Quando for feito o LOGIN, faz update do usuario para saber qual usuario esta acessando
        context.commit("UPDATE_USUARIO", r.data);
        //Q faz update do LOGIN para TRUE
        context.commit("UPDATE_LOGIN", true);
      })
    }
  },
  modules: {
  }
})
