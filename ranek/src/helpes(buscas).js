export function serialize(obj){
     //Variavel vazia criada para receber o route
     let queryString = ""
     //O FOR é para cada chave{"q": "Globo", "teste": "oi"} em obj(this.$route.query)
     //EX do return do FOR: &q=Globo&teste=oi
     for(let key in obj){
         queryString += `&${key}=${obj[key]}`
     }
     console.log(queryString)
     //retorna esta STRING "/produto?_limit=10" + a KEY e a $route em queryString
    return queryString;
}

//FUNÇÃO que retorna o GET e o SET do UsuarioForm.vue
export function mapFields(options) {
    const object = {};
    for (let x = 0; x < options.fields.length; x++) {
      const field = [options.fields[x]];
      object[field] = {
        get() {
          return this.$store.state[options.base][field];
        },
        set(value) {
          this.$store.commit(options.mutation, { [field]: value });
        }
      };
    }
    return object;
  }