/*================================================================================
  FUNCIONES GENERALES
================================================================================*/

//--INICIALIZAR VARIABLES--
var contador=1;

$("#F1810MAQUINAS :input").prop("readonly",true);
$("#F1810INSUMOS :input").prop("readonly",true);


//  PAUSAR CAROUSEL
$('.carousel').carousel('pause');


//  FUNCION CLICK PARA IR AL SIGUIENTE SLIDER
$("#btnAdelantar").click(function(){
   contador++;
   if(contador<1 || contador>4){
       contador=1;
   }
   if( contador>=1 && contador<=4){
      switch(contador) {
        case 1:document.getElementById("F1810Titulo").innerHTML = "FORMULA DE PRESUPUESTOS";break;
        case 2:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - PRINCIPAL";break;
        case 3:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - MAQUINAS";break;
        case 4:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - INSUMOS";break;
      }
   }
});


//  FUNCION CLICK PARA IR AL ANTERIOR SLIDER
$("#btnRetroceder").click(function(){
   contador--;
   if(contador<1 || contador>4){
       contador=4;
   }
   if( contador>=1 && contador<=4){
       switch(contador) {
          case 1:document.getElementById("F1810Titulo").innerHTML = "FORMULA DE PRESUPUESTOS";break;
          case 2:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - PRINCIPAL";break;
          case 3:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - MAQUINAS";break;
          case 4:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - INSUMOS";break;
       }
   }
});


//  FUNCION PARA HABILITAR/DESHABILITAR LOS INPUT
//  DE INGRESO DE DATOS
function HABILITAR(){
  if($("#habilitar").html()=="HABILITAR"){
      $("#F1810MAQUINAS :input").prop("readonly",false);
      $("#F1810INSUMOS :input").prop("readonly",false);
    
      $("#CPOS-TOTAL").prop("readonly",true);
      $("#habilitar").html("DESHABILITAR");
  }else{
      $("#F1810MAQUINAS :input").prop("readonly",true);
      $("#F1810INSUMOS :input").prop("readonly",true);
      $("#habilitar").html("HABILITAR");
  }
}


//  FUNCION PARA ELEGIR EL TIPO DE MONEDA
$(document).ready(function(){
    var inputNombre=document.getElementById("facturacion");
    
    $("#soles").click(function(){
        if(inputNombre.value!="" && document.getElementById("dolares").checked == true){
          inputNombre.value =(parseFloat(inputNombre.value)*parseFloat($("#F1810INSUMOS #tipocambio").val())).toFixed(2);
        }
        document.getElementById("dolares").checked = false;
        this.checked = true;
    });
    $("#dolares").click(function(){
        if(inputNombre.value!="" && document.getElementById("soles").checked == true){
          inputNombre.value = (parseFloat(inputNombre.value)/parseFloat($("#F1810INSUMOS #tipocambio").val())).toFixed(2);
        }
        document.getElementById("soles").checked = false;
        this.checked = true;
    });
});

  
//  FUNCION PARA VERIFICAR EL RANGO DEL PRECIO
function verificar(){
    var facturacion=$("#facturacion").val();
  
    var fSoles=$("#Fsoles").val().replace("S/.","");
    var nSoles=$("#Nsoles").val().replace("S/.","");
    var nDolares=$("#Ndolares").val().replace("$","");
    var fDolares=$("#Fdolares").val().replace("$","");
  
    var maximo="", minimo="";
  
    if(document.getElementById("soles").checked == true){
        maximo=Math.max(fSoles,nSoles);
        minimo=Math.min(fSoles,nSoles);
    }else{
        maximo=Math.max(fDolares,nDolares);
        minimo=Math.min(fDolares,nDolares);
    }
  
    if(facturacion>=minimo && facturacion<=maximo){
      
    }else{
      alert("Facturacion fuera de rango!!!");
      $("#facturacion").val("");
    }
}

//  FUNCION PARA LLAMAR A LAS FUNCIONES DE COTIZACION
//  LUEGO DE QUE EL USUARIO CAMBIE LOS DATOS YA INGRESADOS
$("#PRINCIPAL input, #PRINCIPAL select").change(function(){
  slider0.cotizar();
  slider1.F1810_Calcular();
  slider3.valoresIniciales();
  slider3.resultado();
  slider0.precios();
});

$("#F1810MAQ input,#F1810MAQ td, #F1810INSUMOS input, #F1810INSUMOS td").change(function(){
  slider0.cotizar();
  slider1.F1810_Calcular();
  slider3.valoresIniciales();
  slider3.resultado();
  slider0.precios();
});


/*================================================================================
  SLIDER 0: FORMULA DE PRESUPUESTOS
================================================================================*/

//  FUNCION PRINCIPAL
var FORMULAPRESUPUESTO =function(){
  
  this.datosSelect = [];
  this.datosInput = [];
  
};
var cliente=[];

//--GENERAR OPCIONES DE CLIENTE--
FORMULAPRESUPUESTO.prototype.mostrarCliente = function(seleccionado){
    var boxCliente="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Clientes/Controlador_MostrarTodosClientes.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("Archivos no encontrados");
            }
            else{
                console.log("Error no identificado");
            }
            boxCliente+="<option value='' selected>Elegir Cliente</option>";
            $("#cliente").html(boxCliente);
        },
        success: function(datos){
            cliente=datos;
            if(datos.response=="0"){
                boxCliente+="<option value='' selected>Elegir Cliente</option>";
                $("#cliente").html(boxCliente);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxCliente+="<option value='' selected>Elegir Cliente</option>";
                    }
                    boxCliente+="<option value='"+datos[i].CLIENCODIGO+"'>"+datos[i].CLIENNOMBRE_CORTO+"</option>";
                }
                $("#cliente").html(boxCliente);
                $("#cliente option[value="+seleccionado+"]").attr("selected",true);
            }
        }
    }); 
}


//  FUNCION ENVIAR DATOS DE COTIZACION
FORMULAPRESUPUESTO.prototype.cotizar = function(){
  
  var datosSelect =[],
      datosInput  =[];

  
  for(var i=0; i<16; i++){
    if(i==0 || i==4 || i==5 || i==10 || i==11 || i==12 || i==14 || i==15){
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+")").val();
    }else{
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+") option:selected").text();
    }
  }
  for(var i=0; i<18; i++){
    datosInput[i]=$("#PRINCIPAL input:eq("+(i+4)+")").val();
  }

  
  $("#F1810 td:eq(4)").html(datosSelect[1]);    //   VENDEDOR
  $("#F1810 td:eq(8)").html(datosSelect[2]);    //   MAQUINA
  $("#F1810 td:eq(12)").html(datosSelect[3]);   //   TAMAÑO DEL PLIEGO DE MAQUINA
  $("#F1810 td:eq(15)").html(datosInput[0]);    //   # DE P/M's POR HOJA/RESMA
  $("#F1810 td:eq(18)").html(datosInput[1]);    //   TIRAJE TOTAL DE PIEZAS GRAFICAS
  $("#F1810 td:eq(22)").html(datosInput[3]);    //   # DE PIEZAS GRAFICAS POR P/M
  
  $("#F1810 td:eq(38)").html(datosInput[4]);    //   # DE PLIEGOS DE MAQUINA DEL TRABAJO 
  $("#F1810 td:eq(42)").html((datosSelect[4]==1)? 1:2);   //   TIPO DE IMPRESION
  $("#F1810 td:eq(46)").html(datosInput[5]);    //   # DE COLORES
  $("#F1810 td:eq(50)").html(datosSelect[5]);   //   TIPO DE PAPEL
  $("#F1810 td:eq(54)").html(datosInput[6]);    //   GRAMAJE DE PAPEL EJ 90; 115; 150; 300
  $("#F1810 td:eq(58)").html(datosInput[7]);    //   TAMAÑO DEL PAPEL 61, 69, 70, 72
  $("#F1810 td:eq(62)").html(datosSelect[8]);   //   PRUEBA DE COLOR?
  $("#F1810 td:eq(66)").html(datosSelect[9]);   //   MENSAJERIAS
  $("#F1810 td:eq(70)").html(datosSelect[10]);  //   TIPO DE PLASTIFICADO O BARNIZADO
  $("#F1810 td:eq(74)").html(datosSelect[11]);  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 1
  $("#F1810 td:eq(78)").html(datosSelect[12]);  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 2

  $("#F1810 td:eq(82)").html(datosSelect[13]);                  //   TROQUELADO?
  $("#F1810 td:eq(86)").html(datosSelect[14]);                  //   DOBLADO Y ALZE?
  $("#F1810 td:eq(90)").html(datosSelect[14].substr(0,3));      //   DOBLADO EN MAQUINA
  $("#F1810 td:eq(94)").html(datosSelect[14].substr(3,1));      //   DOBLADO MANUAL
  
  $("#F1810 td:eq(102)").html(datosSelect[15]); //   COSIDO HILO, ENCOLADO O ENGRAPADO
  $("#F1810 td:eq(106)").html(datosInput[8]);   //   EMPAQUETADO O ENCAJONADO
  $("#F1810 td:eq(109)").html("-");             //   MOVILIDAD O DESPACHO ($$$)
  
  $("#F1810 td:eq(113)").html("-");             //   SERVICIOS DE TERCEROS($$$)
  
  var terceros =parseFloat(datosInput[9])+parseFloat(datosInput[10])+parseFloat(datosInput[11])+parseFloat(datosInput[12])+
              parseFloat(datosInput[13])+parseFloat(datosInput[14])+parseFloat(datosInput[15])+parseFloat(datosInput[16])+parseFloat(datosInput[17]);
  $("#F1810 td:eq(114)").html(terceros);        //   SERVICIOS DE TERCEROS($$$)
  $("#F1810 td:eq(133)").html("-");             //   TOTAL SEGUN ESCALA
  
  this.datosSelect = datosSelect;
  this.datosInput = datosInput;
  
  /*======================================
  
      MOSTRAR DATOS DEL MODAL
  
  =======================================*/
  
  
  // DES/HABILITAR SEGUN LOS CAMPOS OBLIGATORIOS
  if($("#PRINCIPAL #cliente").val()!="" && $("#PRINCIPAL input:eq(3)").val()!="" && datosSelect[2]!="Elegir Maquina" && $("#PRINCIPAL #facturacion").val()!=""){
      $("#guardarButton").removeAttr("disabled");
  }else{
      document.getElementById("guardarButton").disabled = true;
  }
  
  // MODAL: LOGO DE LA EMPRESA RESPECTIVA DEL CLIENTE Y RAZON SOCIAL
  var imagen="";
  for(var y=0;y<cliente.length;y++){
      if($("select:eq(0) option:selected").val()==cliente[y].CLIENCODIGO){
          $("#modalPresupuesto td:eq(1)").html(cliente[y].CLIENRAZON_SOCIAL);
          switch(cliente[y].EMPCODIGO){
                  case 'CT': imagen="<img src='Modulos/ModPresupuesto/Logo-Computextos.png' width='200' height='75'>";break;
                  case 'ER': imagen="<img src='Modulos/ModPresupuesto/Logo-EdicionesReales.png' width='200' height='75'>";break;
                  case 'ED': imagen="<img src='Modulos/ModPresupuesto/Logo-EditorialEImprentaDesa.png' width='200' height='75'>";break;
                  case 'GR': imagen="<img src='Modulos/ModPresupuesto/Logo-GraficaReal.png' width='200' height='75'>";break;
                 default : imagen="<img src='Modulos/ModPresupuesto/Logo-Computextos.png' width='200' height='75'>";break;
              }
          $("#logoEmpresa").html(imagen);
      }
  }
  
  // MODAL: NUMERO DE PRESUPUESTO
  $("#modalPresupuesto td:eq(3)").html($("#PRINCIPAL #numeroItem").val());
  
  // MODAL: TOTAL DE VENTA DE LOS ITEMS
  
  
  // MODAL: DESCRIPCION
  $("#modalPresupuesto td:eq(7)").html("1. "+$("#PRINCIPAL input:eq(3)").val());
  
  // MODAL: TIRAJE TOTAL DE PIEZAS GRAFICAS
  $("#modalPresupuesto td:eq(10)").html(datosInput[1]);
  
  // MODAL: IMPRESION    
  var impresion;
  var colores;
  if(datosInput[5]==4){
      colores="FULL COLOR";
  }else{
      colores=datosInput[5]+" colores";
  }
  impresion = colores+" "+$("select:eq(4) option:selected").text();
  $("#modalPresupuesto td:eq(12)").html(impresion);
  
  // MODAL: MATERIAL
  var material;
  material=datosSelect[5]+" "+datosInput[6]+" GRS.";
  $("#modalPresupuesto td:eq(14)").html(material);

  // MODAL: TAMAÑO DEL PAPEL 61, 69, 70, 72
  $("#modalPresupuesto td:eq(16)").html(datosInput[7]);

  // MODAL: ACABADOS    
  var acabados="";
  for(var a=10;a<=12;a++){
      if($("select:eq("+a+") option:selected").text()!="-"){
          acabados+=$("select:eq("+a+") option:selected").text()+"<br/>";
      } 
  }

  for (var i=12;i<=16;i++){
      if(datosInput[i]!=0 ){
          switch(i){
              case 12:acabados+="ENCOLADO Y FORRADO <br />";break;
              case 13:acabados+="DEGOLLADO Y CORTE <br />";break;
              case 14:acabados+="ARMADO Y PEGADO DE BOLSILLO <br />";break;
              case 15:acabados+="PUESTA DE OJALILLOS <br />";break;
              case 16:acabados+="NYLON 0.7mm <br />";break;
          }
      }
  }
  $("#modalPresupuesto td:eq(18)").html(acabados);

  // MODAL: TROQUELADO
  var troquelado="";
  var nombreTroquelado="";
  if($("select:eq(13) option:selected").text()!="-"){
      nombreTroquelado="Troquelado";
      troquelado=$("select:eq(13) option:selected").text();
  }else{
      nombreTroquelado="";
      troquelado="";
  }
  $("#modalPresupuesto td:eq(19)").html(nombreTroquelado);
  $("#modalPresupuesto td:eq(20)").html(troquelado);

  // MODAL: DOBLADO Y ALZE
  var dobladoAlce="";
  var nombreDobladoAlce="";
  if($("select:eq(14) option:selected").text()!="-"){
      nombreDobladoAlce="Doblado y Alze";
      dobladoAlce=$("select:eq(14) option:selected").text();
  }else{
      nombreDobladoAlce="";
      dobladoAlce="";
  }
  $("#modalPresupuesto td:eq(21)").html(nombreDobladoAlce);
  $("#modalPresupuesto td:eq(22)").html(dobladoAlce);

  // MODAL: COSIDO HILO, ENCOLADO O ENGRAPADO
  switch ($("select:eq(15) option:selected").text()){
      case 'HILO':$("#modalPresupuesto td:eq(23)").html("Cosido Hilo");$("#modalPresupuesto td:eq(24)").html("HILO");break;
      case 'COLA':$("#modalPresupuesto td:eq(23)").html("Encolado");$("#modalPresupuesto td:eq(24)").html("COLA");break;
      case 'GRAPA':$("#modalPresupuesto td:eq(23)").html("Engrapado");$("#modalPresupuesto td:eq(24)").html("GRAPA");break;
      default : $("#modalPresupuesto td:eq(23)").html("");$("#modalPresupuesto td:eq(24)").html("");break;
  }

  // MODAL: GENERAR MONTO  
  if(document.getElementById("soles").checked == true){
        $("#modalPresupuesto td:eq(26)").html("S/."+$("#facturacion").val()+" + IGV");
    }else{
        $("#modalPresupuesto td:eq(26)").html("$"+$("#facturacion").val()+" + IGV");
    }
  
  // MODAL: EJECUTIVOS
  var ejecutivos=$("select:eq(1) option:selected").val();

  var $opcion={'_personal':ejecutivos};
  var nombreEjecutivo="";
  $.ajax({
      url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarDatosPersonal.php",
      type: 'POST',
      data: $opcion, 
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              console.log("Archivos no encontrados");
          }
          else{
              console.log("Error no identificado");
          }
      },
      success: function(datos){
          if(datos.response=="0"){
              console.log('ERROR: '+datos.message);
          }else{
              nombreEjecutivo=datos.PERSNOMBRE+" "+datos.PERSAPELLIDO_PATERNO+" "+datos.PERSAPELLIDO_MATERNO;
              $("#ejecutiva").html(nombreEjecutivo);
          }
      }
  });
  
}


