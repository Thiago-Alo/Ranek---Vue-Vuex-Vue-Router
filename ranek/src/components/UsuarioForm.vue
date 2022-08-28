<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
  <!-- O V-MODEL peda tudo que esta sendo digitado no input e passa para a variavel ex:v-model="nome" -->
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="nome">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="senha">
    </div>
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep">
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua">
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade">
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado">
    <div class="button">
    <!-- O SLOT é preenchido pela TAG <UsuarioFrom></UsuarioFrom> que está no componente PAI LginCriar.vue -->
      <slot></slot>
    </div>
  </form>
</template>

<script>
// Import da função mapFields
import { mapFields } from "@/helpes(buscas)";
import { getCep } from "@/services";
export default {
  name: "UsuarioForm",
  data(){
    return{
      rua: "",

    }
  },
  //COMPUTED é onde se faz alterações que retornam algo
  computed:{
    //Executando o mapFields({})
    ...mapFields({
      //Passa os valores passados em V-MODEL para as propriedades 
      fields: ["nome", "email", "senha", "rua", "cep", "numero", "bairro", "cidade", "estado"],
      //A BASE é o this.$store.state.usuario
      base: "usuario",
      //A MUTATION é a mutação que estamos fazendo em store/index.js
      mutation: "UPDATE_USUARIO"
    }),
    mostrarDadosLogin(){
      //Se o Usuario nao estiver logado OU se tiver na pagina USUARIO EDITAR,
      // para que o usuario posso editar nome, email e senha
      return (!this.$store.state.login || this.$route.name === 'usuario-editar')
    },
  }, 
  methods:{
    //Méthods para preencher automaticamente os campos do form através do CEP
    preencherCep(){
      //Este REGEX e para IGNORAR campos vazios e tudo que nao seja numero
      const cep = this.cep.replace(/\D/g, "");
      //Depois de limpar que faz a requisição a API através da função getCEP() em services.js
      if(cep.length === 8){
        getCep(cep).then(response => {
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.estado= response.data.uf;
          this.cidade = response.data.localidade;
        })
      }
    }
  }
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.usuario{
  grid-column:1 / 3;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
