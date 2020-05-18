function NuevaMaquina(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaMaquinas/NuevaMaquina.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ActualizarMaquina(maq){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaMaquinas/ActualizarMaquina.html',   
        success: function(data) {  
            $('#cuerpo').html(data); 
            var maquina=maq;
            clearInterval(intervalo)
            
        }  
    }); 
    
}

function ListarMaquinas(selectmaq){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaMaquinas/ListarMaquinas.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var select =selectmaq;
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

var vistaMaquinas = function (){}

vistaMaquinas.prototype.validar = function(OP){
    
    var R1 = $("#nombre").val();
    var R2 = $("#costo").val();
    var R4 = $("#area").val();
    var R5 = $("#estado").val();
    
    if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#nombre").focus();
    }
    else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#costo").focus();
    }
    else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#area").focus();
    }
    else if(R5 == null || R5.length == 0 || /^\s+$/.test(R5)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#estado").focus();
    }else{
        mostrarMensaje("exito","EXITO: Validación de datos correcta...");
        switch(OP) {
          case 'VALIDAR':
                ValidarMaquinas();
            break;
          case 'ACTUALIZAR':
                ActualizarDatosMaquina();
            break;
        }
    }
        
}

//--CARGAR AREA--
vistaMaquinas.prototype.mostrarArea = function(opcion){
    var boxMaquina="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Maquinas/Controlador_MostrarArea.php',
        type:'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxMaquina+="<option value='' selected>Elegir Area</option>";
            $("#area").html(boxMaquina);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxMaquina+="<option value='' selected>Elegir Area</option>";
                $("#area").html(boxMaquina);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxMaquina+="<option value='' selected>Elegir Area</option>";
                    }
                    boxMaquina+="<option value='"+datos[i].AREAMAQCODIGO+"'>"+datos[i].AREAMAQDESCRIPCION+"</option>";
                }
                if(opcion!=""){
                    $("#area").html(boxMaquina);
                    $("#area option[value="+opcion+"]").attr("selected",true);
                }else{
                    $("#area").html(boxMaquina);
                }
                
            }
        }
    });
}

//--CARGAR ESTADO--
vistaMaquinas.prototype.mostrarEstado = function(Opcion){
    var boxEstado="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Maquinas/Controlador_MostrarEstado.php',
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
            $("#estado").html(boxEstado);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxEstado+="<option value='' selected>Elegir Estado</option>";
                $("#estado").html(boxEstado);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxEstado+="<option value='' selected>Elegir Estado</option>";
                    }
                    boxEstado+="<option value='"+datos[i].ESTCODIGO+"'>"+datos[i].ESTDESCRIPCION+"</option>";
                }
                if(Opcion!=""){
                    $("#estado").html(boxEstado);
                    $("#estado option[value="+Opcion+"]").attr("selected",true);
                }else{
                    $("#estado").html(boxEstado);
                }
            }
        }
    });  
} 

var vMaquinas = new vistaMaquinas();

