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
        <button class="btn btn-form">Criar Usuário</button>
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
    components: { UsuarioFrom }
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
