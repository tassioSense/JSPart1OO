class NegociacoesView extends View {
    //herdando da class View

    constructor (elemento){

        super(elemento);  // passando o parametro para a class pai

    }

    _template(listaNecociacao) {
        //usando template string 
        return `<table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                      ${listaNecociacao.negociacoes.map((n) => {
                          return ` 
                                <tr>
                                    <td>${DateHelper.dataParaTexto(n.data) }</td>
                                    <td>${n.quantidade}</td>
                                    <td>${n.valor}</td>
                                    <td>${n.volume}</td>
                                </tr>
                                                                         
                      `}).join(" ")
                        /* vamos usar do artificio da tamplete string para colocar as trs e tds dentro da tabela.
                        como listaNecociacao vem como uma array, vamos primeiro varre-la com o map, pegar as informaçções e colocar dentro das td;
                        Depois disso, usamos o join para transformar a nova Array criada pelo map em uma string, já que a template string exige isso                        
                        */

                      }
                </tbody> 
                    <td colspan="3"> </td>
                    <td>${ //vamos usar o método reduce para pegar a Array e reduzir seus elementos em um. Neste caso, vamos apenas pegar os volumes da nossa array
                            listaNecociacao.negociacoes.reduce((total, n) => {
                                return total + n.volume;                       
                            }, 0.0)

                    }</td>

                <tfoot>
                
                </tfoot>
        </table>`
    }

    

}