class Negociation {

    constructor(data, quantidade,valor){
        //o _ , por covenção, simboliza um atributo private

        this._data = new Date(data.getTime()); //instanciando um novo objeto para garantir que o usuário não irá alterar a data
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this); //encapsulando a instancia

    }

    get data(){

        return new Date(this._data.getTime()); //instanciando um novo objeto para garantir que o usuário não irá alterar a data

    }
    get quantidade(){

        return this._quantidade;
    
    }
    get valor(){

        return this._valor;

    }

    get volume(){

        return this._quantidade * this._valor;
   
    }
    
    
    
}