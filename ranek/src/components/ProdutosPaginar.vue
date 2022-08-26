<template>
<div>
    <!-- Se tiver mais que 1 pagina mostra -->
  <ul v-if="paginasTotal > 1">
    <li v-for="pagina in paginasTotal" :key="pagina">
        <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>

  </ul>
</div>
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
        //O paginasTotal() retorna a quantidade de produtos / por quantidade de produtos a ser apresentado
        //dando assim o numero de paginas total
        paginasTotal(){
            const total = this.produtosTotal / this.produtosPorPagina
            //SE o total for diferente INFINITO, ENTÃO O Math.ceil() arrendonda para CIMA : SENÃO retorne 0;
            return (total !== Infinity) ? Math.ceil(total) : 0;
        }
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