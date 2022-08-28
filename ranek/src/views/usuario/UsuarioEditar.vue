<template>
  <section>
    <ErroNotificacao :erros="erros"></ErroNotificacao>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import ErroNotificacao from "@/components/ErroNotificacao.vue";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
    ErroNotificacao
},
  data(){
    return {
      errors: []
    }
  },
  methods: {
    //Metodo para atulizar usuario
    atualizarUsuario() {
      //Retira o erro da tela ao encontrar outro
      this.erros = [];
      //Atualiza no banco de dados
      api.put(`/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario)
        .then(() => {
          //Puxa as informaçoes atualizadas no Banco de dados
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
          //Se não conseguir, mostra o error
        .catch(error => {
          //Preenche o array ERROS com a msg
          this.erros.push(error.response.data.message);
        });
    }
  }
};
</script>

<style>
</style>
