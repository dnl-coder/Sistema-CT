/*==========================================================

ACCIONES A REALIZAR AL CARGAR LA PAGINA

1) Verificar que el usuario haya iniciado sesion.
    -Se evaluan que los parametros usuario y password sean validos
    
2) Si la sesion es valida ajustar los menues lateral y superior segun 
el tamaño de la pantalla.

==========================================================*/

var original=window.innerWidth;

$(document).ready(function() {
    if ((sessionStorage.usuario != undefined) && (sessionStorage.password != undefined)) {
        ventanaPrincipal();
      
    }else{
        window.location="index.php";   
    }
    
});


$(window).resize(function(){

    if (window.innerWidth>991){
        // ## agregar clase
        $('#barraIzq').addClass('show'); 
    }else{
        // ## eliminar clase
        $('#barraIzq').removeClass('show');
    }

});

/*==========================================================

FUNCION DESHABILITAR RETROCESO
>>deshabilitaRetroceso()

Funcion que deshabilitar el boton retroceder del navegador.

==========================================================*/

function deshabilitaRetroceso(){
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
}

/*==========================================================

FUNCION LIMPIAR SESION
>>limpiarSesion()

Funcion que permite borrar los datos de la sesion almacenada en el sessionStorage

==========================================================*/

function limpiarSesion(){
    sessionStorage.clear();
    window.location="index.php";
    console.log("Se ha borrado la sesion");
}


