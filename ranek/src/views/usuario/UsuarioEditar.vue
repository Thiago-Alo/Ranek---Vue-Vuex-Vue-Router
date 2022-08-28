<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
  methods: {
    //Metodo para atulizar usuario
    atualizarUsuario() {
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
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
</style>