//  FUNCION PARA CALCULAR LOS PRECIOS DE COTIZACION
FORMULAPRESUPUESTO.prototype.precios = function(){
  
  //  TOTAL
  var cambio=parseFloat($("#F1810INSUMOS #tipocambio").val());
  
  var pDolares  = parseFloat(slider1.total);
  var pDolaresNormal  = parseFloat(slider1.totalNormal);
  $("#PRINCIPAL input.strong:eq(0)").val("$"+pDolares.toFixed(2)); //DOLARES
  
  var pSoles  = pDolares*cambio;
  var pSolesNormal  = pDolaresNormal*cambio;
  $("#PRINCIPAL input.strong:eq(1)").val("S/."+pSoles.toFixed(2)); //SOLES
  
  var pMillar = pSoles/(parseFloat($("input:eq(5)").val())/1000);
  $("#PRINCIPAL input.strong:eq(2)").val("S/."+pMillar.toFixed(2)); //MILLAR
  
  var pUnit = pSoles/parseFloat($("input:eq(5)").val());
  $("#PRINCIPAL input.strong:eq(3)").val("S/."+pUnit.toFixed(2)); //UNIDAD
  
  $("#PRINCIPAL input.strong:eq(4)").val("S/."+(pUnit*500).toFixed(2)); //500 HOJAS
  
  
  
  //  RANGO DE PRECIOS
  
  $("#PRINCIPAL input.enfasis3:eq(0)").val("$"+pDolares.toFixed(2)); //F1810 DOLARES
  $("#PRINCIPAL input.enfasis3:eq(1)").val("S/."+pSoles.toFixed(2)); //F1810 SOLES
  $("#PRINCIPAL input.enfasis3:eq(2)").val("$"+pDolaresNormal.toFixed(2)); //NORMAL DOLARES
  $("#PRINCIPAL input.enfasis3:eq(3)").val("S/."+pSolesNormal.toFixed(2)); //NORMAL SOLES
  
  
  
  //  PRECIOS GENERALES
  
  var insumos=slider1.insumos*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(0)").val("S/."+insumos.toFixed(2)); //INSUMOS
  
  
  var talleres=slider1.talleres*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(1)").val("S/."+talleres.toFixed(2)); //TALLERES
  
  
  var flete=slider1.flete*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(2)").val("S/."+flete.toFixed(2)); //EMB/FLETE
  
  
  var gg=(insumos+talleres+flete)*0.18;
  $("#PRINCIPAL input.strong2:eq(3)").val("S/."+gg.toFixed(2)); //GG
  
  
  var margen=(insumos+talleres+flete+gg)*0.10;
  $("#PRINCIPAL input.strong2:eq(4)").val("S/."+margen.toFixed(2)); //MARGEN
  
  
  var neto=insumos+talleres+flete+gg+margen;
  $("#PRINCIPAL input.strong3:eq(0)").val("S/."+neto.toFixed(2)); //TOTAL NETO
  
  
  var impuesto=neto*0.18;
  $("#PRINCIPAL input.strong2:eq(5)").val("S/."+impuesto.toFixed(2)); //IMPUESTOS
  
  
  var total=neto+impuesto;
  $("#PRINCIPAL input.strong3:eq(1)").val("S/."+total.toFixed(2)); //TOTAL
  
  
  var unidades=total/parseFloat($("input:eq(5)").val());
  $("#PRINCIPAL input.strong3:eq(2)").val("S/."+unidades.toFixed(2)); //PREC. UNIT
  
}


//  FUNCION PARA CALCULAR LA FECHA ACTUAL PARA LA GENERACION DEL CODIGO
FORMULAPRESUPUESTO.prototype.calcularCodigo = function(){
  var fecha = new Date();
  var code = 0;
  
  $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarTodosPptos.php',
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
            code = 3200;
            $("#PRINCIPAL #numeroItem").val(code+"-"+(fecha.getFullYear()).toString().substr(2));
            //slider0.guardarDatos(code+"-"+(fecha.getFullYear()).toString().substr(2));
          }
          else{
            code = parseInt((datos[datos.length-1].PRESUPNUMERO).slice(0,4)) +1;
            $("#PRINCIPAL #numeroItem").val(code+"-"+(fecha.getFullYear()).toString().substr(2));
            //slider0.guardarDatos(code+"-"+(fecha.getFullYear()).toString().substr(2));
          }
      }
  });
  
}


