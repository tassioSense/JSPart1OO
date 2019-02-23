class Bind {

/*Usando do principio do data biding, criando uma associação entre o objeto e a view,
 para não precisamos ficar chamando o método update */    

        constructor(objeto, view, ...props) { //os ... são o rest operator, que junta todos os parametros a partir do terceiro em um Array, que é o que precisamos
    
           let proxy = ProxyFactory.create(objeto, props, (objeto) => { //atualizando a view para uma nova negociação
               view.update(objeto);
           });
           
           view.update(objeto); //atualizando a view mesmo sem negociações listadas
           return proxy;
        }

}