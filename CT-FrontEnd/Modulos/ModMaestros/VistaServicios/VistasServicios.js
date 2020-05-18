function NuevoServicio(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaServicios/NuevoServicio.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ActualizarServicio(serv){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaServicios/ActualizarServicios.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var servicio=serv;
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarServicio(opcionListar, selectListar){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaServicios/ListarServicios.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            
            var opcion = opcionListar;
            
            var select = selectListar;
            
            clearInterval(intervalo);
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

/*=============================================
    FUNCIONES GENERALES
=============================================*/

var vistaServicio = function (){}

//--CARGAR ESTADO--
vistaServicio.prototype.mostrarEstado = function(op){
    var boxEstado="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Servicios/Controlador_MostrarEstado.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxEstado+="<option value='' selected>Elegir Estado</option>";
            $("#estcodigo").html(boxEstado);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxEstado+="<option value='' selected>Elegir Estado</option>";
                $("#estcodigo").html(boxEstado);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxEstado+="<option value='' selected>Elegir Estado</option>";
                    }
                    boxEstado+="<option value='"+datos[i].ESTCODIGO+"'>"+datos[i].ESTDESCRIPCION+"</option>";
                }
                if(op!=""){
                    $("#estcodigo").html(boxEstado);
                    $("#estcodigo option[value="+op+"]").attr("selected",true);
                }else{
                    $("#estcodigo").html(boxEstado);
                }
            }
        }
    });  
}

//--CARGAR FAMILIA-- 
vistaServicio.prototype.mostrarFamilia = function(OP){
    var boxFamilia="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Servicios/Controlador_MostrarFamilia.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxFamilia+="<option value='' selected>Elegir Familia</option>";
            $("#servfam").html(boxFamilia);
        },
        success: function(datos){

            if(datos.response=="0"){
                boxFamilia+="<option value='' selected>Elegir Familia</option>";
                $("#servfam").html(boxFamilia);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxFamilia+="<option value='' selected>Elegir Familia</option>";
                    }
                    boxFamilia+="<option value='"+datos[i].FAMCODIGO+"'>"+datos[i].FAMDESCRIPCION+"</option>";
                }
                if(OP!=""){
                    $("#servfam").html(boxFamilia);
                    $("#servfam option[value="+OP+"]").attr("selected",true);
                }else{
                    $("#servfam").html(boxFamilia);
                }
            }
        }
    });  
}

//--CARGAR SUBFAMILIA--
vistaServicio.prototype.mostrarSubFamilia = function(opcion,Op){
    var boxSubFamilia="";
    
    var $servfam={
        '_servfam': opcion
        }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Servicios/Controlador_MostrarSubFamilia.php',
        type: 'POST',
        data: $servfam,
        datatype: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxSubFamilia+="<option value='' selected>Elegir SubFamilia</option>";
            $("#servsubfam").html(boxSubFamilia);
        },
        success: function(datos){

            if(datos.response=="0"){
                boxSubFamilia+="<option value='' selected>Elegir SubFamilia</option>";
                $("#servsubfam").html(boxSubFamilia);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxSubFamilia+="<option value='' selected>Elegir SubFamilia</option>";
                    }
                    boxSubFamilia+="<option value='"+datos[i].SUBFAMCODIGO+"'>"+datos[i].SUBFAMDESCRIPCION+"</option>";
                }
                if(Op!=""){
                    $("#servsubfam").html(boxSubFamilia);
                    $("#servsubfam option[value="+Op+"]").attr("selected",true);
                }else{
                    $("#servsubfam").html(boxSubFamilia);
                }
                
            }
        } 
    });
}

var vServicio = new vistaServicio();



