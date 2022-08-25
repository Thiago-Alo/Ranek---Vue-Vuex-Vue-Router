<template>
  <section class="home">
    <h1>Compre ou Venda</h1>
    <!-- Renderizando os componentes -->
    <ProdutosBuscar></ProdutosBuscar>
    <ProdutosLista></ProdutosLista>
  </section>
</template>

<script>
// Import dos componentes
import ProdutosBuscar from '@/components/ProdutosBuscar.vue';
import ProdutosLista from '@/components/ProdutosLista.vue';


export default {
  // Nome do componente, para ser utilizado em outros componentes
  name: "HomeView",
  // Declaração dos componentes que serão utilizados
  components: { ProdutosBuscar, ProdutosLista }
}
</script>
<!-- O SCOPED impede que o estilos vazem para outros elementos -->
<style scoped>
h1{
  font-size:2rem;
  color: #87f;
  margin-top:40px;
  text-align: center;
}
</style>