//  FUNCION PARA REGISTRAR LOS DATOS DEL PRESUPUESTO
FORMULAPRESUPUESTO.prototype.guardarDatos = function(){
  var code = $("#PRINCIPAL #numeroItem").val();
  
  var $datosCotizacion={
    '_code': "C"+code+"-1",
    '_dato1': this.datosSelect[2],
    '_dato2': this.datosSelect[3],
    '_dato3': this.datosInput[0],
    '_dato4': this.datosInput[1],
    '_dato5': this.datosInput[2],
    '_dato6': this.datosInput[3],
    '_dato7': this.datosInput[4],
    '_dato8': this.datosSelect[4],
    '_dato9': this.datosInput[5],
    '_dato10': $("#PRINCIPAL select:eq(5) option:selected").text(),
    '_dato11': this.datosSelect[6],
    '_dato12': this.datosSelect[7],
    '_dato13': this.datosInput[6],
    '_dato14': this.datosInput[7],
    '_dato15': this.datosSelect[8],
    '_dato16': this.datosSelect[9],
    '_dato17': this.datosSelect[10],
    '_dato18': this.datosSelect[11],
    '_dato19': this.datosSelect[12],
    '_dato20': this.datosSelect[13],
    '_dato21': this.datosSelect[14],
    '_dato22': this.datosSelect[15],
    '_dato23': this.datosInput[8],
    
    '_dato24': this.datosInput[9],
    '_dato25': this.datosInput[10],
    '_dato26': this.datosInput[11],
    '_dato27': this.datosInput[12],
    '_dato28': this.datosInput[13],
    '_dato29': this.datosInput[14],
    '_dato30': this.datosInput[15],
    '_dato31': this.datosInput[16],
    '_dato32': this.datosInput[17],

  }
  
  var $datosPrecios={
    '_code': "P"+code+"-1",
    '_total1': $("#PRINCIPAL input.strong:eq(0)").val(),
    '_total2': $("#PRINCIPAL input.strong:eq(1)").val(),
    '_total3': $("#PRINCIPAL input.strong:eq(2)").val(),
    '_total4': $("#PRINCIPAL input.strong:eq(3)").val(),
    '_total5': $("#PRINCIPAL input.strong:eq(4)").val(),
    
    '_rango1': $("#PRINCIPAL input.enfasis3:eq(0)").val(),
    '_rango2': $("#PRINCIPAL input.enfasis3:eq(1)").val(),
    '_rango3': $("#PRINCIPAL input.enfasis3:eq(2)").val(),
    '_rango4': $("#PRINCIPAL input.enfasis3:eq(3)").val(),
    
    '_precios1': $("#PRINCIPAL input.strong2:eq(0)").val(),
    '_precios2': $("#PRINCIPAL input.strong2:eq(1)").val(),
    '_precios3': $("#PRINCIPAL input.strong2:eq(2)").val(),
    '_precios4': $("#PRINCIPAL input.strong2:eq(3)").val(),
    '_precios5': $("#PRINCIPAL input.strong2:eq(4)").val(),
    '_precios6': $("#PRINCIPAL input.strong3:eq(0)").val(),
    '_precios7': $("#PRINCIPAL input.strong2:eq(5)").val(),
    '_precios8': $("#PRINCIPAL input.strong3:eq(1)").val(),
    '_precios9': $("#PRINCIPAL input.strong3:eq(2)").val(),
  }
  
  var fecha = new Date();
  var $datosPresupuesto={
    '_code': code,
    '_cliente': this.datosSelect[0],
    '_vendedor': $("#PRINCIPAL select:eq(1)").val(),
    '_fecha': fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
    '_cantItem': 1,
  }
  
  if(document.getElementById("soles").checked == true){
    var monto = "S/."+$("#PRINCIPAL #facturacion").val();
  }else{
    var monto = "$"+$("#PRINCIPAL #facturacion").val();
  }
  
  var $datosItem={
    '_code': code+"-1",
    '_descripcion': $("#PRINCIPAL input:eq(3)").val(),
    '_monto': monto,
    '_codeC': "C"+code+"-1",
    '_codeP': "P"+code+"-1",
    '_codePresup': code,
  }
  
  for(var i=0;i<2;i++){
    if(i==0){
      
      $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosCotizacion.php',
            type: 'POST',
            data: $datosCotizacion,
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
                    a=true;
                    //$("#resultado").text("Resultados grabados satisfactoriamente");
                }
            }
        });

      $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosPrecios.php',
            type: 'POST',
            data: $datosPrecios,
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
                    b=true;
                    //$("#resultado").text("Resultados grabados satisfactoriamente");
                }
            }
        });

      $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosPresupuesto.php',
            type: 'POST',
            data: $datosPresupuesto,
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
                    c=true;
                    //$("#resultado").text("Resultados grabados satisfactoriamente");
                }
            }
        });

    }else{
      
      $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosItem.php',
        type: 'POST',
        data: $datosItem,
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
                //$("#resultado").text("Resultados grabados satisfactoriamente");
            }
        }
    });
      
    }
  }
  
}

//  FUNCION PARA MOSTRAR LOS DATOS DEL PRESUPUESTO
FORMULAPRESUPUESTO.prototype.mostrarDatos = function(presupuestoRecibido){
    
     var $presupuesto={
        '_presupuesto' : presupuestoRecibido
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarDatosPresupuesto.php',
        type: 'POST',
        data: $presupuesto,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("Archivos no encontrados");
            }
            else{
                console.log("Error no identificado");
                 
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                console.log('ERROR: '+datos.message);
                alert("NUMERO DE PRESUPUESTO NO EXISTENTE");
            }else{
                $("#numeroItem").val(datos.PRESUPNUMERO);
                $("#vendedor option[value="+ datos.PRESUPVENDEDOR +"]").attr("selected",true);
                slider0.mostrarCliente(datos.CLIENCODIGO);
            }
        }
    });
}


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider0 = new FORMULAPRESUPUESTO();


/*================================================================================
  SLIDER 1: TABLA F1810 - PRINCIPAL
================================================================================*/

//  FUNCION PRINCIPAL
var F1810PRINCIPAL = function(){
    this.insumos=0;
    this.talleres=0;
    this.flete=0;
    this.total=0;
    this.totalNormal=0;
  
    this.mtrCuadrados=0;
};


