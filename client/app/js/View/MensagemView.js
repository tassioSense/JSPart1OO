class MensagemView{

    constructor(elemento) {

        this._elemento = elemento;

    }

    _template (modelText) { //perarando o HTML para receber a mensagem 

        return modelText.texto ? `<p class="alert alert-info"> ${modelText.texto} </p>` : `<p></p>` ;

    }

    _update() {
        this._elemento.innerHTML = this._template(model);

    }



}