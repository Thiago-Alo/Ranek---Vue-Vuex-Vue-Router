<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha">
      <button class="btn" @click.prevent="logar">Logar</button>
      <ErroNotificacao :error="erros"></ErroNotificacao>
    </form>
    <p class="perdeu">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCriar></LoginCriar>
  </section>
</template>

<script>
import LoginCriar from '@/components/LoginCriar.vue';
import ErroNotificacao from '@/components/ErroNotificacao.vue';

export default {
    name: "LoginView",
    data() {
        return {
            login: {
                email: "",
                senha: "",
            },
            erros: []
        };
    },
    methods: {
        logar() { 
          //Limpa a msg de erro, ao encontrar outro
          this.erros = [];
          //o $STORE é o VUEX .DISPACH é metodo do VUEX para enviar uma ACTION
          // ("getUsuario" (é o context), this.login.email (é o payload))
          this.$store.dispatch("getUsuario", this.login.email)
          //Ao logar altere para esta rota "usuario"
          this.$router.push({name: "usuario"})
          //Catch lida com erros 
          .catch(error => {
            //Preenche o array ERROS com a msg
            this.erros.push(error.response.data.message);
          })
        }
    },
    components: { LoginCriar, ErroNotificacao }
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
