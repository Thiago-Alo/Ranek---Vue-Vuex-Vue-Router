<template>
  <section class="produtos-container">
    <!-- O MODE="OUT-IN" faz a animação na saida de um e na entrada do outro, assim, evitando pulos doidos -->
    <transition mode="out-in">
        <!-- Verifica se produtos existe, esta key="produtos" esta para identificar o elemento para o transition -->
        <div v-if="produtos && produtos.length" class="produtos" key="produtos">
            <!-- V-FOR="produto in produtos" faz o loop em PRODUTOS dentro do nosso ranek.json e traz cada produto 
            o :KEY="produto.id" é o identificador unico de cada produto, para que o VUE não tenha dúvidas-->
            <div class="produto" v-for="(produto, index) in produtos" :key="index">
            <!-- O :to="{name: 'produto', params: {id: produto.id}} informa o
            NAME: e o params :ID que foram passados la no ROUTER.JS para serem linkados ao componente FILHO
            ProdutoSingle.vue -->
                <router-link :to="{name: 'produto', params: {id: produto.id}}">
                    <!-- O V-IF="PRODUTOS.FOTOS" fiz, se existir .FOTOS em PRODUTOS mostre esta TAG IMG -->
                    <img v-if="produtos.fotos" :src="produtos.fotos[0].src" alt="produtos.foto[0].titulo">
                    <p class="preco">{{produto.preco}}</p>
                    <h2 class="titulo">{{produto.nome}}</h2>
                    <p>{{produto.descricao}}</p>
                </router-link>
            </div>
            <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"></ProdutosPaginar>
        </div>
        <!-- Se a busca não existir o produto passado no input em ProdutosBuscar.vue, retorna esta div -->
        <!-- esta key="sem-resultado" esta para identificar o elemento para o transition -->
        <div v-else-if="produtos && produtos.length === 0" class="sem-resultados" key="sem-resultado">
            <p>Busca sem resultado.</p>
        </div>
        <!-- esta key="carregando" esta para identificar o elemento para o transition -->
        <div v-else key="carregando">
            <PaginaCarregando></PaginaCarregando>
        </div>
    </transition>
  </section>
</template>

<script>
//Importe de biblioteca externa AXIOS para substituir o FETCH
import { api } from "@/services.js";
import { serialize } from "@/helpes(buscas).js";
import ProdutosPaginar from './ProdutosPaginar.vue';
import PaginaCarregando from "./PaginaCarregando.vue";

export default {
    //O NAME é a identificação do componente para ser utilizado em outros componentes
    name: "ProdutosLista",
    //Em COMPONENTS informa o componente que será utilizado
    components:{
    ProdutosPaginar,
    PaginaCarregando
},
    // No DATA() se declara as variaveis no VUE
    data(){
        return {
            produtos: null,
            produtosPorPagina: 9,
            produtosTotal: 0,
        }
    },
    //No computed é onde passamos o que será alterado
    computed:{
        //a função url() fica observando o que for digitado no input em components/ProdutosBuscar.vue
        //<input @click.prevent="buscarProdutos"> e ao click faz a busca pela palavra digitada
        url(){
            //Variavel que retorna o metodo serialize() em helpes(buscas).js
            const query = serialize(this.$route.query);
             //O ?_limit=${this.produtosPorPagina} limita o retorno de produtos para no maximo 10
             //A variavel QUERY é o this.$router.push({query: {q: this.busca} }) em ProdutosBuscar.vue
            return `/produto?_limit=${this.produtosPorPagina}${query}`;
        }
    },
    // Nos METHODS se declara as funções e os métodos
    methods: {
        getProdutos(){
            this.produtos = null;
            //O setTIMEOUT e so para simular a demora do carregando de uma API
            setTimeout(() => {
                //O getProdutos() está fazendo o axios/fetch da nossa api ranek.json
                //O caminho da nossa pagina esta na variavel API que esta em src/services.js
                api.get(this.url).then(response => {
                //this.produtosTotal esta retornando o total de produtos que existe no ranek.json
                //o Number() transforma o retorno em numero
                this.produtosTotal = Number(response.headers["x-total-count"]);
                //a diferença do uso do AXIOS e do FETCH e a RESPONSE terminar em .data
                this.produtos = response.data;
                })
            }, 1500)
        

        //fetch('http://localhost:3000/produto').then(r => r.json())
        //.then(r => {
        //this.produtos = r;
        //})
        }
    },
    //WATCH fica observando oq foi passado
    watch:{
        //Esta observando a url(), toda vez que houver uma alteração em url() executa a função getProdutos();
        url(){
            this.getProdutos();
        }
    },
    // No CREATED() informamos tudo que deve ser carregado antes do APP ser MOUNTED
    created(){
        this.getProdutos();
    }

}
</script>
<!-- O SCOPED impede os stilos de vazarem para outros componentes -->
<style scoped>
    .produtos-container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .produtos {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px;
      margin: 30px;
    }
    @media screen and (max-width: 500px){
      .produtos {
        grid-template-columns: repeat(1, 1fr);
        gap: 10px;
        margin: 10px;
      }
    }

    
    .produto {
      box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
      padding: 10px;
      background: #fff;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    .produto:hover {
      box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
      transform: scale(1.1);
      position: relative;
      z-index: 1;
    }
    
    .produto img {
      border-radius: 4px;
      margin-bottom: 20px;
    }
    
    .titulo {
      margin-bottom: 10px;
    }
    
    .preco {
      color: #e80;
      font-weight: bold;
    }
    
    .sem-resultados {
      text-align: center;
    }
    </style>
    