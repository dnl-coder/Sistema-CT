/*=============================================
    FUNCIONES DE CAMBIO DE VISTA
=============================================*/

//--REDIRIGIR A VISTA SEGUN LA OPCION EN CONTROL USUARIO--
function ControlUsuario(pers,op){
  
    var url="";
    
    switch (op){
        case "actualizarUsuario": 
            url= "Modulos/ModMaestros/VistaUsuarios/ActualizarUsuario.html";
        break;
            
        case "asignarPermisos":
            url= "Modulos/ModMaestros/VistaUsuarios/AsignarPermisos.html";
        break;
    }
  
    $.ajax({  
        url: url,   
        success: function(data) {  
            $('#cuerpo').html(data); 
            var personal=pers;
            clearInterval(intervalo)
        }  
    }); 
    
}

function mostrarMensaje(tipo,msj){
  switch(tipo){
    case 'exito':
      $(".toast").html("<i class='fas fa-check fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#00c851");
      $(".toast").toast("show");
      $(".toast").addClass("visualizar");    
      break;
    case 'error':
      $(".toast").html("<i class='fas fa-times fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#ff3547");
      $(".toast").toast("show");
      $(".toast").addClass("visualizar"); 
      break;
    case 'advertencia':
      $(".toast").html("<i class='fas fa-exclamation fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#fb3");
      $(".toast").toast("show");
      $(".toast").addClass("visualizar");
      break;
  }
}

var vistaUsuario = function(){}
//--FUNCION PARA MOSTRAR PERMISOS PERMITIDOS AL PERSONAL--
vistaUsuario.prototype.cargarPermisos = function(personal){
    var $codigo={
        '_codigo' : personal
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Usuario/Controlador_MostrarPermisosUsuario.php',
        type: 'POST',
        data: $codigo,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'El usuario no tiene ningún permiso.');
            }else{
                var compuesto =datos.ACCPERSONAL.split("","4");
                for(var i=0;i<compuesto.length;i++){
                    if(compuesto[i]==1){
                        document.getElementById('personal'+(i+1)).checked=true;
                    } 
                }
                Object.keys(datos).forEach(function(key) {
                    if(datos[key]=="1"){
                        document.getElementById(key.toLowerCase()).checked=true;
                    }
                });

            }
        }
    });
}


var vUsuario = new vistaUsuario();
