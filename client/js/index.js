var campo = [ //guardando os input na Array
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor"),
];


var tBody = document.querySelector("table tbody"); //pegando o tbody

document.querySelector(".form").addEventListener("submit", function(event){ //criando um evento para o submit 
   
    event.preventDefault(); //não submeta o formulário, evitando perder os dados
   
    var tr = document.createElement("tr"); 

    campo.forEach(function(campo) { //para cada valor no array atribuir será atribuida uma td

        var td = document.createElement("td");
        td.textContent = campo.value;
        tr.appendChild(td);

    });

    var tdVolume = document.createElement("td"); //criando a td que terá o resultado volume
    tdVolume.textContent = campo[1].value * campo[2].value; //calculando o valor
    
    tr.appendChild(tdVolume); //colocando tdVolume como filho de tr
    tBody.appendChild(tr); //colocando tr como filho de tBody

    campo[0].value = "";
    campo[1].value = 1;
    campo[2].value = 0;
    campo[0].focus();
    
    alert("fazendo teste direto do GitHUb");
    

});
