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
      return api.get(`/usuario/${payload}`).then(response => {
        //Quando for feito o LOGIN, faz update do usuario para saber qual usuario esta acessando
        context.commit("UPDATE_USUARIO", response.data);
        //Q faz update do LOGIN para TRUE
        context.commit("UPDATE_LOGIN", true);
      })
    },
    criarUsuario(context, payload){
      //Faz upadete do ID
      context.commit("UPDATE_USUARIO", { id: payload.email });
      //o PAYLOAD vai ser o objeto com todas as informações do usuario
      return api.post("/usuario", payload);
    },
    //Ao executar DeslogarUsuario limpa os campos do usuario
    deslogarUsuario(context) {
      //Faz uma mutação para UPDATE_USUARIO limpando os dados logados
      context.commit("UPDATE_USUARIO", {
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
      });
      //Passa o LOGIN para FALSE (O USUARIO NÃO ESTA MAIS LOGADO)
      context.commit("UPDATE_LOGIN", false);
    },
  },
  modules: {
  }
})
