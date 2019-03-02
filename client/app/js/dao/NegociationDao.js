class NegociationDao {

    constructor(connection) {

        this._connection = connection; //passando a conexão aberta a class ConnectionFactory
        this._store = "negociacoes"; //store criada na class ConnectionFactory
    }         
     

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };                
        });
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .openCursor(); //o cursos percorrerá cada objeto dentro do Object storee
            
            let negociacoes = [];


            
            cursor.onsuccess = e => {

                    let atual = e.target.result; //lembrando que o e.tagert.result representa uma referencia para a instancia criada do Object Store
                //importante: quando gravamos algo na Object store, estamos guardando no formato JSON
                    if(atual) {

                        let dado = atual.value; //o atual aqui pode ser comparado com o this. Ele refecnia cada objeto dentr do Objeto store, um de cada vez

                        negociacoes.push(new Negociation(dado._data, dado._quantidade, dado._valor)); //lembrando que o Objecto store guarda, na verdade, as propriedades de um objeto, mas não o objeto em si
                                                                                                    //por isso aqui instanciamos Neogiciation

                        atual.continue(); //o continue pula para o próximo objeto dentro da store

                    } else { 

                        resolve(negociacoes); //1uando não tiver mais negociações no cursor, ele cairá aqui e fará o resolve e listar as negociacoes
                    }

                };
        

                cursor.onerror = e => {
                    console.log('Error:' + e.target.error.name);
                    reject("Não foi possível listar as negociações")
                };
        });
       


    }

    apagaTudo() {
       
        return new Promise ((resolve, reject) => {
 
            let clearRequest = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .clear(); 

            clearRequest.onsuccess = e => resolve("Todas as negociações foram removidas");

            clearRequest.onerror = erro => {
                console.log(erro);
                reject("Não foi possível apagar as negociações");
            
            }

        })  
    }


}     
