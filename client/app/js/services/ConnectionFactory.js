//dando a variável o mesmo nome da class para podermos usar seus métodos staticos
var ConnectionFactory = (function () {
    
    /*
    Module Pattern:
        Um módulo é uma unidade código confinada e que ninguém tem acesso ao conteúdo dentro dele.
        Uma maneira de criarmos um escopo privado no JavaScript é colocando o código em uma função. 
        Criaremos a function tmp(), e moveremos para dentro as variáveis juntamente com a definição da classe ConnectionFactory.

        Dessa forma, apenas a var ConnectioFactory está em um escopo global, impedindo o acesso as variáveis declaradas dentro da class
    
    */

    const stores = ["negociacoes"];
    const dbName = "frame";
    const version = 3;
    var connection = null;
    var close = null;

    return class ConnectionFactory { //retornando a class inteira para a função

        constructor() {

            throw new Error ("Está classe não pode ser instanciada");
        }

        static getConnection () {

            return new Promise ((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);
            
                    openRequest.onupgradeneeded = e => {

                        ConnectionFactory._createStores(e.target.result); //chamando método para criar as stores, pela instancia e.target.result

                    }

                    openRequest.onsuccess = e => {
                        if (!connection) { //esse if garante que a conexão não seja feita mais de uma vez, pois ele é executado apenas quando connection = null
                            connection = e.target.result;
                        
                        //Vamos fazer um Monkey Patch para evitar que alguém feche a conexão diretamente.
                        //nesse caso vamos sobrescrever o método close, mas antes vamos salvar método dentro de uma variável para usarmos mais tarde
                            close = connection.close();//.bind(connection);
                            connection.close = function() {
                                throw new Error ("você não pode fechar a conexão diretamente");
                            }
                        }   
                        resolve(connection);
                    }

                    openRequest.onerror = e => {
                        reject(e.target.Error.name);
                    }
            
            });
        }

        static _createStores(connection) {

            // criando nossos stores!
        
            stores.forEach(store => { //percorrendo cada store do Array store
        
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store)
                }; //verificando se já existe e apagando

                connection.createObjectStore(store, { autoIncrement: true }); //criando uma nova 
            });
        }

        static closeConnection () {

            if (connection){
               close; //chamando a variável close que tem o método close dentro dela
               connection = null;
            }

        }
    }
})();

