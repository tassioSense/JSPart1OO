class NegociacaoService {

constructor() {
    this._http = new HttpService();

}

    cadastra(negociacao) {

            
        return ConnectionFactory
        .getConnection()
        .then(conexao => new NegociationDao(conexao)) 
        .then(dao => dao.adiciona(negociacao))
        .then(() => 'Negociação cadastrada com sucesso')
        .catch(erro => {
            throw new Error("Não foi possível adicionar a negociação")
        });                      

    }

    obterNegociacoesDaSemana() {

                //Vamos fazer o importação do servidor remoto utilizando o padrão promise
         
        return new Promise ((resolve, reject) => {

            //o que estiver em resolve, será retornado em then, na class NegociationController.
            // o que está em reject vai pra catch na mesma class

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociation(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                })
    });

}

    obterNegociacoesDaSemanaAnterior() {

        return new Promise ((resolve, reject) => {

            //o que estiver em resolve, será retornado em then, na class NegociationController.
            // o que está em reject vai pra catch na mesma class

            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociation(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                })
    });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise ((resolve, reject) => {

            //o que estiver em resolve, será retornado em then, na class NegociationController.
            // o que está em reject vai pra catch na mesma class

            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociation(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                })
        });
    }

    obterNegociacoes() {
            return Promise.all([

                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()])
                    .then(periodos => {

                        let negociacoes = periodos
                            .reduce((dados, periodos) => dados.concat(periodo), [])
                            .map(dado => new Negociation (new Date(dado.data), dado.quantidade, dado.valor));

                        return negociacoes;

                    }).catch(erro =>{
                        throw new Errorr (erro);
                    })

    }

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível importar as negociações");
            });
    }

     /*   
     obterNegociacoesDaSemana(callback) {

            //Vamos fazer o importação do servidor remoto utilizando o new XMLHttpRequest()
     

    let xhr = new XMLHttpRequest(); //primeiro vamos criar um objeto para podermo trabalhar com suas propriedades

    xhr.open('GET', 'negociacoes/semana');
    O método open() recebeu dois parâmetros: o primeiro especifica o tipo de requisição a ser realizada(GET), o segundo é o endereço (negociacoes/semana).
     Se trabalhássemos com outro endereço do serviço na Web, seria necessário colocar o endereço completo. 
     Como estamos trabalhando localmente, só adicionamos negociacoes/semana. 
     
     A requisição ainda não está pronta. Será preciso fazer várias configuração antes de realizar o envio. 
     É o que faremos a seguir: primeiramente, precisamos entender que toda requisição AJAX passa por estados - um deles nos dará os dados retornados do servidor.
     Por isso, precisamos interagir com esses estados e especificar que adicionaremos os dados de um deles no nosso model.
     O xhr tem a propriedade onreadystatechange, depois, passaremos uma arrow funtion que será chamada sempre que o estado do xhr for modificado.

    Então, quais são os estados possíveis de um requisição AJAX? Listaremos abaixo os estados:

    0: requisição ainda não iniciada

    1: conexão com o servidor estabelecida

    2: requisição recebida

    3: processando requisição

    4: requisição está concluída e a resposta está pronta

     

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) { //descobrindo o stage da requisição
           
            if(xhr.status == 200) { //é necessário verificar o status da resposta da requisição, se for diferente de 200, o servidor pode estar retornando um erro

                //pelo metodo responseText consequimos ter acesso as informações retornadas pelo servidor
                //mas isso vem em formato string, por isso usamos o JSON.parse para transforma em OBjetos dentro de um Array
                callback(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociation (new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    

                
                //Esta estratégia de Error-First significa que passaremos a função obterNegociacoesDaSemana(), 
                //se tiver sucesso receberá o primeiro parâmetro null, indicando que não teve o erro, e no segundo parâmetro,
                //teremos o retorno. Em caso de erro, o primeiro parâmetro passarem será o erro, e o segundo, será o valor null.
                //Temos a opção de deixar o segundo parâmetro em branco também. 
        
                
            } else {

                console.log(xhr.responseText);
                cb('Não foi possível obter as negociações da semana', null);
            
            }
        }
    };
    xhr.send(); //Mas até aqui, a requisição não será executada. Para que a ação seja executada, usaremos o método send().
    

}
        
        
        }
        */

}