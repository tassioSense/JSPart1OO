class NegociationController {

    constructor(){
        //vamos facilitar e encutar o uso do document.querySelector
        let $ = document.querySelector.bind(document); //o método bind cria um associação, para que o $ consiga acessar as propriedas dos document

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
       /* this._listaNegociacoes = new ListaNegociacoes((model)=>{ //observe que estamos passando a classNegociacaoController como parametro da instancia ListaNegociacoes, pois colocamos this
           //outra utilidade das Arrow functions: elas são léxicas, portanto
           // ela mantém o this acionado do escopo (neste caso, a class NegociationController) mesmo se ele for chamado em outro escopo. Neste caso, aliás, esta função é chamada na class ListaNeociacoes
            this._negocicoesToView.update(model);

        });*/

        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(),['adiciona', 'esvazia'], model =>
                this._negocicoesToView.update(model));


        this._negocicoesToView = new NegociacoesView($("#negociacoesView"));
        this._negocicoesToView.update(this._listaNegociacoes); //logo quando carregamos, inserimos os títulos da tabela. Neste momento a lista de Negociações está vazia, mas precisamos renderizar a table em si
                                                                //já no método adiciona, vamos adicionar a lista atualizada, nela conterá informações dentro da Array
        this._mensagem = ProxyFactory.create(new Mensagem(), ["texto"], model =>
            this._mensagemView.update(model));



        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
        
    }                       


    adiciona (event){
        event.preventDefault(); //para evitar que o form recarregue a pág;

        let negociacao1 = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao1);
        
        //this._negocicoesToView.update(this._listaNegociacoes); //aqui nossa Array tem valores, o que acionaram as tr e td do método _template
        
        this._mensagem.texto = "Adicionamos sua negociação. Obrigado :)"       
        this._limpaFormulario();


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
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas";
    }
 
}
