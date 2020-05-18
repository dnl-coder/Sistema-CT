function NuevoProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/NuevoProveedor.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListadoProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/ListadoProveedores.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function NuevoGato(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/NuevoGasto.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarFechas(fInicio,fFinal){
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/ListadoGastos.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var FInicio =fInicio;
            var FFinal=fFinal;
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


