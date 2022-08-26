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