<template>
  <footer>
    <p>Ranke &copy; Criado por Thiago Alô 25/08/2022</p>
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
    position: relative;
    color: #fff;
    top: 75px;
}
</style>