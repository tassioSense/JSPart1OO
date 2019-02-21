class Mensagem {

    constructor(texto="") { //observe que para o parametro texto, atribuimos um valor padrão, para quando ainda não tivermos mensagem
                            //mas caso o usuário atribua algum valor, o JS atribuirá o valor ao parametro texto substituindo a ""

        this._texto = texto;

    }

    get texto () {

        return this._texto;
        
    }

    set texto(texto){

        this._texto = texto;

    }

}