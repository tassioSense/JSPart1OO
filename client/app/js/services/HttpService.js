class HttpService {

    get (url) {

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
        });

    }    

        post(url, dado) {


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
            });
    
        }          


}