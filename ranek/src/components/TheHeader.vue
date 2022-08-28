<template>
  <header>
    <nav>
    <!-- O ROUTER-LINK funciona como uma tag <a></a>, cria uma anchora to="/" é o src=" xXx "-->
        <router-link to="/" class="logo">
            <img src="@/assets/ranek.svg" alt="Ranek">
        </router-link>
        <router-link v-if="$store.state.login" to="/usuario" class="btn">
            {{nome}}
        </router-link>
        <router-link v-else class="btn" to="/login">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
    // Nome do componente, para ser utilizado em outros componentes
    name: "TheHeader",
    computed:{
        //Função para retornar o nome do usuario com um REGEX
        nome(){
            //O REGEX .replace(/ .*/, "") diz tudo após o 1 espaço, substitua por " "
            return this.$store.state.usuario.nome.replace(/ .*/, "");
        }
    }
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