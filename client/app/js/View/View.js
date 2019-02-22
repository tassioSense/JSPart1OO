class View {
//Aqui criamos uma class pai, que servirá como base para as outras class views

    constructor (elemento) {

        this._elementoNegociacoes = elemento; // os elementos são recebidos pela classe pai

    }

        template() {

            throw new Error ("É obrigatório que sobrescreva este método");
        }

        update(listaNecociacao) { 
            //recebemos uma lista de negociações em Array
            //innerHTML converte um string em elemento HTML, desde que estés esteja com a semantica correta. assim conseguimos jogar a string no DOM e converte-la em strutura web
    
            this._elementoNegociacoes.innerHTML = this.template(listaNecociacao); //vamos passar a nova lista para o template e colocar os valor dentro da tabela.
        }   

    
}