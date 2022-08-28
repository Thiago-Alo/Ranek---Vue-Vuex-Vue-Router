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
    },
    usuario_produtos: null,
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
    },
    //Faz update da lista de compras so usuario
    UPDATE_USUARIO_PRODUTOS(state, payload){
      state.usuario_produtos = payload;
    },
    //Adiciona novos itens a lista
    ADD_USUARIO_PRODUTOS(state, payload){
      //o UNSHIT() adiciona o item no inicio da lista e o PUSH() no final
      state.usuario_produtos.unshit(payload);
    },
  },
  //Action = methods
  // Actions enviar para o mutations e o mutations envia para o state
  actions: {
    //Add produtos a lista usuario_produtos: null,
    getUsuarioProdutos(context){
      //Identifica o usuario através do ID na API
      api.get(`/produto?usuario_id=${context.state.usuario.id}`)
      .then(response => {
        //Retorna um JSON.data, e executa a mutanção UPDATE_USUARIO_PRODUTOS 
        context.commit("UPDATE_USUARIO_PRODUTOS", response.data)
      })
    },
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
