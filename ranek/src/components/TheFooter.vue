<template>
  <footer>
    <p>Ranek &copy; Criado por Thiago Alô 25/08/2022</p>
  </footer>
</template>

<script>
export default {
    // Nome do componente, para ser utilizado em outros componentes
    name: "TheFooter",
}
</script>

<!-- O SCOPED impede que o estilos vazem para outros elementos -->
<style scoped>
footer{
    background: #87f;
    padding:25px 0;
    text-align: center;
    font-size: 1.2rem;
    color: #fff;
/* O resto do MACETE é por o top:75px + ou -, assim o FOOTER fica sempre 75px abaixo do MAIN e criar o scroll*/
    position: relative;
    top: 75px;
}
</style>