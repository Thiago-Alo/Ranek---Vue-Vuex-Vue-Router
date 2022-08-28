<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <!-- Os :to="{name: 'xXxX'}" são os caminho para acessar os componentes filhos registrados em router/index.js -->
        <li>
          <router-link :to="{name: 'usuario'}">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{name: 'compras'}">Compras</router-link>
        </li>
        <li>
          <router-link :to="{name: 'vendas'}">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{name: 'usuario-editar'}">Editar Usuário</router-link>
        </li>
        <li>
          <!-- Button para deslogar e limpas as informações do usuario -->
          <button @click.prevent="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "UsuarioView",
  methods: {
    //Desloga o usuario
    deslogar() {
      this.$store.dispatch("deslogarUsuario");
      //Ao deslogar, retorna a pagina de /LOGIN
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
