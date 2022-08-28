<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="produto.nome">
    <label for="preco">Preço (R$)</label>
    <input id="preco" name="preco" type="number" v-model="produto.preco">
    <label for="fotos">Fotos</label>
    <!-- Para fazer uplado com INPUT="FILE" usamos no vue REF="" -->
    <input id="fotos" name="fotos" type="file" ref="fotos">
    <label for="preco">Descrição</label>
    <textarea id="preco" name="preco" v-model="produto.descricao"></textarea>
    <!-- Ao CLICK execute @click.prevent="adicionarProduto" -->
    <input class="btn" type="button" value="Adicionar Produto" @click.prevent="adicionarProduto">
  </form>
</template>

<script>
import { api } from '@/services';
export default {
  name: "ProdutoAdicionar",
  data(){
    return {
      produto:{
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false"
      }
    }
  },
  methods:{
    //Ao adicionarProduto faz update na API 
    async adicionarProduto(event) {
      const button = event.currentTarget;
      button.value = "Adicionando...";
      button.setAttribute("disabled", "");
      this.formatarProduto();
      await api.post("/produto", this.produto).then(() => {
            this.$store.dispatch("getUsuarioProdutos");
            button.value = "Adicionar Produto";
            button.removeAttribute("disabled")
      });
    },
    formatarProduto() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
  }
}
</script>

<style scoped>
  .adicionar-produto {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
  }
  
  .btn {
    grid-column: 2;
  }
  </style>