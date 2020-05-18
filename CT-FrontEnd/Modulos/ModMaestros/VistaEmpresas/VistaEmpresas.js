function NuevaEmpresa(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaEmpresas/NuevaEmpresa.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}


function ActualizarEmpresa(emp){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaEmpresas/ActualizarEmpresa.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var empresa=emp;
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarEmpresas(selectEmp){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaEmpresas/ListarEmpresas.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var select =selectEmp;
            clearInterval(intervalo)
        }  
    }); 
    
}

function mostrarMensaje(tipo,msj){
  switch(tipo){
    case 'exito':
      $(".toast").html("<i class='fas fa-check fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#00c851");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar');    
      break;
    case 'error':
      $(".toast").html("<i class='fas fa-times fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#ff3547");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar'); 
      break;
    case 'advertencia':
      $(".toast").html("<i class='fas fa-exclamation fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#fb3");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar');
      break;
    case 'informativo':
      $(".toast").html("<div class='toast-header'>\
                         <svg class='' rounded mr-2' width='20' height='20' xmlns=http://www.w3.org/2000/svg'preserveAspectRatio='xMidYMid slice' focusable='false' role='img'>\
                         <rect fill='#007aff' width='100%' height='100%' /></svg>\
                         <strong class='mr-auto'>Pasos para renovar un contrato</strong>\
                         <button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='toast-body'>\
                          <li>1. Cambiar la empresa asignada al personal(Solo en caso de renovación de contrato por expiración del mismo).</li>\
                          <li>2. Aceptar el mensaje de confirmación y dirigirse a la sección Condición Laboral e ingresar los nuevos datos del personal.</li>\
                          <li>3. Verificar los datos, cerrar este mensaje, y hacer click en el boton 'Actualizar'</li>\
                        </div>");
       $('.toast').css("background-color","#030EF9");
       $('.toast').toast('show');
       $('.toast').addClass('visualizar');
          break;
          
  }
}