//  FUNCION PARA CALCULAR EL IMPORTE DEL PRESUPUESTO
F1810PRINCIPAL.prototype.F1810_Calcular = function() {
    
    this.insumos=0;
    this.talleres=0;
    this.flete=0;
    this.total=0;
    this.totalNormal=0;
    
    //  VENDEDOR - TASA COMISION
    $("#F1810 td:eq(5)").html(1);

    //  MAQUINA - VALOR
    switch($("#F1810 td:eq(8)").html()){
      case "GTO": $("#F1810 td:eq(9)").html(2);break;
      case "SM": $("#F1810 td:eq(9)").html(4);break;
      case "R700": $("#F1810 td:eq(9)").html(8);break;
      case "ADAST": $("#F1810 td:eq(9)").html(1);break;
      case "KBA": $("#F1810 td:eq(9)").html(1);break;
      default:$("#F1810 td:eq(9)").html("¿Qué máquina?");break;
    }
    var maquina = $("#F1810 td:eq(9)").html();

    //  TAMAÑO DEL PLIEGO DE MAQUINA
    $("#F1810 td:eq(13)").html("-");

    //  # DE P/M's POR HOJA/RESMA

    if($("#F1810 td:eq(12)").html()=="NORMAL"){
      switch(maquina){
        case '8' : $("#F1810 td:eq(16)").html(1);break;
        case '2' : $("#F1810 td:eq(16)").html(4);break;
        default: $("#F1810 td:eq(16)").html(2);break;
      }
    }else{$("#F1810 td:eq(16)").html(0);}
  
    // TIRAJE DEL TRABAJO EN P/M  
    var a1 = parseFloat($("#F1810 td:eq(18)").html());  //   TIRAJE TOTAL DE PIEZAS GRAFICAS
    var a2 = parseFloat($("#F1810 td:eq(22)").html());  //   # DE PIEZAS GRAFICAS POR P/M
    var tirajeTrabajo = (a1/a2);
  
    $("#F1810 td:eq(30)").html(tirajeTrabajo);
      
      
    // DEMASIA DEL TRABAJO EN P/M  
    var demasia = 0;
    if(tirajeTrabajo<=300){
        demasia= tirajeTrabajo;
      
    }else if(tirajeTrabajo<=10000){
        demasia= 200;
      
    }else if(tirajeTrabajo<=20000){
        demasia= tirajeTrabajo*0.022;
      
    }else if(tirajeTrabajo<=30000){
        demasia= tirajeTrabajo*0.02;
      
    }else if(tirajeTrabajo<=50000){
        demasia= tirajeTrabajo*0.015;
      
    }else if(tirajeTrabajo>=150000){
        demasia= 1200;
      
    }else{
        demasia= 1000;
    }
    $("#F1810 td:eq(34)").html(demasia.toFixed(0));
      
    //  TIRAJE TOTAL EN HOJAS RESMA
    var pliegosMaq = parseFloat($("#F1810 td:eq(38)").html());  //  # DE PLIEGOS DE MAQUINA DEL TRABAJO
    var cantPliegos = parseFloat($("#F1810 td:eq(16)").html()); //  # DE P/M's POR HOJA/RESMA

    var tiraje=(tirajeTrabajo+demasia)/(cantPliegos*pliegosMaq);
    $("#F1810 td:eq(19)").html(tiraje.toFixed(0));
  
    // AREA CON HOJA PAPEL
    switch ($("#F1810 td:eq(58)").html()){
        case '61' : $("#F1810 td:eq(23)").html(0.5246);break;
        case '69' : $("#F1810 td:eq(23)").html(0.6141);break;
        case '72' : $("#F1810 td:eq(23)").html(0.7344);break;
        case '70' : $("#F1810 td:eq(23)").html(0.7);break;
        case '' : $("#F1810 td:eq(23)").html(0);break;
        default : $("#F1810 td:eq(23)").html($("#F1810 td:eq(58)").html());break;
    } 
      
    // MTS CUADRADOS DE PAPEL
    var mtrCuadrados =tiraje * parseFloat($("#F1810 td:eq(23)").html());
    $("#F1810 td:eq(27)").html(mtrCuadrados.toFixed(2));  
    this.mtrCuadrados=mtrCuadrados;
  
    // KGS DE PAPEL
    var kgsPapel;
    var gramaje = $("#F1810 td:eq(54)").html();
  
    if(gramaje==""){
        gramaje=0;
        kgsPapel=0;
        $("#F1810 td:eq(31)").html(0);
    }else{
        kgsPapel = mtrCuadrados* parseFloat(gramaje)/1000;
        $("#F1810 td:eq(31)").html(kgsPapel.toFixed(2));
    }
       
    //  # DE PLACAS
    var nDePlacas;
    var tipoImpresion = $("#F1810 td:eq(42)").html();
    var numColores = $("#F1810 td:eq(46)").html();;
    
    if(maquina=="¿Qué máquina?"){
        $("#F1810 td:eq(35)").html("¿Qué máquina?");
    } else{
        if(tipoImpresion==2){
            nDePlacas = pliegosMaq*2*numColores;
        }else{
            nDePlacas = pliegosMaq*numColores;
        }
        $("#F1810 td:eq(35)").html(nDePlacas);  
    } 
      
    // PLACAS
    var nPlaca=0;  
    var contrato=$("#PRINCIPAL td:eq(33) select option:selected").text(); //  CONTRATO MARCO PARA TELEFONICA
  
    if(contrato == "SI"){
        $("#F1810 td:eq(39)").html(0);  
    }else {
        switch(maquina){
            case '2': nPlaca = nDePlacas*parseFloat(slider3.gtoTotal);break;
            case '4': nPlaca = nDePlacas*parseFloat(slider3.smTotal);break;
            case '8': nPlaca = nDePlacas*parseFloat(slider3.r700Total);break;
            case '1': nPlaca = maquina*parseFloat(slider3.smTotal);break;
            default:  $("#F1810 td:eq(39)").html("NRO DE MAQUINA!!!");break;
        }
        if(nPlaca!=0){
            $("#F1810 td:eq(39)").html(nPlaca.toFixed(4));
        }
    }
    this.insumos = this.insumos + nPlaca;
      
    //  PAPEL
  
    var tamañoPapel = parseFloat($("#F1810 td:eq(58)").html()); //  TAMAÑO DEL PAPEL 61, 69, 70, 72
    var qualityPaper =$("#PRINCIPAL td:eq(31) select option:selected").text(); //  QUALITY PAPER
    var tipoPapel = $("#F1810 td:eq(50)").html(); //   TIPO DE PAPEL
    var d1=0, dp =document.getElementById("papel");
    var papel=0;
  
    switch(tipoPapel){
        case "ADHE": d1= parseFloat(dp.getElementsByTagName('input')[26].value);break;
        case "LYNE": d1= parseFloat(dp.getElementsByTagName('input')[22].value);break;
        case "COUC":
          
          if(qualityPaper=="SI"){
              if(gramaje==90){
                d1= parseFloat(dp.getElementsByTagName('input')[1].value);
              }else{
                if(gramaje<251){
                  d1= parseFloat(dp.getElementsByTagName('input')[3].value);
                }else{
                  d1= parseFloat(dp.getElementsByTagName('input')[5].value);
                }
              }
                
          }else {
              if(gramaje==90){
                  d1= parseFloat(dp.getElementsByTagName('input')[0].value);

              }else if(gramaje<251 && gramaje!=90){
                  d1= parseFloat(dp.getElementsByTagName('input')[2].value);

              }else{
                  d1= parseFloat(dp.getElementsByTagName('input')[4].value);

              }
          } 
          break;
        
        case "BOND":
          if(gramaje==56){
              d1= parseFloat(dp.getElementsByTagName('input')[8].value);
          }else{
              d1= parseFloat(dp.getElementsByTagName('input')[6].value);
          }
          break;
        
        case "PERI":
          d1= parseFloat(dp.getElementsByTagName('input')[24].value);
          break; 
        
        case "FOLK":
          d1= parseFloat(dp.getElementsByTagName('input')[16].value);
          break;
        
        case "DUPL":
          if(gramaje<286){
            d1= parseFloat(dp.getElementsByTagName('input')[18].value);
                      }
          else{
            d1= parseFloat(dp.getElementsByTagName('input')[14].value);
          }
          break;
        
        case "COPY":
          d1= parseFloat(dp.getElementsByTagName('input')[20].value);
          break; 
        
        default:
          $("#F1810 td:eq(43)").html(tipoPapel);break;    
    }
  
    if(d1 != 0){
        papel = kgsPapel*d1;
        $("#F1810 td:eq(43)").html(papel.toFixed(6)); 
        this.insumos = this.insumos + papel;
    }

    //FOTOLITOS
    var fotolitos = 0;
    $("#F1810 td:eq(47)").html(fotolitos);
    this.insumos = this.insumos + fotolitos;
      
    //REPOSICION DE PLACAS
    var reposicionPlacas
    if(tipoImpresion==1){
        if(tirajeTrabajo<=60000){
            $("#F1810 td:eq(51)").html(0);
        }else{
            reposicionPlacas=tirajeTrabajo/60000*nPlaca;
            $("#F1810 td:eq(51)").html(reposicionPlacas.toFixed(2));
            this.insumos = this.insumos + reposicionPlacas;
        }
    }else if(tirajeTrabajo<=60000){
        $("#F1810 td:eq(51)").html(0);
    }else{
        reposicionPlacas=tirajeTrabajo/60000*nPlaca*2;
        $("#F1810 td:eq(51)").html(reposicionPlacas.toFixed(2));
        this.insumos = this.insumos + reposicionPlacas;
    }
    
    //FORMULA TINTA
    var formulaTinta;
  
    switch(tipoPapel){
        case "COUC": formulaTinta = mtrCuadrados*numColores*0.25/1000*7.2;break;
        case "BOND": formulaTinta= mtrCuadrados*numColores*0.2875/1000*7.2;break;
        case "PERI": formulaTinta= mtrCuadrados*numColores*0.325/1000*7.2;break;
        default:     formulaTinta= mtrCuadrados*numColores*0.3125/1000*7.2;break;
    }
    $("#F1810 td:eq(55)").html(formulaTinta.toFixed(2));
    this.insumos = this.insumos + formulaTinta;
  
    //VERIFICAR FORMULA TINTA
    var verificarTinta=0;
    if(tipoImpresion==1){
        $("#F1810 td:eq(59)").html(0);
    }else{
        verificarTinta=formulaTinta;
        $("#F1810 td:eq(59)").html(formulaTinta.toFixed(2));
    }
    this.insumos = this.insumos + verificarTinta;

    //COSTO PRUEBA DE COLOR
    var pruebaColor = $("#F1810 td:eq(62)").html();  //  PRUEBA DE COLOR?
    var pruebaColorCosto=0;
    if(contrato=="SI"){
        $("#F1810 td:eq(63)").html(0);
    }else if(pruebaColor=="NO"){
        $("#F1810 td:eq(63)").html(0);
    }else{
        pruebaColorCosto=5;
        $("#F1810 td:eq(63)").html(5);
    }
    this.insumos = this.insumos + pruebaColorCosto;
    
    //COSTO MENSAJERIA
    var mensajeria = $("#F1810 td:eq(66)").html();
    var mensajeriaCosto =0;
    if(mensajeria=="SI" || mensajeria.length==0 || mensajeria==""){
        mensajeriaCosto =5;
        $("#F1810 td:eq(67)").html(5);
    }else{
         $("#F1810 td:eq(67)").html(0);
    }
    this.insumos = this.insumos + mensajeriaCosto;
    
    //MONTO PLST O BARNZ
    var tipoPlastificado = $("#F1810 td:eq(70)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO
    var tipoPlastificadoAdic1 = $("#F1810 td:eq(74)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 1
    var tipoPlastificadoAdic2 = $("#F1810 td:eq(78)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 2
    var tdTabla = $("#item td").length;
    var arrayItem=[],arrayValor=[];
    var a=0,b=0;
    var montoPlast=0, valorPlast=0, valorPlastAdic1=0, valorPlastAdic2=0;
  
    var di =document.getElementById("item");

    for(var j=0;j<156;j+=6){
        d1= parseFloat(di.getElementsByTagName('input')[j].value);
        arrayValor[a]=d1;
        a++;
    }
  
    for(var i=8;i<tdTabla;i+=7){
        arrayItem[b]=$("#item td:eq("+i+")").html();
        if(tipoPlastificado==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlast=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(71)").html(valorPlast.toFixed(3));
            this.insumos = this.insumos + valorPlast;
            
        }
        if(tipoPlastificadoAdic1==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlastAdic1=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(75)").html(valorPlastAdic1.toFixed(3));
            this.insumos = this.insumos + valorPlastAdic1;
        }
        if(tipoPlastificadoAdic2==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlastAdic2=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(79)").html(valorPlastAdic2.toFixed(3));
            this.insumos = this.insumos + valorPlastAdic2;
        }
        b++;
    }

    if(montoPlast==0){
      $("#F1810 td:eq(71)").html(montoPlast);
      $("#F1810 td:eq(75)").html(montoPlast);
      $("#F1810 td:eq(79)").html(montoPlast);
      this.insumos = this.insumos + montoPlast;
    }
  
  
    //SACAR BIEN EL COSTO - COSTO TROQUELADO?
    var troquelado=$("#F1810 td:eq(82)").html();
    var valorH16=slider2.f46;
    var sacarCosto=0;
    if(troquelado=="TROQ"){
        switch(maquina){
            case '8': sacarCosto=(tirajeTrabajo*2/2000+1)*valorH16+75;break;
            case '2': sacarCosto=(tirajeTrabajo/2000+1)*valorH16+20; break;
            default : sacarCosto=(tirajeTrabajo/2000+1)*valorH16+50; break;
        }
    }else{
        if(troquelado=="RAYA"){
            sacarCosto=(a1/1500+2)*valorH16+12;
        }else{
            if(troquelado=="GRND"){
                sacarCosto=tirajeTrabajo/1000*10+75;
            }else{
                sacarCosto=0;
            }
        }
    }
    
    $("#F1810 td:eq(83)").html(sacarCosto.toFixed(5));
    this.talleres = this.talleres+sacarCosto;
    
    // MONTO DOBLADO Y ALZE
    var valorH25=slider2.f62;
    var montoDoblado=0;
    var doblado=$("#F1810 td:eq(86)").html();
    if(doblado=="REVI"){
        switch(maquina){
            case '8' : montoDoblado=(1+tirajeTrabajo*pliegosMaq/5000)*valorH25*2;break;
            default : montoDoblado=(1+tirajeTrabajo*pliegosMaq/5000)*valorH25;break;
        }
    }else{
        montoDoblado=0;
    }
    $("#F1810 td:eq(87)").html(montoDoblado.toFixed(3));
    this.talleres = this.talleres+montoDoblado;
    
    //MONTO DOBLADO EN MAQUINA
    var montoDobladoMaquina=0;
    switch (doblado){
        case "DIPT" : montoDobladoMaquina=(0.5+a2/12000)*valorH25;break;
        case "TRIP" : montoDobladoMaquina=(a2/9000+0.75)*valorH25;break;
        case "CUAD" : montoDobladoMaquina=(a2/7000+1)*valorH25;break;
        case "CRUZ" : montoDobladoMaquina=(a2/5000+1)*valorH25;break;
        default : montoDobladoMaquina=0;break;
    }
    $("#F1810 td:eq(91)").html(montoDobladoMaquina.toFixed(3));
    this.talleres = this.talleres+montoDobladoMaquina;
    
    //MONTO DOBLADO MANUAL
    var montoDobladoManual=0;
    var valorC2=$("#F1810INSUMOS #tipocambio").val();
    
    if($("#F1810 td:eq(90)").html()=="MAN"){
        switch($("#F1810 td:eq(94)").html()){
            case '1' : montoDobladoManual=a1/1000*pliegosMaq*1*8/valorC2;break;
            case '2' : montoDobladoManual=a1/1000*pliegosMaq*2*8/valorC2;break;
            case '3' : montoDobladoManual=a1/1000*pliegosMaq*3*8/valorC2;break;
            default  : montoDobladoManual=0;break;
        }
    }else{
        montoDobladoManual=0;
    }
    $("#F1810 td:eq(95)").html(montoDobladoManual.toFixed(3));
    this.talleres = this.talleres+montoDobladoManual;
    
    
    //MONTO ALZE
    var montoAlze=0;
    var valorC4=$("#F1810INSUMOS #milsolcista").val();
    if(doblado=="REVI"){
        montoAlze=a1*a2*pliegosMaq/1000*valorC4;
    }else{
        montoAlze=0;
    }
    $("#F1810 td:eq(99)").html(montoAlze.toFixed(3));
    this.talleres = this.talleres+montoAlze;
  
  
  
    //	REVISAR COSTOS - COSTO COSIDO HILO, ENCOLADO O ENGRAPADO
    var cosido = $("#F1810 td:eq(102)").html(); // COSIDO HILO, ENCOLADO O ENGRAPADO
    var costocosido=0;
  
    
    if (cosido=="NO"){
        costocosido=0;
      
    }else if( cosido=="GRAP"){
        costocosido=a1/1000*5;     //a1 = TIRAJE TOTAL DE PIEZAS GRAFICAS
      
    }else if( cosido=="COLA"){
        costocosido=a1/1000*pliegosMaq*6;
      
    }else if(  a2/tipoImpresion < 25){    // a2 =  # DE PIEZAS GRAFICAS POR P/M
        costocosido=a1/1000*pliegosMaq*10;
      
    }else if( a2/tipoImpresion < 49 ){
        costocosido=a1/1000*pliegosMaq*10*2;
      
    }else {
        costocosido=a1/1000*pliegosMaq*10*4;
    }
    $("#F1810 td:eq(103)").html(costocosido);
    this.talleres = this.talleres+costocosido;
    
    // - COSTO EMPAQUETADO O ENCAJONADO
    var empaquetado = $("#F1810 td:eq(106)").html(); //EMPAQUETADO O ENCAJONADO 
    var tipocambio = $("#F1810INSUMOS #tipocambio").val(); // TIPO CAMBIO DE LA HOJA 4
  
    var costoempaquetado=0;

    if (qualityPaper=="SI"){
        costoempaquetado=0;
    }else if( empaquetado=="CAJA"){
        costoempaquetado=kgsPapel/18*3.5/tipocambio;
    }else if( empaquetado==0 || empaquetado==""){
        costoempaquetado=kgsPapel/15*(0.09 + 0.02 + 0.15);
    }else {
        costoempaquetado=a1/empaquetado*(0.09 + 0.02 + 0.15);
    }
    
    $("#F1810 td:eq(107)").html(costoempaquetado.toFixed(6));
    this.flete=this.flete+costoempaquetado;
    
    // - COSTO MOVILIDAD O DESPACHO $$
    var costomovilidad;
    if (kgsPapel>36000){
        costomovilidad="MUCHO FLETE";
    }else if(kgsPapel<=20 ){
        costomovilidad=10;
    }else if(kgsPapel<=500 ){
        costomovilidad=20;
    }else if(kgsPapel<=800 ){
        costomovilidad=30;
    }else if(kgsPapel<=1800 ){
        costomovilidad=60;
    }else if(kgsPapel<=5000 ){
        costomovilidad=75;
    }else if(kgsPapel<=9000 ){
        costomovilidad=90;
    }else if(kgsPapel<=12000 ){
        costomovilidad=100;
    }else if(kgsPapel<=18000 ){
        costomovilidad=180;
    }else if(kgsPapel<=24000 ){
        costomovilidad=200;
    }else{
        costomovilidad=300;
    }
  
    $("#F1810 td:eq(110)").html(costomovilidad);
    if(costomovilidad!="MUCHO FLETE"){
      this.flete=this.flete+costomovilidad;
    } 
  
  
    // TRABAJAR EL NUMERADO - SERVICIOS DE TERCEROS($$$)
    var montoTerceros=parseFloat($("#F1810 td:eq(114)").html());
    this.talleres = this.talleres+montoTerceros;
      
    // VELOCIDAD DE MAQUINA
    var velocidadMaquina;
  
    if (tipoPapel=="COUC"){
        if(parseFloat(gramaje)<200){
            velocidadMaquina=8500;
       }else{
           velocidadMaquina=7000;
       }
    }else if(tipoPapel=="BOND"){
        velocidadMaquina=8000;        
    }else{
        velocidadMaquina=7000;
    }
  
    $("#F1810 td:eq(117)").html(velocidadMaquina);
      
    // HORAS/IMPRESORA PREVISTAS 
    var valorHorasImpresora;
      
    if(maquina==1){
        if(tirajeTrabajo<=5000){
            valorHorasImpresora = (tirajeTrabajo/6000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }else if(tirajeTrabajo<=10000){
            valorHorasImpresora = (tirajeTrabajo/7000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }else{
            valorHorasImpresora = (tirajeTrabajo/8000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }
   }else if(tirajeTrabajo<=5000){
        valorHorasImpresora = (tirajeTrabajo/(1250*maquina)*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion); 
     
   }else if(maquina>2){
        valorHorasImpresora = (tirajeTrabajo/velocidadMaquina*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
     
   }else{
        valorHorasImpresora = (tirajeTrabajo/4000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
   }
  
    $("#F1810 td:eq(119)").html(valorHorasImpresora.toFixed(8)); 
  
  
    // TODO TRABAJO DEBE PAGAR - COSTO HORAS/IMPRESORA PREVISTAS 
    var trabajoPagar=0;
    var valorH11=parseFloat(slider2.f5);
    var valorH12=parseFloat(slider2.f12);
    var valorH13=parseFloat(slider2.f20);
    if(numColores>4){
        trabajoPagar=maquina*valorHorasImpresora*(6.5)*2;
    }else{
        switch(maquina){
            case '8': trabajoPagar=valorHorasImpresora*valorH11;break;
            case '4': trabajoPagar=valorHorasImpresora*valorH12;break;
            default : trabajoPagar=valorHorasImpresora*valorH13;break;
        }
    }
  
    $("#F1810 td:eq(120)").html(trabajoPagar.toFixed(8));
    this.talleres = this.talleres+trabajoPagar;
    
    //HORAS DE GUILLOTINA PREVISTAS
    var guillotina1=0;
    guillotina1=(tiraje/12000)/2;
    $("#F1810 td:eq(123)").html(guillotina1.toFixed(8));
    
    //HORAS DE GUILLOTINA PREVISTAS 2
    var guillotina2=0;
    if(a2<=2){
        guillotina2=guillotina1;
    }else{
        if(a2<=4){
            guillotina2=guillotina1*1.5;
        }else{
            if(a2<=8){
              guillotina2= guillotina1*2.25;
            }else{
               if(a2<=16){
                   guillotina2=guillotina1*3.5;
               }else{
                   if(a<=32){
                       guillotina2=guillotina1*5;  
                   }else{
                       guillotina2=guillotina1*6;
                   }
               }
            }
        }
    }
    $("#F1810 td:eq(127)").html(guillotina2.toFixed(8));
    
    
    // CORTE INICIAL - COSTO HORAS DE GUILLOTINA PREVISTAS
    var corteInicial=0;
    var valorH15=slider2.f38;
    if($("#F1810 td:eq(8)").html()==0){
        corteInicial=0;
    }else{
        corteInicial=guillotina1*valorH15;
    }
    $("#F1810 td:eq(124)").html(corteInicial.toFixed(4));
    this.talleres = this.talleres+corteInicial;
    
    //CORTE POSTPRENSA - COSTO HORAS DE GUILLOTINA PREVISTAS 2
    var cortePostPrensa=0;
    cortePostPrensa=guillotina2*valorH15;
    $("#F1810 td:eq(128)").html(cortePostPrensa.toFixed(4));
    this.talleres = this.talleres+cortePostPrensa;
    
    //SUMA
    var F1810suma=0;
    F1810suma=this.insumos+this.talleres+this.flete;
    $("#F1810 td:eq(131)").html(F1810suma.toFixed(4));
    
    //GASTOS GENERALES 18%
    var ggF1810=0;
    ggF1810=F1810suma*0.18;
    $("#F1810 td:eq(136)").html(ggF1810.toFixed(4));
    
    //UTILIDADES Y REINERSIONES 10%
    var utilidadesF1810=0;
    utilidadesF1810=(F1810suma+ggF1810)*0.1;
    $("#F1810 td:eq(139)").html(utilidadesF1810.toFixed(4));
    
    //TOTAL NETO
    var totalNetoF1810=0;
    totalNetoF1810=F1810suma+ggF1810+utilidadesF1810;
    $("#F1810 td:eq(142)").html(totalNetoF1810.toFixed(4));
    
    //TOTAL INC COMISION
    var totalComisionF1810=0;
    var comision=$("#F1810 td:eq(5)").html();   // TASA COMISION
    totalComisionF1810=totalNetoF1810*comision;
    $("#F1810 td:eq(145)").html(totalComisionF1810.toFixed(4));
  
    this.total=totalComisionF1810;
    /*====================================================
    
              COSTO NORMAL
    
    =====================================================*/
    
    //  --HORAS/IMPRESORA PREVISTAS ** DATO
    var normalprevistas=0;
 
    if (maquina==1){
        if (tirajeTrabajo <= 5000){
            normalprevistas= (tirajeTrabajo+demasia)/2000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }else if (tirajeTrabajo <= 10000){
            normalprevistas= (tirajeTrabajo+demasia)/3500*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }else {
            normalprevistas= (tirajeTrabajo)/4000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }   
    }else if(tirajeTrabajo<=5000){
        normalprevistas= (tirajeTrabajo+demasia)/(1250*maquina)*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);       
    }else if(maquina>2){
        normalprevistas= (tirajeTrabajo+demasia)/velocidadMaquina*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);     
    }else{
        normalprevistas= tirajeTrabajo/4000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
    }

    //  --HORAS/IMPRESORA PREVISTAS ** VALOR
    var costonormalprevistas=0;

    var precioroland = $("#MAQ td:eq(54)").html(),          // PRECIO ROLAND EN DOLARES
        preciosm = $("#MAQ td:eq(70)").html(),              // PRECIOS SM EN DOLARES
        preciogto = $("#MAQ td:eq(86)").html();             // PRECIOS GTO EN DOLARES
    
    precioroland = parseFloat(precioroland.substr(1));  //CONVERTIR A NUMERO
    preciosm = parseFloat(preciosm.substr(1));          //CONVERTIR A NUMERO
    preciogto = parseFloat(preciogto.substr(1));        //CONVERTIR A NUMERO
    
    if (numColores > 8){
        costonormalprevistas = maquina*normalprevistas*8*6; 
    }else if(numColores >4){
        if (maquina==8){
            if ( numColores ==5){
                costonormalprevistas = normalprevistas*precioroland*1.25; 
            }else{
                costonormalprevistas = normalprevistas*precioroland*2;
            }
            
        }else if (maquina==2){
            costonormalprevistas = normalprevistas*preciosm*2;
        }else{
            costonormalprevistas = normalprevistas*preciogto*2;
        }
       
    }else if (maquina==8){
        costonormalprevistas = normalprevistas*precioroland;
    }else if(maquina==4){
        costonormalprevistas = normalprevistas*preciosm;
    }else{
        costonormalprevistas = normalprevistas*preciogto;
    }
    
    
    //TOTAL +SUBTOTAL NORMAL
    var factor = $("#F1810INSUMOS #factor").val();     // FACTOR SOBRE CD -- cambio ES DEL LLAMADO DEL TIPO CAMBIO DE LA HOJA 4
    
    var normalsuma = F1810suma - trabajoPagar + costonormalprevistas ;  // SUMA NORMAL
    
    var normalinsumos12 = (papel + formulaTinta + verificarTinta + valorPlast + montoTerceros)*1.12;   //TOTAL INSUMOS + 12 %
    var normalservicios24 = (normalsuma - (normalinsumos12/1.12))*factor;                              //TOTAL SERVICIO + 24 %
    var normaltotalneto = normalinsumos12 + normalservicios24;                                         // TOTAL NETO
    var normalcomision = normaltotalneto * comision;
  
    this.totalNormal=normalcomision;

};


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider1 = new F1810PRINCIPAL();




/*================================================================================
  SLIDER 2: TABLA F1810MAQ
================================================================================*/

//  FUNCION PRINCIPAL
var F1810MAQ = function() {

  //--INICIALIZAR VARIABLES--
  this.cambio=0;
  this.hsOperario=0;
  this.hsMaqAux=0;
  this.hsMaqImp=0;
  this.supervisor=0;
  this.x=0;
  this.y=0;
  this.z=0;
  this.tinta72=0;
  this.tinta61=0;
  this.barniz72=0;
  this.barniz61=0;
  this.hExtras=0;
  this.d1=0;
  this.d2=0;
  this.a1=0;
  this.a2=0;
  this.p1=0;
  this.p2=0;
  
  this.f1,this.f2,this.f3,this.f4,this.f5,this.f6,this.f7,
  this.f8,this.f9,this.f10,this.f11,this.f12,this.f13,this.f14,
  this.f15,this.f16,this.f17,this.f18,this.f19,this.f20,this.f21,
  this.f22,this.f23,this.f24,this.f25,this.f26,this.f27,this.f28,
  this.f29,this.f30,this.f31,this.f32,this.f33,this.f34,this.f35,
  this.f36,this.f37,this.f38,this.f39,this.f40,this.f41,this.f42,
  this.f43,this.f44,this.f45,this.f46,this.f47,this.f48,this.f49,
  this.f50,this.f51,this.f52,this.f53,this.f54,this.f55,this.f56,
  this.f57,this.f58,this.f59,this.f60,this.f61,this.f62,this.f63;

}


//  FUNCION PARA HALLAR CPOS_TOTAL
F1810MAQ.prototype.CPOS_TOTAL = function(){
  x = parseFloat(document.getElementById("CPOS-R700").value),
  y = parseFloat(document.getElementById("CPOS-SM").value),
  z = parseFloat(document.getElementById("CPOS-GTO").value);
  $("#CPOS-TOTAL").val(x+y+z);
}


//  FUNCION QUE PERMITE LLENAR LOS DATOS DE LA TABLA SEGUN LA INFORMACION INGRESADA
F1810MAQ.prototype.calcular = function(){

  cambio=parseFloat(document.getElementById("cambio").value);
  hsOperario = parseFloat(document.getElementById("hsOperario").value);
  hsMaqAux = parseFloat(document.getElementById("hsMaqAux").value);
  hsMaqImp = parseFloat(document.getElementById("hsMaqImp").value);

  supervisor = parseFloat(document.getElementById("supervisor").value);
  x = parseFloat(document.getElementById("CPOS-R700").value);
  y = parseFloat(document.getElementById("CPOS-SM").value);
  z = parseFloat(document.getElementById("CPOS-GTO").value);

  tinta72 = parseFloat(document.getElementById("tinta72").value);
  tinta61 = parseFloat(document.getElementById("tinta61").value);
  barniz72 = parseFloat(document.getElementById("barniz72").value);
  barniz61 = parseFloat(document.getElementById("barniz61").value);

  hExtras = parseFloat(document.getElementById("hExtras").value);
  d1 = parseFloat(document.getElementById("d1").value);
  d2 = parseFloat(document.getElementById("d2").value);

  a1 = parseFloat(document.getElementById("a1").value);
  a2 = parseFloat(document.getElementById("a2").value);

  p1 = parseFloat(document.getElementById("p1").value);
  p2 = parseFloat(document.getElementById("p2").value);
  
  //HOJA 4 - F1810INSUMOS
  var cambio2=parseFloat($("#tipocambio").val());

  /*--=================================================
      FILA 1  Impresora Roland 700
  =================================================--*/
  // f1,f2,f3,f4,f5,f6,f7;

  this.f1=(750000/(p1*p2));
  $("#MAQ td:eq(46)").html("$"+this.f1.toFixed(2));

  this.f2=((200000*2+5000*12*10)/(p1*p2));
  $("#MAQ td:eq(47)").html("$"+this.f2.toFixed(2));

  this.f3=(((2500+1500+supervisor/(x+y+z)*x)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(50)").html("$"+this.f3.toFixed(2));

  this.f4=(((2500+1400)*d1/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(51)").html("$"+this.f4.toFixed(2));

  this.f5=this.f1+this.f2+this.f3+this.f4;
  $("#MAQ td:eq(52)").html("$"+this.f5.toFixed(2));

  this.f6=this.f5*cambio;
  $("#MAQ td:eq(53)").html("S/."+this.f6.toFixed(2));

  this.f7=160*a1*a2;
  $("#MAQ td:eq(56)").html("$"+this.f7.toFixed(2));

  /*--=================================================
      FILA 2  Impresora Speed Master
  =================================================--*/
  // f8,f9,f10,f11,f12,f13,f14;

  this.f8=(350000/(p1*p2));
  $("#MAQ td:eq(62)").html("$"+this.f8.toFixed(2));

  this.f9=((100000*2+2500*12*10)/(p1*p2));
  $("#MAQ td:eq(63)").html("$"+this.f9.toFixed(2));

  this.f10=(((2500+supervisor/(x+y+z)*y)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(66)").html("$"+this.f10.toFixed(2));

  this.f11=((2500*d2/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(67)").html("$"+this.f11.toFixed(2));

  this.f12=this.f8+this.f9+this.f10+this.f11;
  $("#MAQ td:eq(68)").html("$"+this.f12.toFixed(2));

  this.f13=this.f12*cambio;
  $("#MAQ td:eq(69)").html("S/."+this.f13.toFixed(2));

  this.f14=80*a1*a2;
  $("#MAQ td:eq(72)").html("$"+this.f14.toFixed(2));

  /*--=================================================
      FILA 3  Impresora GTO y KBA
  =================================================--*/
  // f15,f16,f17,f18,f19,f20,f21,f22;

  this.f15=(150000/(p1*p2));
  $("#MAQ td:eq(78)").html("$"+this.f15.toFixed(2));

  this.f16=((50000*2+1250*12*10)/(p1*p2));
  $("#MAQ td:eq(79)").html("$"+this.f16.toFixed(2));

  this.f17=0;
  $("#MAQ td:eq(80)").html("$"+this.f17.toFixed(2));

  this.f18=(((2000+supervisor/(x+y+z)*z)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(82)").html("$"+this.f18.toFixed(2));

  this.f19=((2000*d2/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(83)").html("$"+this.f19.toFixed(2));

  this.f20=this.f15+this.f16+this.f17+this.f18+this.f19;
  $("#MAQ td:eq(84)").html("$"+this.f20.toFixed(2));

  this.f21=this.f20*cambio;
  $("#MAQ td:eq(85)").html("S/."+this.f21.toFixed(2));

  this.f22=40*a1*a2;
  $("#MAQ td:eq(88)").html("$"+this.f22.toFixed(2));

  /*--=================================================
      FILA 4  Imp. Digital CP1000 (COSTS X COPY A3) Solo 1 cara
  =================================================--*/
  // f23,f24,f25,f26,f27,f28,f29,f30,f31;

  this.f23=(100000/2257740);
  $("#MAQ td:eq(94)").html("$"+this.f23.toFixed(6));

  this.f24=(39758.93/1128870);
  $("#MAQ td:eq(95)").html("$"+this.f24.toFixed(6));

  this.f25=0;
  $("#MAQ td:eq(96)").html("$"+this.f25.toFixed(2));

  this.f26=0;
  $("#MAQ td:eq(97)").html("$"+this.f26.toFixed(6));

  this.f27=((1000+2000)*d2/47036)/cambio2;//<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOJA4 (CAMBIO)
  $("#MAQ td:eq(98)").html("$"+this.f27.toFixed(6));

  this.f28=0;
  $("#MAQ td:eq(99)").html("$"+this.f28.toFixed(6));

  this.f29=this.f23+this.f24+this.f25+this.f26+this.f27+this.f28;
  $("#MAQ td:eq(100)").html("$"+this.f29.toFixed(6));

  this.f30=this.f29*cambio2;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOJA4 (CAMBIO)
  $("#MAQ td:eq(101)").html("S/."+this.f30.toFixed(6));

  this.f31=40*a1*a2;
  $("#MAQ td:eq(104)").html("$"+this.f31.toFixed(2));

  /*--=================================================
      FILA 5  Guillotina Wholemberg 115
  =================================================--*/
  // f32,f33,f34,f35,f36,f37,f38,f39,f40;

  this.f32=(1534.00/hsMaqAux);
  $("#MAQ td:eq(110)").html("$"+this.f32.toFixed(2));

  this.f33=(100*2/hsMaqAux);
  $("#MAQ td:eq(111)").html("$"+this.f33.toFixed(2));

  this.f34=(380.00/6/hsMaqAux);
  $("#MAQ td:eq(112)").html("$"+this.f34.toFixed(2));

  this.f35=10/16;
  $("#MAQ td:eq(113)").html("$"+this.f35.toFixed(2));

  this.f36=((1500)*d1/cambio)/hsOperario;
  $("#MAQ td:eq(114)").html("$"+this.f36.toFixed(2));

  this.f37=(1500*d1/hsOperario)*hExtras/cambio/hsOperario;
  $("#MAQ td:eq(115)").html("$"+this.f37.toFixed(2));

  this.f38=this.f32+this.f33+this.f34+this.f35+this.f36+this.f37;
  $("#MAQ td:eq(116)").html("$"+this.f38.toFixed(2));

  this.f39=this.f38*cambio;
  $("#MAQ td:eq(117)").html("S/."+this.f39.toFixed(2));

  this.f40=30*a1*a2;
  $("#MAQ td:eq(120)").html("$"+this.f40.toFixed(2));

  /*--=================================================
      FILA 6  Troqueladora Atenas
  =================================================--*/
  // f41,f42,f43,f44,f45,f46,f47,f48;

  this.f41=(12000/(p1*p2));
  $("#MAQ td:eq(126)").html("$"+this.f41.toFixed(2));

  this.f42=((5000*3)+(400*12*10))/(p1*p2);
  $("#MAQ td:eq(127)").html("$"+this.f42.toFixed(2));

  this.f43=500/hsMaqImp;
  $("#MAQ td:eq(129)").html("$"+this.f43.toFixed(2));

  this.f44=((1500)*d2/cambio)/hsOperario;
  $("#MAQ td:eq(130)").html("$"+this.f44.toFixed(2));

  this.f45=(1500*d2/hsOperario)*hExtras/cambio/hsOperario;
  $("#MAQ td:eq(131)").html("$"+this.f45.toFixed(2));

  this.f46=this.f41+this.f42+this.f43+this.f44+this.f45;
  $("#MAQ td:eq(132)").html("$"+this.f46.toFixed(2));

  this.f47=this.f46*cambio;
  $("#MAQ td:eq(133)").html("S/."+this.f47.toFixed(2));

  /*--=================================================
      FILA 7  Barnizadora Invicta 33
      FILA 8  Barnizadora Adast Dominant 724
  =================================================--*/
  // f48,f49,f50,f51,f52,f53,f54,f55;

  this.f48=(8000/(p1*p2));
  $("#MAQ td:eq(158)").html("$"+this.f48.toFixed(2));
  $("#MAQ td:eq(174)").html("$"+this.f48.toFixed(2));

  this.f49=((3000*3)+(300*12*10))/(p1*p2);
  $("#MAQ td:eq(159)").html("$"+this.f49.toFixed(2));
  $("#MAQ td:eq(175)").html("$"+this.f49.toFixed(2));

  this.f50=390*3/(500*12);
  $("#MAQ td:eq(160)").html("$"+this.f50.toFixed(2));
  $("#MAQ td:eq(176)").html("$"+this.f50.toFixed(2));

  this.f51=(500/hsMaqImp);
  $("#MAQ td:eq(161)").html("$"+this.f51.toFixed(2));
  $("#MAQ td:eq(177)").html("$"+this.f51.toFixed(2));

  this.f52=((1300+1000)*d1/cambio)/hsOperario;
  $("#MAQ td:eq(162)").html("$"+this.f52.toFixed(2));
  $("#MAQ td:eq(178)").html("$"+this.f52.toFixed(2));

  this.f53=0;
  $("#MAQ td:eq(163)").html("$"+this.f53.toFixed(2));
  $("#MAQ td:eq(179)").html("$"+this.f53.toFixed(2));

  this.f54=this.f48+this.f49+this.f50+this.f51+this.f52+this.f53;
  $("#MAQ td:eq(164)").html("$"+this.f54.toFixed(2));
  $("#MAQ td:eq(180)").html("$"+this.f54.toFixed(2));

  this.f55=this.f54*cambio;
  $("#MAQ td:eq(165)").html("S/."+this.f55.toFixed(2));
  $("#MAQ td:eq(181)").html("S/."+this.f55.toFixed(2));

  /*--=================================================
      FILA 9  Dobladora Stahl
  =================================================--*/
  // f56,f57,f58,f59,f60,f61,f62,f63;

  this.f56=1534/hsMaqAux;
  $("#MAQ td:eq(210)").html("$"+this.f56.toFixed(2));

  this.f57=100/hsMaqAux;
  $("#MAQ td:eq(211)").html("$"+this.f57.toFixed(2));

  this.f58=1212.12/6/hsMaqAux;
  $("#MAQ td:eq(212)").html("$"+this.f58.toFixed(2));

  this.f59=0/16;
  $("#MAQ td:eq(213)").html("$"+this.f59.toFixed(2));

  this.f60=578/hsOperario;
  $("#MAQ td:eq(214)").html("$"+this.f60.toFixed(2));

  this.f61=120.42/hsOperario;
  $("#MAQ td:eq(215)").html("$"+this.f61.toFixed(2));

  this.f62=this.f56+this.f57+this.f58+this.f59+this.f60+this.f61;
  $("#MAQ td:eq(216)").html("$"+this.f62.toFixed(2));

  this.f63=this.f62*cambio;
  $("#MAQ td:eq(217)").html("S/."+this.f63.toFixed(2));


}


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider2 = new F1810MAQ();




/*================================================================================
  SLIDER 3: TABLA F1810INSUMOS
================================================================================*/


//  FUNCION PRINCIPAL
var F1810INSUMOS = function() {
    this.gtoTotal=0;
    this.smTotal=0;
    this.r700Total=0;
};


// FUNCION PARA OBTENER DATOS DE LOS OTROS SLIDERS
F1810INSUMOS.prototype.valoresIniciales = function(){

  //EXTRAYENDO DATOS DE F1810- GENERAL
  var f1810 =document.getElementById("F1810");
  var codmaquina= $(f1810).find("td:eq(9)").text();
  var tiraje= $(f1810).find("td:eq(30)").text();
  var mtspapel= slider1.mtrCuadrados;
  var piezas= $(f1810).find("td:eq(18)").text();
  


  if (tiraje == "" ){
      tiraje = 0;

  } else{
      tiraje=parseFloat(tiraje);
  }
  if (mtspapel == "" ){
      mtspapel=1;

  } else{
      mtspapel=parseFloat(mtspapel);
  }
  if (piezas == "" ){
      piezas = 0;

  } else{
      piezas=parseFloat(piezas);
  }

  //EXTRAYENDO DATOS DE F1810- MAQUINAS
  var costoadast= slider2.f54;
  var costoroland= slider2.f5;



  //--FORMULA DE LOS VALORES INCIALES
  if (codmaquina==8) {
      extrauvb=0.033855;   
  }else{
      extrauvb=0.033855;
  }
  extraoffb = (piezas/2500*costoadast)/mtspapel + 0.010978;
  extraoffm = (tiraje/2500*costoadast)/mtspapel + 0.012807;
  extraacrb = costoroland/mtspapel+ 0.0098;
  extraacrm = costoroland/mtspapel+ 0.0098;


  //--ASIGNACION DE VALORES INICIALES--
  document.getElementById("uvb").value=extrauvb.toFixed(2); 
  document.getElementById("offb").value=extraoffb.toFixed(2); 
  document.getElementById("offm").value=extraoffm.toFixed(2); 
  document.getElementById("acrb").value=extraacrb.toFixed(2); 
  document.getElementById("acrm").value=extraacrm.toFixed(2); 

}


//  FUNCION PARA CALCULAR EL VALOR DE LAS CELDAS EN LAS TABLAS
F1810INSUMOS.prototype.resultado = function(){

  //  DATOS DINAMICOS INICIALES
  var S1 = $("#tipocambio").val();
  var S2 = $("#factor").val();
  var S3 = $("#milsolcista").val();

  //  DETALLES DE PLACAS X HORA
  var dp =document.getElementById("dplacas");
  var d1= parseFloat(dp.getElementsByTagName('input')[0].value);
  var d2= parseFloat(dp.getElementsByTagName('input')[1].value);
  var d3= parseFloat(dp.getElementsByTagName('input')[2].value);
  var d4= parseFloat(dp.getElementsByTagName('input')[3].value);
  var d5= parseFloat(dp.getElementsByTagName('input')[4].value);
  var d6= parseFloat(dp.getElementsByTagName('input')[5].value);

  //  DETALLES DE PLACAS X MAQUINA
  var mp =document.getElementById("mplacas");
  var m1= parseFloat(mp.getElementsByTagName('input')[0].value);
  var m2= parseFloat(mp.getElementsByTagName('input')[1].value);
  var m3= parseFloat(mp.getElementsByTagName('input')[2].value);
  var m4= parseFloat(mp.getElementsByTagName('input')[3].value);
  var m5= parseFloat(mp.getElementsByTagName('input')[4].value);
  var m6= parseFloat(mp.getElementsByTagName('input')[5].value);

  //  DETALLES DEL OPERARIO
  var o = document.getElementById("operario");
  var o1= parseFloat(o.getElementsByTagName('input')[0].value);
  var o2= parseFloat(o.getElementsByTagName('input')[1].value);

  //  VALOR AGREGADO DEL ITEM
  var i= document.getElementById("vitem");
  var i1= parseFloat(i.getElementsByTagName('input')[0].value);
  var i2= parseFloat(i.getElementsByTagName('input')[1].value);
  var i3= parseFloat(i.getElementsByTagName('input')[2].value);
  var i4= parseFloat(i.getElementsByTagName('input')[3].value);
  var i5= parseFloat(i.getElementsByTagName('input')[4].value);

  /*================================================================

              ITEM -- TABLA DE BARNICES O REVESTIMIENTOS

  ================================================================*/
  var it= document.getElementById("item"); 

      //UV-B
  var uvb1= parseFloat(it.getElementsByTagName('input')[0].value);    
  var uvb2= parseFloat(it.getElementsByTagName('input')[1].value);    
  var uvb3= parseFloat(it.getElementsByTagName('input')[2].value);    
  var uvb4= (it.getElementsByTagName('input')[3].value);    
  var uvb5= parseFloat(it.getElementsByTagName('input')[4].value);    
  var uvb6= parseFloat(it.getElementsByTagName('input')[5].value);

      //UV-B-2C
  var uvbc1= parseFloat(it.getElementsByTagName('input')[6].value);    
  var uvbc2= parseFloat(it.getElementsByTagName('input')[7].value);    
  var uvbc3= parseFloat(it.getElementsByTagName('input')[8].value);    
  var uvbc4= (it.getElementsByTagName('input')[9].value);    
  var uvbc5= parseFloat(it.getElementsByTagName('input')[10].value);    
  var uvbc6= parseFloat(it.getElementsByTagName('input')[11].value);

      //UV-M
  var uvm1= parseFloat(it.getElementsByTagName('input')[12].value);
  var uvm2= parseFloat(it.getElementsByTagName('input')[13].value);
  var uvm3= parseFloat(it.getElementsByTagName('input')[14].value);
  var uvm4= (it.getElementsByTagName('input')[15].value);
  var uvm5= parseFloat(it.getElementsByTagName('input')[16].value);
  var uvm6= parseFloat(it.getElementsByTagName('input')[17].value);

      //UV-M-2C
  var uvmc1= parseFloat(it.getElementsByTagName('input')[18].value);
  var uvmc2= parseFloat(it.getElementsByTagName('input')[19].value);
  var uvmc3= parseFloat(it.getElementsByTagName('input')[20].value);
  var uvmc4= (it.getElementsByTagName('input')[21].value);
  var uvmc5= parseFloat(it.getElementsByTagName('input')[22].value);
  var uvmc6= parseFloat(it.getElementsByTagName('input')[23].value);

      //UVSB
  var uvsb1= parseFloat(it.getElementsByTagName('input')[24].value);
  var uvsb2= parseFloat(it.getElementsByTagName('input')[25].value);
  var uvsb3= parseFloat(it.getElementsByTagName('input')[26].value);
  var uvsb4= (it.getElementsByTagName('input')[27].value);
  var uvsb5= parseFloat(it.getElementsByTagName('input')[28].value);
  var uvsb6= parseFloat(it.getElementsByTagName('input')[29].value);

      //UVSB-C
  var uvsbc1= parseFloat(it.getElementsByTagName('input')[30].value);
  var uvsbc2= parseFloat(it.getElementsByTagName('input')[31].value);
  var uvsbc3= parseFloat(it.getElementsByTagName('input')[32].value);
  var uvsbc4= (it.getElementsByTagName('input')[33].value);
  var uvsbc5= parseFloat(it.getElementsByTagName('input')[34].value);
  var uvsbc6= parseFloat(it.getElementsByTagName('input')[35].value);

      //UVSM
  var uvsm1= parseFloat(it.getElementsByTagName('input')[36].value);
  var uvsm2= parseFloat(it.getElementsByTagName('input')[37].value);
  var uvsm3= parseFloat(it.getElementsByTagName('input')[38].value);
  var uvsm4= (it.getElementsByTagName('input')[39].value);
  var uvsm5= parseFloat(it.getElementsByTagName('input')[40].value);
  var uvsm6= parseFloat(it.getElementsByTagName('input')[41].value);

      //UVSM-2C
  var uvsmc1= parseFloat(it.getElementsByTagName('input')[42].value);
  var uvsmc2= parseFloat(it.getElementsByTagName('input')[43].value);
  var uvsmc3= parseFloat(it.getElementsByTagName('input')[44].value);
  var uvsmc4= (it.getElementsByTagName('input')[45].value);
  var uvsmc5= parseFloat(it.getElementsByTagName('input')[46].value);
  var uvsmc6= parseFloat(it.getElementsByTagName('input')[47].value);

      //OFFB
  var offb1= parseFloat(it.getElementsByTagName('input')[48].value);
  var offb2= parseFloat(it.getElementsByTagName('input')[49].value);
  var offb3= parseFloat(it.getElementsByTagName('input')[50].value);
  var offb4= (it.getElementsByTagName('input')[51].value);
  var offb5= parseFloat(it.getElementsByTagName('input')[52].value);
  var offb6= parseFloat(it.getElementsByTagName('input')[53].value);

      //OFFB-2C
  var offbc1= parseFloat(it.getElementsByTagName('input')[54].value);
  var offbc2= parseFloat(it.getElementsByTagName('input')[55].value);
  var offbc3= parseFloat(it.getElementsByTagName('input')[56].value);
  var offbc4= (it.getElementsByTagName('input')[57].value);
  var offbc5= parseFloat(it.getElementsByTagName('input')[58].value);
  var offbc6= parseFloat(it.getElementsByTagName('input')[59].value);

      //OFFM
  var offm1= parseFloat(it.getElementsByTagName('input')[60].value);
  var offm2= parseFloat(it.getElementsByTagName('input')[61].value);
  var offm3= parseFloat(it.getElementsByTagName('input')[62].value);
  var offm4= (it.getElementsByTagName('input')[63].value);
  var offm5= parseFloat(it.getElementsByTagName('input')[64].value);
  var offm6= parseFloat(it.getElementsByTagName('input')[65].value);

      //OFFM-2C
  var offmc1= parseFloat(it.getElementsByTagName('input')[66].value);
  var offmc2= parseFloat(it.getElementsByTagName('input')[67].value);
  var offmc3= parseFloat(it.getElementsByTagName('input')[68].value);
  var offmc4= (it.getElementsByTagName('input')[69].value);
  var offmc5= parseFloat(it.getElementsByTagName('input')[70].value);
  var offmc6= parseFloat(it.getElementsByTagName('input')[71].value);

      //ACRB
  var acrb1= parseFloat(it.getElementsByTagName('input')[72].value);
  var acrb2= parseFloat(it.getElementsByTagName('input')[73].value);
  var acrb3= parseFloat(it.getElementsByTagName('input')[74].value);
  var acrb4= (it.getElementsByTagName('input')[75].value);
  var acrb5= parseFloat(it.getElementsByTagName('input')[76].value);
  var acrb6= parseFloat(it.getElementsByTagName('input')[77].value);

      //ACRB-2C
  var acrbc1= parseFloat(it.getElementsByTagName('input')[78].value);
  var acrbc2= parseFloat(it.getElementsByTagName('input')[79].value);
  var acrbc3= parseFloat(it.getElementsByTagName('input')[80].value);
  var acrbc4= (it.getElementsByTagName('input')[81].value);
  var acrbc5= parseFloat(it.getElementsByTagName('input')[82].value);
  var acrbc6= parseFloat(it.getElementsByTagName('input')[83].value);

      //ACRM
  var acrm1= parseFloat(it.getElementsByTagName('input')[84].value);
  var acrm2= parseFloat(it.getElementsByTagName('input')[85].value);
  var acrm3= parseFloat(it.getElementsByTagName('input')[86].value);
  var acrm4= (it.getElementsByTagName('input')[87].value);
  var acrm5= parseFloat(it.getElementsByTagName('input')[88].value);
  var acrm6= parseFloat(it.getElementsByTagName('input')[89].value);

      //ACRM-2C
  var acrmc1= parseFloat(it.getElementsByTagName('input')[90].value);
  var acrmc2= parseFloat(it.getElementsByTagName('input')[91].value);
  var acrmc3= parseFloat(it.getElementsByTagName('input')[92].value);
  var acrmc4= (it.getElementsByTagName('input')[93].value);
  var acrmc5= parseFloat(it.getElementsByTagName('input')[94].value);
  var acrmc6= parseFloat(it.getElementsByTagName('input')[95].value);

      //PL-B
  var plb1= parseFloat(it.getElementsByTagName('input')[96].value);
  var plb2= parseFloat(it.getElementsByTagName('input')[97].value);
  var plb3= parseFloat(it.getElementsByTagName('input')[98].value);
  var plb4= (it.getElementsByTagName('input')[99].value);
  var plb5= parseFloat(it.getElementsByTagName('input')[100].value);
  var plb6= parseFloat(it.getElementsByTagName('input')[101].value);

      //PL-B-2C
  var plbc1= parseFloat(it.getElementsByTagName('input')[102].value);
  var plbc2= parseFloat(it.getElementsByTagName('input')[103].value);
  var plbc3= parseFloat(it.getElementsByTagName('input')[104].value);
  var plbc4= (it.getElementsByTagName('input')[105].value);
  var plbc5= parseFloat(it.getElementsByTagName('input')[106].value);
  var plbc6= parseFloat(it.getElementsByTagName('input')[107].value);

      //PL-M
  var plm1= parseFloat(it.getElementsByTagName('input')[108].value);
  var plm2= parseFloat(it.getElementsByTagName('input')[109].value);
  var plm3= parseFloat(it.getElementsByTagName('input')[110].value);
  var plm4= (it.getElementsByTagName('input')[111].value);
  var plm5= parseFloat(it.getElementsByTagName('input')[112].value);
  var plm6= parseFloat(it.getElementsByTagName('input')[113].value);

      //PL-M-2C
  var plmc1= parseFloat(it.getElementsByTagName('input')[114].value);
  var plmc2= parseFloat(it.getElementsByTagName('input')[115].value);
  var plmc3= parseFloat(it.getElementsByTagName('input')[116].value);
  var plmc4= (it.getElementsByTagName('input')[117].value);
  var plmc5= parseFloat(it.getElementsByTagName('input')[118].value);
  var plmc6= parseFloat(it.getElementsByTagName('input')[119].value);

      //PL-H
  var plh1= parseFloat(it.getElementsByTagName('input')[120].value);
  var plh2= parseFloat(it.getElementsByTagName('input')[121].value);
  var plh3= parseFloat(it.getElementsByTagName('input')[122].value);
  var plh4= (it.getElementsByTagName('input')[123].value);
  var plh5= parseFloat(it.getElementsByTagName('input')[124].value);
  var plh6= parseFloat(it.getElementsByTagName('input')[125].value);

      //PL-H-2C
  var plhc1= parseFloat(it.getElementsByTagName('input')[126].value);
  var plhc2= parseFloat(it.getElementsByTagName('input')[127].value);
  var plhc3= parseFloat(it.getElementsByTagName('input')[128].value);
  var plhc4= (it.getElementsByTagName('input')[129].value);
  var plhc5= parseFloat(it.getElementsByTagName('input')[130].value);
  var plhc6= parseFloat(it.getElementsByTagName('input')[131].value);

      //ESCH
  var esch1= parseFloat(it.getElementsByTagName('input')[132].value);
  var esch2= parseFloat(it.getElementsByTagName('input')[133].value);
  var esch3= parseFloat(it.getElementsByTagName('input')[134].value);
  var esch4= (it.getElementsByTagName('input')[135].value);
  var esch5= parseFloat(it.getElementsByTagName('input')[136].value);
  var esch6= parseFloat(it.getElementsByTagName('input')[137].value);

      //ESCH-2C
  var eschc1= parseFloat(it.getElementsByTagName('input')[138].value);
  var eschc2= parseFloat(it.getElementsByTagName('input')[139].value);
  var eschc3= parseFloat(it.getElementsByTagName('input')[140].value);
  var eschc4= (it.getElementsByTagName('input')[141].value);
  var eschc5= parseFloat(it.getElementsByTagName('input')[142].value);
  var eschc6= parseFloat(it.getElementsByTagName('input')[143].value);

      //HOST
  var host1= parseFloat(it.getElementsByTagName('input')[144].value);
  var host2= parseFloat(it.getElementsByTagName('input')[145].value);
  var host3= parseFloat(it.getElementsByTagName('input')[146].value);
  var host4= (it.getElementsByTagName('input')[147].value);
  var host5= parseFloat(it.getElementsByTagName('input')[148].value);
  var host6= parseFloat(it.getElementsByTagName('input')[149].value);

      //HOST-2C
  var hostc1= parseFloat(it.getElementsByTagName('input')[150].value);
  var hostc2= parseFloat(it.getElementsByTagName('input')[151].value);
  var hostc3= parseFloat(it.getElementsByTagName('input')[152].value);
  var hostc4= (it.getElementsByTagName('input')[153].value);
  var hostc5= parseFloat(it.getElementsByTagName('input')[154].value);
  var hostc6= parseFloat(it.getElementsByTagName('input')[155].value);



  /*================================================================

              PRECIO DE PLACAS

  ================================================================*/

//DEPRECIACION Y MANTENIMIENTO
    var gto1 = ((d2+d3)*m2)*d1;
    $("#placas td:eq(7)").html(gto1.toFixed(3));

    var sm1 = ((d2+d3)*m4)*d1;
    $("#placas td:eq(12)").html(sm1.toFixed(3));

    var r7001 = ((d2+d3)*m6)*d1;
    $("#placas td:eq(17)").html(r7001.toFixed(3));

//CD + MERMA + PROD AUX
    var gto2 = (d4*d5*m1);
    $("#placas td:eq(8)").html(gto2.toFixed(3));

    var sm2 = (d4*d5*m3);
    $("#placas td:eq(13)").html(sm2.toFixed(3));

    var r7002 = (d4*d5*m5);
    $("#placas td:eq(18)").html(r7002.toFixed(3));

// MANO DE OBRA
    //NOTAAAAAA 1.43 OBTENER DE HOJA 3
    var gto3 = (o1*1.43/o2*d6*m2/4/S1);
    $("#placas td:eq(9)").html(gto3.toFixed(3)); 

    var sm3 = (o1*1.43/o2*d6*m4/4/S1);
    $("#placas td:eq(14)").html(sm3.toFixed(3)); 

    var r7003 = (o1*1.43/o2*d6*m6/4/S1);
    $("#placas td:eq(19)").html(r7003.toFixed(3));

// PRECIO DE PLACA
    var gtoTotal = gto1+gto2+gto3;
    this.gtoTotal=gtoTotal;
    $("#placas td:eq(10)").html(gtoTotal.toFixed(3));

    var smTotal = sm1+sm2+sm3;
    this.smTotal=smTotal;
    $("#placas td:eq(15)").html(smTotal.toFixed(3)); 

    var r700Total = r7001+r7002+r7003;
    this.r700Total=r700Total;
    $("#placas td:eq(20)").html(r700Total.toFixed(3));
    

// ----------------  COSTO ITEM -----------------------  

    var preciouvbc = 2*uvb1;
    document.getElementById("uvbc").value=preciouvbc.toFixed(2);

    var preciouvmc = 2*uvm1;
    document.getElementById("uvmc").value=preciouvmc.toFixed(2);


    var preciooffbc = 2*offb1;
    document.getElementById("offbc").value=preciooffbc.toFixed(2);


    var preciooffmc = 2*offm1;
    document.getElementById("offmc").value=preciooffmc.toFixed(2);


    var precioacrbc = 2*acrb1;
    document.getElementById("acrbc").value=precioacrbc.toFixed(2);


    var precioacrmc = 2*acrm1;
    document.getElementById("acrmc").value=precioacrmc.toFixed(2);
}


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider3 = new F1810INSUMOS();




/*================================================================================
  INICIALIZAR FUNCIONES
================================================================================*/
slider0.mostrarCliente();
slider0.calcularCodigo();
slider2.CPOS_TOTAL();
slider2.calcular();


slider0.cotizar();
slider1.F1810_Calcular();
slider3.valoresIniciales();
slider3.resultado();


if(presupuesto!=undefined && presupuesto!="" && buscar=="VERDAD"){
    slider0.mostrarDatos(presupuesto);
}

if(presupuesto!=undefined && presupuesto!="" && buscar=="SI"){
    slider0.mostrarDatos(presupuesto);
}













