<template>
  <div id="app">
    <!-- Renderizando os componentes na app -->
    <TheHeader/>

    <main id="main">
      <!-- Animação ao trocar de pagina -->
      <transition>
      <!-- No ROUTER-VIEW é onde serão renderizados os componentes vue, passados através dos ROUTER-LINK -->
        <router-view/>
      </transition>
    </main>
    
    <TheFooter/>
  </div>
</template>

<script>
// Import dos componentes
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  // Declaração dos componentes que serão utilizados
    components: { TheHeader, TheFooter }

}
</script>

<style>
*{
  box-sizing: border-box;
}
body, ul, li, h1, h2, p{
  margin:0px;
  padding:0px;
}
ul{
  list-style:none;
}
body{
  font-family:'Courier New', Courier, monospace;
  color:#345;
  background: url('./assets/pattern.svg') repeat top;
}
a{
  color: #345;
  text-decoration: none;
}
img{
  max-width: 100%;
  display: block;
}
.btn{
  display: block;
  padding:10px 30px;
  background: #87f;
  border-radius:4px;
  color:#fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all .5s;
  border: none;
  font-family: Georgia, 'Times New Roman', Times, serif;
  cursor:pointer;
}
.btn:hover{
  background: #65d;
  transform: scale(1.1);
}
/*Macete para o footer ficar sempre no final da tela*/
#app{
  display: flex;
  flex-direction: column;
  min-height:100vh;
}
#main{
  flex:1;
}
/* Resto do macete em TheFooter.vue */
input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}
/*transition geral*/
/*animação ao entrar e ao sair*/
.v-enter,
.v-leave-to{
  opacity:0;
}
/* animação quando estiver entrando*/
.v-enter {
  transform: translate3d(0, -20px, 0);
}
/*animação quando estiver saindo*/
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}
/*animação durante entrada e durante a saida*/
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
