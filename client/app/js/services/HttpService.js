class HttpService {

    /*
    é possível emularar com fidelidade o Fetch API, criando no escopo global do navegador esta funcionalidade.

    Você pode usar este polyfill, baixando-o da pasta https://github.com/github/fetch/blob/master/fetch.js.
     O script deve ser carregado como primeiro script da nossa página em body.
    */

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText); //lança um erro caso status da res <> 200 a 299
        return res; //retorna a resposta caso não dê erro
    }

    get (url) {

        return fetch(url)
        .then(res => this._handleErrors(res)) //conferindo o status da respsota
        .then(res => res.json()); //convertendo a resposta em json
    
    
       /* COMO FARIAMOS ANTES DA FETCH API:
       
       return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) { //é necessário verificar o status da resposta da requisição, se for diferente de 200, o servidor pode estar retornando um erro


                         //pelo metodo responseText consequimos ter acesso as informações retornadas pelo servidor
                        //mas isso vem em formato string, por isso usamos o JSON.parse para transforma em OBjetos dentro de um Array
                        
                        resolve(JSON.parse(xhr.responseText));

                    } else {

                        reject(xhr.responseText);
                   
                    }
                }
            }

            xhr.send();
        }); */


    }    

        post(url, dado) {

         
            return fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                body: JSON.stringify(dado)
            })
            .then(res => this._handleErrors(res));

        /* SEM USAR FETCH API
            return new Promise((resolve, reject) => {
    
                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {
    
                    if (xhr.readyState == 4) {
    
                        if (xhr.status == 200) {
    
                            resolve(JSON.parse(xhr.responseText));
                        } else {
    
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
            }); */
    
        }          


}