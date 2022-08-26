<template>
    <section>
        <form>
        <!-- O V-MODEL guarda o que foi digitado no input e transfere para a variavel em data() -->
            <input type="text" name="busca" id="busca" v-model="busca" placeholder="Buscar...">
        <!-- Ao CLICK.prevent(previne o comportamente padrão) executa o methods buscarProdutos -->
            <input type="submit" id="lupa" value="Buscar" @click.prevent="buscarProdutos">
        </form>
    </section>
</template>

<script>
export default {
    data(){
        return{
            busca: ""
        }
    },
    methods:{
        buscarProdutos(){
            //na $router(http://localhost:8080/?q=luva) insere a informação com .push()
            //e através do .push({query: {q: this.busca} }) passa o que foi digitado no input
            //e salvo na variavel busca
            this.$router.push({query: {q: this.busca} })
        }
    }
}
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  border-radius: 4px;
  transition: all .5s;
}

#busca:focus,
#busca:hover {
    outline:none;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}

#lupa {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>