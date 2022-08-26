<template>
  <section class="produtos-container">
  <!-- V-FOR="produto in produtos" faz o loop em PRODUTOS dentro do nosso ranek.json e traz cada produto 
    o :KEY="produto.id" é o identificador unico de cada produto, para que o VUE não tenha dúvidas-->
    <div v-for="produto in produtos" :key="produto.id">
        <!-- O V-IF="PRODUTOS.FOTOS" fiz, se existir .FOTOS em PRODUTOS mostre esta TAG IMG -->
        <img v-if="produtos.fotos" :src="produtos.fotos[0].src" alt="produtos.foto[0].titulo">
        <p class="preco">{{produto.preco}}</p>
        <h2 class="titulo">{{produto.nome}}</h2>
        <p>{{produto.descricao}}</p>
    </div>
  </section>
</template>

<script>
//Importe de biblioteca externa AXIOS para substituir o FETCH
import { api } from "@/services.js";
export default {
    // No DATA() se declara as variaveis no VUE
    data(){
        return {
            produtos: null
        }
    },
    // Nos METHODS se declara as funções e os métodos
    methods: {
        getProdutos(){
        //O getProdutos() está fazendo o axios/fetch da nossa api ranek.json
        //O caminho da nossa pagina esta na variavel API que esta em src/services.js
            api.get("/produto").then(response => {
                //a diferença do uso do AXIOS e do FETCH e a RESPONSE terminar em .data
                this.produtos = response.data;
            })


        //fetch('http://localhost:3000/produto').then(r => r.json())
        //.then(r => {
        //this.produtos = r;
        //})
        }
    },
    // No CREATED() informamos tudo que deve ser carregado antes do APP ser MOUNTED
    created(){
        this.getProdutos();
    }
}
</script>

<style>

</style>