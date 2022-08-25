<template>
  <div id="app">
    <!-- Renderizando os componentes na app -->
    <TheHeader/>

    <main id="main">
    <!-- No ROUTER-VIEW é onde serão renderizados os componentes vue, passados através dos ROUTER-LINK -->
      <router-view/>
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

#app{
  display: flex;
  flex-direction: column;
  min-height:100vh;
}
#main{
  flex:1;
}
</style>
