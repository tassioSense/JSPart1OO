class MensagemView extends View {
//herdando da class View
    constructor(elemento) {

        super(elemento); //passando o parametro para a classe pai

    }

    _template (modelText) { //perarando o HTML para receber a mensagem 

        return modelText.texto ? `<p class="alert alert-info"> ${modelText.texto} </p>` : `<p></p>` ;

    }

    


}