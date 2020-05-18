/*=============================================
    FUNCIONES DE CAMBIO DE VISTA
=============================================*/

function RegistrarClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/RegistrarClientes.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ActualizarClientes(clien){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/ActualizarClientes.html',   
        success: function(data) {  
            $('#cuerpo').html(data); 
            var cliente=clien;
            clearInterval(intervalo)
            
        }  
    }); 
    
}

function NuevoClienteCredito(clien){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/NuevoClienteCredito.html',   
        success: function(data) {  
            $('#cuerpo').html(data);  
            var cliente=clien;
            clearInterval(intervalo)
            
        }  
    }); 
    
}

function ListarClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/ListadoClientes.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
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