/*==========================================================

FUNCION PARA VERIFICAR EL ACCESO DEL USUARIO

==========================================================*/
verificarAcceso();
function verificarAcceso(){
    var $usuario={
        '_usuario' : sessionStorage.usuario,
     }
    $.ajax({
        url:'../CT-BackEnd/Controlador/ModMaestros/Controlador_Usuario/Controlador_AccesosDelPersonal.php',
        type: 'POST',
        data: $usuario,
        datatype: 'json',
        error: function(error){   
        },
        success: function(datos){
            if(datos.response=="0"){
            }else{
                if(datos.ACCCLIENTE == 0){
                    $("#ACCCLIENTE").addClass("d-none");
                }
                if(datos.ACCSERVICIO==0){
                    $("#ACCSERVICIO").addClass("d-none");
                }
                if(datos.ACCEMPRESA == 0){
                    $("#ACCEMPRESA").addClass("d-none");
                }
                if(datos.ACCMAQUINA == 0){
                    $("#ACCMAQUINA").addClass("d-none");
                }
                if(datos.ACCBANCO == 0){
                    $("#ACCBANCO").addClass("d-none");
                }
                if(datos.ACCPROVEEDOR == 0){
                    $("#ACCPROVEEDOR").addClass("d-none");
                }
                if(datos.ACCPERSONAL == "0000"){
                    $("#ACCPERSONAL").addClass("d-none");
                }else{
                    if(datos.ACCPERSONAL.substr(0,1)=="0"){
                    $("#menuPersonal-Generales").addClass("d-none");
                    }
                    if(datos.ACCPERSONAL.substr(1,1)=="0"){
                        $("#menuPersonal-Contrato").addClass("d-none");
                    } 
                    if(datos.ACCPERSONAL.substr(2,1)=="0"){
                        $("#menuPersonal-Vacaciones").addClass("d-none");         
                    }
                    if(datos.ACCPERSONAL.substr(3,1)=="0"){
                        $("#menuPersonal-Control").addClass("d-none");
                    }
                } 
                    
                
                if(datos.ACCUSUARIO == 0){
                    $("#ACCUSUARIO").addClass("d-none");
                }
                if(datos.ACCNUEVO_PRESUPUESTO == 0){
                    $("#ACCNUEVO_PRESUPUESTO").addClass("d-none");
                    $("#P-NuevoPresupuesto").addClass("d-none");
                }
                if(datos.ACCACTUALIZAR_PRESUPUESTO == 0){
                    $("#ACCACTUALIZAR_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCCAMBIAR_ESTADO_PRESUPUESTO == 0){
                    $("#ACCCAMBIAR_ESTADO_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCBUSCAR_PRESUPUESTO == 0){
                    $("#ACCBUSCAR_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCF1810 == 0){
                    $("#ACCF1810").addClass("d-none");
                }
                if(datos.ACCCREAR_ORDEN == 0){
                    $("#ACCCREAR_ORDEN").addClass("d-none");
                    $("#P-NuevaOrden").addClass("d-none");
                }
                if(datos.ACCACTUALIZAR_ORDEN == 0){
                    $("#ACCACTUALIZAR_ORDEN").addClass("d-none");
                }
                if(datos.ACCCAMBIAR_ESTADO_ORDEN == 0){
                    $("#ACCCAMBIAR_ESTADO_ORDEN").addClass("d-none");
                    $("#P-CambiarEstadoOrden").addClass("d-none");
                }
                if(datos.ACCREEMPLAZAR_ORDEN == 0){
                    $("#ACCREEMPLAZAR_ORDEN").addClass("d-none");
                }
                if(datos.ACCSEGUIMIENTO_ORDEN == 0){
                    $("#ACCSEGUIMIENTO_ORDEN").addClass("d-none");
                }
                if(datos.ACCLISTAR_ORDENES == 0){
                    $("#ACCLISTAR_ORDENES").addClass("d-none");
                }
                if(datos.ACCSEGUIMIENTO_PRODUCCION == 0){
                    $("#ACCSEGUIMIENTO_PRODUCCION").addClass("d-none");
                }
                if(datos.ACCPROGRAMAR_MAQUINAS == 0){
                    $("#ACCPROGRAMAR_MAQUINAS").addClass("d-none");
                }
                if(datos.ACCCONTROL_DESPACHOS == 0){
                    $("#ACCCONTROL_DESPACHOS").addClass("d-none");
                }
                if(datos.ACCCONTROL_INSUMOS == 0){
                    $("#ACCCONTROL_INSUMOS").addClass("d-none");
                }
                if(datos.ACCCOSTOS_MAQUINA == 0){
                    $("#ACCCOSTOS_MAQUINA").addClass("d-none");
                }
                if(datos.ACCCOSTOS_ACABADOS == 0){
                    $("#ACCCOSTOS_ACABADOS").addClass("d-none");
                }
                if(datos.ACCCOSTOS_TINTA == 0){
                    $("#ACCCOSTOS_TINTA").addClass("d-none");
                }
                if(datos.ACCLISTADO_COSTOS == 0){
                    $("#ACCLISTADO_COSTOS").addClass("d-none");
                }
                if(datos.ACCFACTURACION == 0){
                    $("#ACCFACTURACION").addClass("d-none");
                }
                if(datos.ACCARQUEO == 0){
                    $("#ACCARQUEO").addClass("d-none");
                }
                if(datos.ACCNOTA == 0){
                    $("#ACCNOTA").addClass("d-none");
                }
                if(datos.ACCLETRA == 0){
                    $("#ACCLETRA").addClass("d-none");
                }
                if(datos.ACCGUIA == 0){
                    $("#ACCGUIA").addClass("d-none");
                }
                if(datos.ACCRECIBO == 0){
                    $("#ACCRECIBO").addClass("d-none");
                }
                if(datos.ACCFINANZAS == 0){
                    $("#ACCFINANZAS").addClass("d-none");
                }
                if(datos.ACCCLIENTE == 0&& datos.ACCSERVICIO==0 && datos.ACCEMPRESA == 0 && datos.ACCMAQUINA == 0 && datos.ACCBANCO == 0 && datos.ACCPROVEEDOR == 0 && datos.ACCPERSONAL == 0 && datos.ACCUSUARIO == 0  ){
                    $("#MAESTROS").addClass("d-none");
                }
                if( datos.ACCNUEVO_PRESUPUESTO == 0 && datos.ACCACTUALIZAR_PRESUPUESTO == 0 && datos.ACCCAMBIAR_ESTADO_PRESUPUESTO == 0 && datos.ACCBUSCAR_PRESUPUESTO == 0 && datos.ACCF1810 == 0){
                  $("#PRESUPUESTO").addClass("d-none"); 
                }
                if(datos.ACCCREAR_ORDEN == 0 && datos.ACCACTUALIZAR_ORDEN == 0 && datos.ACCCAMBIAR_ESTADO_ORDEN == 0 && datos.ACCREEMPLAZAR_ORDEN == 0 && datos.ACCSEGUIMIENTO_ORDEN == 0 && datos.ACCLISTAR_ORDENES == 0){
                  $("#ORDENES").addClass("d-none"); 
                }
                if(datos.ACCSEGUIMIENTO_PRODUCCION == 0 && datos.ACCPROGRAMAR_MAQUINAS == 0 && datos.ACCCONTROL_DESPACHOS == 0){
                  $("#PRODUCCION").addClass("d-none"); 
                }
                if(datos.ACCCONTROL_INSUMOS == 0 && datos.ACCCOSTOS_MAQUINA == 0 && datos.ACCCOSTOS_ACABADOS == 0 && datos.ACCCOSTOS_TINTA == 0 && datos.ACCLISTADO_COSTOS == 0){
                  $("#COSTOS").addClass("d-none"); 
                }
                if(datos.ACCFACTURACION == 0 && datos.ACCARQUEO == 0 && datos.ACCNOTA == 0 && datos.ACCLETRA == 0 && datos.ACCGUIA == 0 && datos.ACCRECIBO == 0 && datos.ACCFINANZAS == 0){
                  $("#CONTABILIDAD").addClass("d-none"); 
                }
            } 
        }
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PRINCIPAL

==========================================================*/

function ventanaPrincipal(){
    
    $.ajax({  
        url: 'Modulos/ModPrincipal/VistaPrincipal.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CLIENTES

==========================================================*/

function ventanaClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/VistaClientes.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA SERVICIOS

==========================================================*/

function ventanaServicios(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaServicios/VistaServicios.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA EMPRESAS

==========================================================*/

function ventanaEmpresas(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaEmpresas/VistaEmpresas.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA MAQUINAS

==========================================================*/

function ventanaMaquinas(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaMaquinas/VistaMaquinas.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA BANCOS

==========================================================*/

function ventanaBancos(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaBancos/VistaBancos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/VistaProveedores.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaPersonal(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/VistaPersonal.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    verificarAcceso();
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaUsuario(){
     
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaUsuarios/VistaUsuario.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA NUEVO PRESUPUESTO

==========================================================*/

function ventanaNuevoPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/NuevoPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA FORMULA PRESUPUESTO

==========================================================*/

function ventanaNuevaOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/NuevaOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA FORMULA PRESUPUESTO

========================================================== */

function ventanaF1810(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/F1810.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA BUSCAR PRESUPUESTO

==========================================================*/

function ventanaBuscarPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/BuscarPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CAMBIAR ESTADO PRESUPUESTO

==========================================================*/

function ventanaCambiarEstadoPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/CambiarEstadoPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    
}