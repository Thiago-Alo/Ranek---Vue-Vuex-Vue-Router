<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <!-- Executa a animação default ao trocar de estado, no caso, ao abrir e ao fechar o cadastro -->
    <transition mode="out-in">
    <!-- V-IF se criar for FALSE exibe BUTTON, e ao CLICK passa criar para TRUE, escondendo o BUTTON e exibindo o formulario -->
    <!-- Inicia como FALSE, ao CLICK passa a true, sumindo o button e ativando o V-ELSE, exibindo o formulario -->
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
    <!-- V-ELSE se o v-if="!criar" for TRUE, exibe o formulario  -->
      <UsuarioFrom v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
      </UsuarioFrom>
    </transition>
  </section>
</template>

<script>
import UsuarioFrom from './UsuarioFrom.vue';


export default {
    name: "LoginCriar",
    data() {
        return {
            criar: false
        };
    },
    components: { UsuarioFrom },
    methods:{
      //o ASYNC informa que e uma função assincrona
      async criarUsuario(){
        //try = a TENTE isto, se não consegui, faça o CATCH
        try{
          //Os AWAIT são executado em ordem, 1 so começa apos o outro ser executado
          //Este "criarUsuario" é o nome da ACTION que regristrei em store/index.js
          await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
          //Ao Criar o Usuario, ja faz login automaticamente
          await this.$store.dispatch(
            "getUsuario",
            this.$store.state.usuario.email
          );
          //Envia para a tela do usuario ao fazer login
          this.$router.push({ name: "usuario" });
          //tratamento de erros
        } catch (error) {
          console.log(error);
        }
      }
    }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
