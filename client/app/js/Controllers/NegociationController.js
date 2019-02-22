class NegociationController {

    constructor(){
        //vamos facilitar e encutar o uso do document.querySelector
        let $ = document.querySelector.bind(document); //o método bind cria um associação, para que o $ consiga acessar as propriedas dos document

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
        this._negocicoesToView = new NegociacoesView($("#negociacoesView"));
        this._negocicoesToView.update(this._listaNegociacoes); //logo quando carregamos, inserimos os títulos da tabela. Neste momento a lista de Negociações está vazia, mas precisamos renderizar a table em si
                                                                //já no método adiciona, vamos adicionar a lista atualizada, nela conterá informações dentro da Array
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
        
    }                       


    adiciona (event){
        event.preventDefault(); //para evitar que o form recarregue a pág;

        let negociacao1 = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao1);
        this._mensagemView.update(this._mensagem.texto = "Adicionamos sua negociação. Obrigado :)"); //atualizando a Mensagem
        this._negocicoesToView.update(this._listaNegociacoes); //aqui nossa Array tem valores, o que acionaram as tr e td do método _template

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

}
