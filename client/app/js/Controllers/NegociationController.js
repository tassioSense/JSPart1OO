class NegociationController {

    constructor(){
        //vamos facilitar e encutar o uso do document.querySelector
        let $ = document.querySelector.bind(document); //o método bind cria um associação, para que o $ consiga acessar as propriedas dos document

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();
        
    }


    adiciona (event){
        event.preventDefault(); //para evitar que o form recarregue a pág;

        let negociacao1 = this._criaNegociacao();

        this._listaNegociacoes.adiciona(negociacao1);
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);

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
