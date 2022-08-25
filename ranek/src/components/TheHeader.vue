<template>
  <header>
    <nav>
    <!-- O ROUTER-LINK funciona como uma tag <a></a>, cria uma anchora to="/" é o src=" xXx "-->
        <router-link to="/" class="logo">
            <img src="@/assets/ranek.svg" alt="Ranek">
        </router-link>
        <router-link class="btn" to="/login">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
    // Nome do componente, para ser utilizado em outros componentes
    name: "TheHeader",
}
</script>

<!-- O SCOPED impede que o estilos vazem para outros elementos -->
<style scoped>
nav{
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(30, 60, 90, .1);
}
.logo{
    padding: 10px 0;
}
.logo img{
    width: 90px;
}
</style>