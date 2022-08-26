<template>
  <section class="produtos-container">
    <!-- Verifica se produtos existe -->
    <div v-if="produtos && produtos.length" class="produtos">
        <!-- V-FOR="produto in produtos" faz o loop em PRODUTOS dentro do nosso ranek.json e traz cada produto 
        o :KEY="produto.id" é o identificador unico de cada produto, para que o VUE não tenha dúvidas-->
        <div class="produto" v-for="produto in produtos" :key="produto.id">
            <router-link to="/">
                <!-- O V-IF="PRODUTOS.FOTOS" fiz, se existir .FOTOS em PRODUTOS mostre esta TAG IMG -->
                <img v-if="produtos.fotos" :src="produtos.fotos[0].src" alt="produtos.foto[0].titulo">
                <p class="preco">{{produto.preco}}</p>
                <h2 class="titulo">{{produto.nome}}</h2>
                <p>{{produto.descricao}}</p>
            </router-link>
        </div>
    </div>
    <!-- Se a busca não existir o produto passado no input em ProdutosBuscar.vue, retorna esta div -->
    <div v-else-if="produtos && produtos.length === 0" class="sem-resultados">
        <p>Busca sem resultado.</p>
    </div>
  </section>
</template>

<script>
//Importe de biblioteca externa AXIOS para substituir o FETCH
import { api } from "@/services.js";
import { serialize } from "@/helpes(buscas).js";
export default {
    // No DATA() se declara as variaveis no VUE
    data(){
        return {
            produtos: null,
            produtosPorPagina: 9,
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
        //O getProdutos() está fazendo o axios/fetch da nossa api ranek.json
        //O caminho da nossa pagina esta na variavel API que esta em src/services.js
            api.get(this.url).then(response => {
                //a diferença do uso do AXIOS e do FETCH e a RESPONSE terminar em .data
                this.produtos = response.data;
            })

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
.produtos-container{
    max-width: 1000px;
    margin: 0 auto;
}
.produtos{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap:30px;
    margin:30px;
}
.produto{
    box-shadow:0 4px 8px rgba(30, 60, 90, 0.1);
    padding:10px;
    background: #fff;
    border-radius: 4px;
    transition: all .5s;
}
.produto:hover{
    box-shadow:0 6px 12px rgba(30, 60, 90, 0.2);
    transform: scale(1.1);
    position: relative;
    z-index:1;
}
.produto-img{
    border-radius: 4px;
    margin-bottom:20px;
}
.titulo{
    margin-bottom:10px;
}
.preco{
    color:#e80;
    font-weight: bold;
}
.sem-resultados{
    text-align: center;
}
</style>