<template>
  <form>
  <!-- O V-MODEL peda tudo que esta sendo digitado no input e passa para a variavel ex:v-model="nome" -->
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="nome">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" v-model="email">
    <label for="senha">Senha</label>
    <input id="senha" name="senha" type="password" v-model="senha">
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep">
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
export default {
  name: "UsuarioForm",
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
    // nome:{
    //   //Vai pegar a variavel .nome e liga-la ao v-model="nome"
    //   get(){
    //     return this.$store.state.usuario.nome;
    //   },
    //   //Devolve o valor preenchido em v-model="nome", e envia para ser feito UPDATE do nome
    //   set(value){
    //     this.$store.commit("UPDATE_USUARIO", {nome: value})
    //   }
    // }
  }
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
