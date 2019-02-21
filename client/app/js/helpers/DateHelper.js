class DateHelper {

    constructor() {

        throw new Error("Está classe não pode ser instanciada, acesse métodos static");
    }

/* Nesta classe vamos criar métodos estáticos, que são métodos que podem ser acessados sem a necessidade de uma instancia.
Podemos acessar estes métodos usando o NomeDaClasse.MetodoStatico*/

    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    
    
    static textoParaData(texto) {
        //primeiro vamos fazer um ReGex para validar a entrada da data
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Por favor, a data deve estar no formato aaaa-mm-dd');

        // o valor recebido pelo input date é uma string. 
        //Precisamos transforma-la em uma data para que a classe Negociacao receba este atributo.                                                                    
        //let data = new Data(this._inputData.replace(/-/g, "/")); //aqui usamos uma ReGex

        /*spread operator(...)
        também temos o split para cortar a string dentro da this._inputData, mas ela criará um array sem o -,
        com este spread operator, indicamos que o array criado será desmembrado - e o primeiro item do array será o primeiro parametro do construtor do Date, e assim por diante
        */

        /*Além do spread vamos usar o método map, que varre o Array em cada posição e permite fazermos uma operação em cada parametro.
        */
       
        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));   //pegando a posição do array (indice) e fazendo menos módulo de 2
        //observe o uso da Arrow function         //0 % 2 = 0, 1 % 2 = 1, 2 % 2 = 0
                                                  

    }




}