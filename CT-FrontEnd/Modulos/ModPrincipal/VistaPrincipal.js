/*==========================================================

ACCIONES A REALIZAR AL CARGAR LA PAGINA

==========================================================*/

$(document).ready(function() {
    consultaOPEstado();
    consultaTrabajadoresTurno();
    consultaUltimosClientes();
    
});


/*==========================================================

RELOJ

==========================================================*/

function clock() {// We create a new Date object and assign it to a variable called "time".
    var time = new Date(),

        // Access the "getHours" method on the Date object with the dot accessor.
        hours = time.getHours(),

        // Access the "getMinutes" method with the dot accessor.
        minutes = time.getMinutes(),


        seconds = time.getSeconds();

    document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

    function harold(standIn) {
        if (standIn < 10) {
          standIn = '0' + standIn
        }
        return standIn;
    }
}
var intervalo = setInterval(clock, 1000);

/*==========================================================

MOSTRAR GRAFICO DE SEGUIMIENTO DE LAS ORDENES DE PRODUCCION

==========================================================*/

var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          borderColor: [
            'rgba(200, 99, 132, .7)',
          ],
          borderWidth: 2
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true
    }
});

/*==========================================================

FUNCION MOSTRAR CANTIDAD DE ORDENES POR ESTADO

==========================================================*/

function consultaOPEstado(){
    var login = $.ajax({
        url: '../CT-BackEnd/Controlador/ModPrincipal/Controlador_OPEstado.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("No se pudo establecer conexion con el servidor");
            }
            else{
                console.log("Error no identificado");
            }
        },
        success: function(datos){      
            
            if(datos.response == 0){
                console.log('ERROR: '+datos.message);
            }
            else{
                mostrarOPEstado(datos);
            }
        }
    });
}

function mostrarOPEstado(datos){
    var tablaop="";
    
    tablaop+="<table class='table table-bordered table-striped'><tbody>";
    
    for(var i=0; i<datos.length; i++){
        
        tablaop+="<tr><td class='py-0 my-0'>"+datos[i].estadoOP+"</td><td class='py-0 my-0'>"+datos[i].cantidad+"</td></tr>"
        
    }

    tablaop+="\</tbody></table>";
    
    $("#opestado").append(tablaop);

    
}

/*==========================================================

FUNCION MOSTRAR TRABAJADORES POR TURNO (NOMBRE + AREA)

==========================================================*/

function consultaTrabajadoresTurno(){
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModPrincipal/Controlador_TrabajadorTurno.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("No se pudo establecer conexion con el servidor");
            }
            else{
                console.log("Error no identificado");
            }
        },
        success: function(datos){
            
            if(datos.response=="0"){
                console.log('ERROR: '+datos.message);
            }
            else{
                mostrarTrabajadoresTurno(datos);
            }
        }
    });
}

function mostrarTrabajadoresTurno(datos){
    
    var tablaTrabajadoresTurno="";
    
    tablaTrabajadoresTurno+="<table class='table table-bordered table-striped'><tbody>";
    
    for(var i=0; i<datos.length; i++){
        
        tablaTrabajadoresTurno+="<tr><td>"+datos[i].nombre+"</td><td>"+datos[i].GRUPTURNO+"</td></tr>"
        
    }

    tablaTrabajadoresTurno+="\</tbody></table>";
    
    $("#TTurno").append(tablaTrabajadoresTurno);
}

/*==========================================================

FUNCION MOSTRAR ULTIMOS CLIENTES QUE REALIZARON UN PEDIDO

==========================================================*/

function consultaUltimosClientes(){
    var login = $.ajax({
        url: '../CT-BackEnd/Controlador/ModPrincipal/Controlador_UltimosClientes.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("No se pudo establecer conexion con el servidor");
            }
            else{
                console.log("Error no identificado");
            }
        },
        success: function(datos){
            
            if(datos.response=="0"){
                console.log('ERROR: '+datos.message);
            }
            else{
                mostrarUltimosClientes(datos);
            }
        }
    });
}

function mostrarUltimosClientes(datos){
    
    var tablaUltimosClientes="";
    
    tablaUltimosClientes+="<table class='table table-bordered table-striped'><tbody>";
    
    for(var i=0; i<datos.length; i++){
        
        tablaUltimosClientes+="<tr><td>"+datos[i].cliente+"</td></tr>"
        
    }

    tablaUltimosClientes+="\</tbody></table>";
    
    $("#UClientes").append(tablaUltimosClientes);
}