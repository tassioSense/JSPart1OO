class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {

                        Reflect.apply(target[prop], target, arguments);//trocando o target da instancia, pelo target do proxy  , arguments é um variável implicita que obtem todos os parametros da instancia delclarado no Proxy
                        //portanto, target agora é o Proxy de Lista de Negociações

                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);       
            },

            set(target, prop, value, receiver){

                if (props.includes(prop)) {
                    target[prop] = value; //passando o valor da mensagem para a propriedade texto
                    acao(target);
                }
               return Reflect.set(target, prop, value, receiver);
                
            }
        })
    }

    /*Como Reflect.apply funciona? O primeiro parâmetro é o método ou função que desejamos invocar. 
    O segundo parâmetro é o contexto que o método ou função adotará, ou seja,
    o valor que será assumido pelo this. Por fim, o último parâmetro é um array que contém todos os parâmetros que o método passado como primeiro parâmetro receberá.
    Como ele não recebe parâmetro nenhum, passamos um array vazio. */

    static _ehFuncao (funcao) {
        return typeof(funcao) == typeof(Function);              
    }
}

  
