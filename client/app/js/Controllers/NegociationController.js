class NegociationController {

    constructor(){
        //vamos facilitar e encutar o uso do document.querySelector
        let $ = document.querySelector.bind(document); //o método bind cria um associação, para que o $ consiga acessar as propriedas dos document

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._ordemAtual = '';
       /* this._listaNegociacoes = new ListaNegociacoes((model)=>{ //observe que estamos passando a classNegociacaoController como parametro da instancia ListaNegociacoes, pois colocamos this
           //outra utilidade das Arrow functions: elas são léxicas, portanto
           // ela mantém o this acionado do escopo (neste caso, a class NegociationController) mesmo se ele for chamado em outro escopo. Neste caso, aliás, esta função é chamada na class ListaNeociacoes
            this._negocicoesToView.update(model);

        });*/

        //atualizando a view para as negociações e antes de ter negociações
        this._listaNegociacoes = new Bind (new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem')
                                                                                                                //aqui vamos fazer uso do Rest Operator
        
        //atualizando a view com mensagem
        this._mensagem = new Bind (new Mensagem(), this._mensagemView = new MensagemView($("#mensagemView")) , "texto");
                                                                                                            //aqui vamos fazer uso do Rest Operator

        
         this._init();       
    }                       

    _init() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociationDao(connection)
            .listaTodos()
            .then(negociacoes =>          
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))))
            .catch(erro => {
                 console.log(erro);
                this._mensagem.texto = erro;
            });    

    }

    adiciona (event){
        event.preventDefault(); //para evitar que o form recarregue a pág;

        let negociacao = this._criaNegociacao();

        new NegociacaoService()    
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem; 
                this._limpaFormulario();  
            }).catch(erro => this._mensagem.texto = erro);


    }

    importaNegociacoes() {

        let service = new NegociacaoService(); //deontro da classe temos new Promise

        //lembrando que promise são assicronas
    

        Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaAnterior(), service.obterNegociacoesDaSemanaRetrasada()])
            .then(negociacoes => {
                negociacoes
                  .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []) 
                  .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);  //se não fizermos o reduce, a then retornará um Array para cada função declarada no all, cada array com uma negociação
                                                          //mas queremos apenas um array com uma lista de negociações
        
        


      /*COMENTADO PARA FINS DIDÁTICOS

        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }
      
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                   
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
          
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                        if(erro) {
                            this._mensagem.texto = erro;
                            return;
                        }
                
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                this._mensagem.texto = 'Negociações importadas com sucesso';
        
                 });

        
            
             });


        
        }); */
        
    }

    _criaNegociacao() {
        //instanciando uma Negociação
        
        return new Negociation(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);

      }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();

    }

    apaga () {


        ConnectionFactory
            .getConnection()
            .then(connection => new NegociationDao(connection))
            .then(dao => dao.apagaTudo())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });
        
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna) {
            
            this._listaNegociacoes.inverteOrdem();

        } else {
            
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]); //enviando um critério para a classe ListaNegociacoes ordenar a lista
        }
        this._ordemAtual = coluna;


    }

 
}
