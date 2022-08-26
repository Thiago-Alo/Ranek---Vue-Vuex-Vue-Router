<template>
    <!-- Se tiver mais que 1 pagina mostra -->
  <ul v-if="paginasTotal > 1">
    <!-- Pula para a 1 pagina -->
    <router-link :to="{query: query(1)}"> First Page </router-link>
    <!-- Pagination, exibe de acordo com a quantidade passada no RANGE-->
    <li v-for="pagina in paginas" :key="pagina">
        <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>
    <!-- Pula para a ultima pagina -->
    <router-link :to="{query: query(paginasTotal)}">Last page</router-link>
  </ul>
</template>

<script>
export default {
    //O NAME é a identificação do componente para ser utilizado em outros componentes
    name: "ProdutosPaginar",
    //O PROPS permite que o componente FILHO tenha acesso as informações do PAI
    //PAI = ProdutosLista.vue  / FILHO = ProdutosPaginas.vue
    props:{
        produtosPorPagina:{ type: Number, dafault:1},
        produtosTotal:{ type: Number, default:1 }
    },
    //Na COMPUTED: {} é onde informamos o que as funções/métodos vão fazer e o seu return
    computed:{
      //O método paginas() retorna uma array com o numero de paginas a ser exibido no PAGINATION
      paginas(){
        //Current e a pagina selecionada atual
        const current = Number(this.$route.query._page);
        //Range é o numero de PAGINATION que quer exibir
        const range = 9;
        //faz metade do RANGE
        const offset = Math.ceil(range / 2);
        //Total é o total de paginas
        const total = this.paginasTotal;
        //Array vazio
        const pagesArray = [];
        //Loop para preencher o pagesArray com o numero total de paginas
        for (let i = 1; i <= total; i++) {
          pagesArray.push(i);
        }
        //Corte do array 
        pagesArray.splice(0, current - offset);
        //Corta o array para o tamanho em RANGE até o TOTAL
        pagesArray.splice(range, total);

        return pagesArray;
      },
        //O paginasTotal() retorna a quantidade de produtos / por quantidade de produtos a ser apresentado
        //dando assim o numero de paginas total
        paginasTotal(){
            const total = this.produtosTotal / this.produtosPorPagina
            //SE o total for diferente INFINITO, ENTÃO O Math.ceil() arrendonda para CIMA : SENÃO retorne 0;
            return (total !== Infinity) ? Math.ceil(total) : 0;
        },
    },
    methods:{
        //
        query(pagina){
            return {
                //Desistrutura o $route.query, parando a sua leitura
                //e sobrescreve com _page: pagina, retornando apenas as paginas pelo numero
                ...this.$route.query,
                _page: pagina
            }
        }
    }
}
</script>

<style>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>