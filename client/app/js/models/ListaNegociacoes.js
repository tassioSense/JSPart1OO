class ListaNegociacoes {

    constructor (IniciaView) {
        this._negociacoes = [];
        this._iniciaView = IniciaView;
        
    }

    adiciona(negociacao) {
        
        this._negociacoes.push(negociacao);
       this._iniciaView(this); //como usamos uma Arrow Function, o this aqui é referente a class NecociationController
               
    }

    get negociacoes() {
        /*
        Ao passarmos o this._negociacoes dentro do concat(), o retorno será uma nova lista, um novo array.
        Agora se tentarmos usar o push() do NegociacaoController, 
        só conseguiremos fazer a alteração na cópia da lista, mas não na original.
        */
        return [].concat(this._negociacoes); //blindando nosso modelo de negocio
    }

    esvazia () {

        this._negociacoes = [];
        this._iniciaView(this); //como usamos uma Arrow Function, o this aqui é referente a class NecociationController
    }
}