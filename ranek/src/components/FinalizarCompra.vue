<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    //Ao comprar retorna as informações, para a nossa api
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado
        }
      };
    }
  },
  methods: {
    //Este méthods faz o POST das informações em compra()
    criarTransacao() {
      //Envia o POST
      return api.post("/transacao", this.compra).then(() => {
        //Ao clicar em FINALIZAR COMPRA é enviado para a pagina de compras
        this.$router.push({ name: "compras" });
      });
    },
    //o ASYNC informa que e uma função assincrona
    async criarUsuario(){
      //Retira o erro da tela ao encontrar outro
      this.erros = [];
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
        await this.criarTransacao();
        //tratamento de erros
      } catch (error) {
        //Preenche o array ERROS com a msg
        this.erros.push(error.response.data.message);
      }
    },
    //AO finalizar a compra executa o criarTransacao() e a criarUsuario()
    finalizarCompra() {
      //Se estiver LOGADO cria a transação
      if (this.$store.state.login) {
        this.criarTransacao();
        //Se não estiver LOGADO cria o Usuario
      } else {
        this.criarUsuario();
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
