<template>
<section>
    <!-- Se PRODUTO existir mostra esta DIV -->
    <div v-if="produto" class="produto">
    <!-- Se fotos existir, mostra esta UL -->
      <ul class="fotos" v-if="produto.fotos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo">
        </li>
      </ul>
      <div class="info">
        <h1>{{produto.nome}}</h1>
        <!-- Através do | aplica o filter numeroPreco, que converte em moeda 
          está no main.js -->
        <p class="preco">{{produto.preco | numeroPreco}}</p>
        <p class="descricao">{{produto.descricao}}</p>
        <transition mode="out-in" v-if="produto.vendido === 'false'">        
          <!-- Se o ainda tiver produto exibe este botao -->
          <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
          <FinalizarCompra v-else :produto="produto"></FinalizarCompra>
        </transition>
          <!-- Se não tiver produto, exibe este botao -->
          <button v-else class="btn" disabled>Produto Vendido</button>
      </div>
    </div>
    <!-- Loading enquando nao tiver o produto -->
    <PaginaCarregando v-else></PaginaCarregando>
  </section>
</template>

<script>
import { api } from '@/services';
import PaginaCarregando from '@/components/PaginaCarregando.vue';
import FinalizarCompra from '@/components/FinalizarCompra.vue';


export default {
    name: "ProdutoSingle",
    //Informa a propriedade que será puxada do PAI
    props: ["id"],
    data() {
        return {
            produto: null,
            finalizar: false,
        };
    },
    methods: {
        getProduto() {
          setTimeout(() => {
            api.get(`/produto/${this.id}`).then(response => {
                this.produto = response.data;
            });
          }, 1000)
        }
    },
    created() {
        this.getProduto();
    },
    components: { PaginaCarregando, FinalizarCompra }
};
</script>

<style scoped>
  .produto {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    max-width: 900px;
    padding: 60px 20px;
    margin: 0 auto;
  }
  
  .preco {
    color: #e80;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
  }
  
  .descricao {
    font-size: 1.2rem;
  }
  
  .btn {
    margin-top: 60px;
    width: 200px;
  }
  @media screen and (max-width: 500px){
    .produto {
      grid-template-columns:  1fr;
    }
    .fotos{
      grid-row:2;
    }
    .info{
      position:initial;
    }
  }
  </style>