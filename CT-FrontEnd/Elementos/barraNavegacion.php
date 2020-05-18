    <!--=================================
            BARRA DE NAVEGACION
    ==================================-->
      
    <!--XXXXXXXXXXXXXX BARRA SUPERIOR XXXXXXXXXXXXXXXXXXXXX-->
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark principal fixed-top scrolling-navbar">
    
    <!--BOTON DESPLEGAR-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#barraIzq"
    aria-controls="barraIzq" aria-expanded="true" aria-label="Toggle navigation">

        <span class="navbar-toggler-icon"></span>

    </button>

    <!--TITULO-->
    <a class="navbar-brand text-white font-weight-bold mr-0 d-none d-md-block" onclick="ventanaPrincipal()">
        <img src="Inicio/CT-Brand.png" height="30" class="d-inline-block align-top mr-2"
      alt="mdb logo">Grupo CompuTextos S.A.C.
    </a>

    <!--CONTENIDO DEL MENU-->
    <ul class="nav white-text ml-auto">

      <!--ELEMENTO DEL MENU 1 --> 
      <li class="nav-item active">
        <a class="nav-link" onclick="ventanaPrincipal()">
          <i class="fas fa-home"></i>Inicio
          <span class="sr-only">(current)</span>
        </a>
      </li>

      <!--ELEMENTO DEL MENU 2 -->
      <li class="nav-item">
        <a class="nav-link" onclick="window.print();">
          <i class="fas fa-print"></i>Imprimir</a>
      </li>
      
      <!--ELEMENTO DEL MENU 3 
      <li class="nav-item">
        <a class="nav-link">
          <i class="fas fa-poll"></i>Reporte</a>
      </li>-->

      <!--ELEMENTO DEL MENU 4 -->
      <li class="nav-item">
        <a class="nav-link" onclick="limpiarSesion()">
          <i class="fas fa-times-circle"></i>Salir</a>
      </li>

    </ul>

    </nav>
    <!--XXXXXXXXXXXX FIN BARRA SUPERIOR XXXXXXXXXXXXXXXXXXX-->
    
    <!--XXXXXXXXXXXXXX BARRA LATERAL IZQUIERDA XXXXXXXXXXXXXXXXXXXXX-->
    <div id="barraIzq" class="collapse navbar-collapse show col-7 col-sm-4 col-md-3 col-xl-2 principal lighten-1 px-0">
        <div class="list-group" id="list-tab" role="tablist">
         
          <!--===========================
              MODULO MAESTROS
          ============================-->
          <a id="MAESTROS" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-users white-text mr-2"></i>Maestros</a>
            
            <!--======= CLIENTES  =======-->
            <a id="ACCCLIENTE" onclick="ventanaClientes()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Clientes</a>
            
            <!--======= SERVICIOS =======-->
            <a id="ACCSERVICIO" onclick="ventanaServicios()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Servicios</a>
            
            <!--======= EMPRESAS  =======-->
            <a id="ACCEMPRESA" onclick="ventanaEmpresas()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Empresas</a>
            
            <!--======= MAQUINAS  =======-->
            <a id="ACCMAQUINA" onclick="ventanaMaquinas()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Maquinas</a>
            
            <!--======= BANCOS    =======-->
            <a id="ACCBANCO" onclick="ventanaBancos()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Bancos</a>
            
            <!--======= PROVEEDOR  =======-->
            <a id="ACCPROVEEDOR" onclick="ventanaProveedor()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Proveedores</a>
            
            <!--======= PERSONAL  =======-->
            <a id="ACCPERSONAL" onclick="ventanaPersonal()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Personal</a>
            
            <!--======= USUARIO  =======-->
            <a id="ACCUSUARIO" onclick="ventanaUsuario()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Usuario</a>
            
          <!--===========================
              MODULO PRESUPUESTOS
          ============================-->
          <a id="PRESUPUESTO" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-chart-line white-text mr-2"></i>Presupuesto</a>
            
            <!--======= NUEVO PRESUPUESTO  =======-->
            <a id="ACCNUEVO_PRESUPUESTO" onclick="ventanaNuevoPresupuesto()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Nuevo Presupuesto</a>
            
            <!--======= ACTUALIZAR PRESUPUESTO =======-->
            <a id ="ACCACTUALIZAR_PRESUPUESTO"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Actualizar Presupuesto</a>
            
            <!--======= CAMBIAR ESTADO PRESUPUESTO  =======-->
            <a id="ACCCAMBIAR_ESTADO_PRESUPUESTO" onclick="ventanaCambiarEstadoPresupuesto()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Cambiar estado Presupuesto</a>
            
            <!--======= BUSCAR PRESUPUESTO  =======-->
            <a id="ACCBUSCAR_PRESUPUESTO" onclick="ventanaBuscarPresupuesto()" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Buscar Presupuesto</a>
            
            <!--======= FORMULA 1810 MAQUINAS    =======-->
            <a id="ACCF1810" onclick="ventanaF1810()"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">F1810</a>
           
          <!--===========================
              MODULO ORDENES
          ============================--> 
          <a id="ORDENES" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-clipboard-list white-text mr-2"></i>Ordenes</a>
            
            <!--======= CREAR ORDEN  =======-->
            <a id="ACCCREAR_ORDEN" onclick="ventanaNuevaOrden()"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Crear Orden</a>
            
            <!--======= ACTUALIZAR  ORDEN =======-->
            <a id ="ACCACTUALIZAR_ORDEN"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Actualizar Orden</a>
            
            <!--======= CAMBIAR ESTADO ORDEN  =======-->
            <a id ="ACCCAMBIAR_ESTADO_ORDEN"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Cambiar Estado Orden</a>
            
            <!--======= REEEMPLAZAR ORDEN  =======-->
            <a id ="ACCREEMPLAZAR_ORDEN"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Reemplazar Orden</a>
            
            <!--======= SEGUIMIENTO ORDEN    =======-->
            <a id ="ACCSEGUIMIENTO_ORDEN"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Seguimiento Orden</a>
            
            <!--======= LISTAR ORDENES  =======-->
            <a id ="ACCLISTAR_ORDENES"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Listar Ordenes</a>
            
          <!--===========================
              MODULO PRODUCCION
          ============================--> 
          <a id="PRODUCCION" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-hammer white-text mr-2"></i>Producción</a>
            
            <!--======= SEGUIMIENTO PRODUCCION  =======-->
            <a id ="ACCSEGUIMIENTO_PRODUCCION"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Seguimiento Producción</a>
            
            <!--======= PROGRAMAR MAQUINAS =======-->
            <a id ="ACCPROGRAMAR_MAQUINAS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Programar Máquinas</a>
            
            <!--======= CONTROL DESPACHOS  =======-->
            <a id ="ACCCONTROL_DESPACHOS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Control Despachos</a>
           
          <!--===========================
              MODULO COSTOS
          ============================--> 
          <a id="COSTOS" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="far fa-lg fa-money-bill-alt white-text mr-2"></i>Costos</a>
            
            <!--======= CONTROL INSUMOS  =======-->
            <a id ="ACCCONTROL_INSUMOS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Control Insumos</a>
            
            <!--======= COSTOS MAQUINA =======-->
            <a id ="ACCCOSTOS_MAQUINA"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Máquina</a>
            
            <!--======= COSTOS ACABADOS  =======-->
            <a id ="ACCCOSTOS_ACABADOS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Acabados</a>
            
            <!--======= COSTOS TINTA  =======-->
            <a id ="ACCCOSTOS_TINTA"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Tinta</a>
            
            <!--======= LISTADO COSTOS    =======-->
            <a id ="ACCLISTADO_COSTOS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Listado Costos</a>
           
          <!--===========================
              MODULO CONTABILIDAD
          ============================--> 
          <a id="CONTABILIDAD" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-shopping-bag  white-text mr-2"></i>Contabilidad</a>
            
            <!--======= FACTURACION  =======-->
            <a id ="ACCFACTURACION"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Facturacion</a>
            
            <!--======= ARQUEO DE CAJA  =======-->
            <a id ="ACCARQUEO"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Arqueo de Caja</a>
            
            <!--======= NOTA DE DEBITO/CREDITO =======-->
            <a id ="ACCNOTA"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Nota de Debito/Credito</a>
            
            <!--======= LETRAS  =======-->
            <a id ="ACCLETRA"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Letras</a>
            
            <!--======= GUIA DE REMISION  =======-->
            <a id ="ACCGUIA"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Guía de Remisión</a>
            
            <!--======= RECIBOS ADICIONALES    =======-->
            <a id ="ACCRECIBO"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Recibos adicionales</a>
            
            <!--======= FINANZAS  =======-->
            <a id ="ACCFINANZAS"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Finanzas</a>
            
        </div>
    </div>
    <!--XXXXXXXXXXXX FIN BARRA LATERAL IZQUIERDA XXXXXXXXXXXXXXXXXXX-->