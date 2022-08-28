<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProdutosAdicionar/>
    <h2>Seus Produtos</h2>
    <!-- Transition no grupo dentro de transition-group 
    Se existir v-if="usuario_produtos", exibe isto
    o tag="ul" diz que essa transition-group sera uma UL -->
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <!-- Faz o LOOP e passa para o componente PAI(UsuarioProdutos) apenas o :produto="produto" -->
        <!-- este ProdutoItem está sendo renderizado no SLOT do filho ProdutoItem.vue -->
        <ProdutoItem :produto="produto">
          <p>{{produto.descricao}}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>

import ProdutosAdicionar from '@/components/ProdutosAdicionar.vue';
import {mapState, mapActions} from "vuex";
import ProdutoItem from "../../components/ProdutoItem.vue";
import { api } from '@/services.js'
export default {
    name: "UsuarioProdutos",
    components: { ProdutosAdicionar, ProdutoItem },
    computed:{
      //faz o VUEX das variaveis no STATE em store/index.js e passamos os STATE que queremos utilizar 
      ...mapState(["login", "usuario", "usuario_produtos"]),
    },
    methods:{
      //faz o VUEX das ACTIONS em store/index.js, e passamos as ACTIONS que queremos utilizar 
      ...mapActions(["getUsuarioProdutos"]),
      //Methods para deletar produto
      deletarProduto(id){
        //Exibe um alerte de CONFIRM
        const confirmar = window.confirm("Deseja remover este produto?");
        //Se confirmar = true, continua
        if(confirmar){
          api.delete(`/produto/${id}`).then(() => {
            this.getUsuarioProdutos();
            //O catch faz o tratamento caso nao consiga fazer o delete
          }).catch(error => {
            console.log(error.response)
          });
        }
      }

    },
    //Fica assistindo ao LOGIN e qualquer alteração executa this.getUsuarioProdutos();
    //Tratamento de erro caso o login não esteja ativo antes do CREATED()
    watch:{
      login(){
        this.getUsuarioProdutos();
      }
    },
    created(){
      //Se o login estiver ATIVO executa this.getUsuarioProdutos();
      if(this.login){
        this.getUsuarioProdutos();
      }
    }
};
</script>

<style scoped>
  h2 {
    margin-bottom: 20px;
  }
  
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  
  .deletar {
    position: absolute;
    top: 0px;
    right: 0px;
    background: url("../../assets/remove.svg") no-repeat center center;
    width: 24px;
    height: 24px;
    text-indent: -140px;
    overflow: hidden;
    cursor: pointer;
    border: none;
  }
  </style>
