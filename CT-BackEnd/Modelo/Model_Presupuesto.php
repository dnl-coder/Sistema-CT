<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR PRESUPUESTO

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO PRESUPUESTO
===========================================*/

class Model_Presupuesto{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: REGISTRAR DATOS COTIZACION
    ===========================================*/

    public function registrarDatosCotizacion($code,$dato1,$dato2,$dato3,$dato4,$dato6,$dato7,$dato8,$dato9 ,$dato10,$dato11,$dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,$dato29,$dato30,$dato31,$dato32) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalle_presupuesto` VALUES ('".$code."', '".$dato1."', '".$dato2."', '".$dato3."', '".$dato4."','".$dato6."', '".$dato7."', '".$dato8."', '".$dato9."', '".$dato10."', '".$dato11."', '".$dato12."', '".$dato13."', '".$dato14."', '".$dato15."', '".$dato16."', '".$dato17."', '".$dato18."', '".$dato19."', '".$dato20."', '".$dato21."', '".$dato22."', '".$dato23."', '".$dato24."', '".$dato25."', '".$dato26."', '".$dato27."', '".$dato28."', '".$dato29."', '".$dato30."', '".$dato31."', '".$dato32."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS PRECIOS
    ===========================================*/

    public function registrarDatosPrecios($code,$total1,$total2,$total3,$total4,$total5,$rango1,$rango2,$rango3,$rango4 ,$precios1,$precios2,$precios3,$precios4,$precios5,$precios6,$precios7,$precios8,$precios9){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `precio_presupuesto` VALUES ('".$code."', '".$total1."', '".$total2."', '".$total3."', '".$total4."', '".$total5."', '".$rango1."', '".$rango2."', '".$rango3."', '".$rango4."', '".$precios1."', '".$precios2."', '".$precios3."', '".$precios4."', '".$precios5."', '".$precios6."', '".$precios7."', '".$precios8."', '".$precios9."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS PRESUPUESTO
    ===========================================*/

    public function registrarDatosPresupuesto($code,$cliente,$vendedor,$fecha,$cantItem) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `presupuesto` (`PRESUPNUMERO`, `CLIENCODIGO`, `PRESUPFECHA_REGISTRO`, `ESTCODIGO`, `PRESUPVENDEDOR`, `PRESUPCANT_ITEM`) VALUES ('".$code."', '".$cliente."', '".$fecha."', '14', '".$vendedor."', '".$cantItem."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS ITEM
    ===========================================*/

    public function registrarDatosItem($code,$descripcion,$monto,$codeC,$codeP,$codePresup) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `item_presupuesto` (`ITPRESUCODIGO`, `ITPRESUDESCRIPCION`, `ITPRESUIMPORTE`, `DETPRESUPCODIGO`, `PRECIOPRESUPCODIGO`, `PRESUPNUMERO`) VALUES ('".$code."', '".$descripcion."', '".$monto."', '".$codeC."', '".$codeP."', '".$codePresup."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: LISTAR PPTOS
    ===========================================*/

    public function mostrarTodos() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `item_presupuesto` ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/

    public function mostrarEstados() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ESTADO WHERE ESTCODIGO=14 OR ESTCODIGO=15; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR PRESUPUESTO
    ===========================================*/

    public function validarPresupuesto($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, P.ESTCODIGO as ESTADO,L.PERSNOMBRE,L.PERSAPELLIDO_PATERNO,L.PERSAPELLIDO_MATERNO,C.*,R.* , D.* ,O.* FROM PRESUPUESTO P INNER JOIN CLIENTE C ON P.CLIENCODIGO=C.CLIENCODIGO INNER JOIN item_presupuesto R ON R.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN detalle_presupuesto D ON D.DETPRESUPCODIGO=R.DETPRESUPCODIGO INNER JOIN personal L ON L.PERSCODIGO=P.PRESUPVENDEDOR INNER JOIN PRECIO_PRESUPUESTO O ON O.PRECIOPRESUPCODIGO=R.PRECIOPRESUPCODIGO WHERE P.PRESUPNUMERO='" . $codigo . "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR ESTADO DEL PRESUPUESTO
    ===========================================*/

    public function actualizarestadoPresupuesto($estado) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE PRESUPUESTO SET ESTCODIGO= 15 WHERE PRESUPNUMERO='".$estado."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }

    /*===========================================
        CONSULTA: MOSTRAR DATOS X CODIGO DEL PRESUPUPUESTO
    ===========================================*/

    public function mostrarTodoXCodigo($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.*  FROM ITEM_PRESUPUESTO I INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=I.PRESUPNUMERO WHERE I.PRESUPNUMERO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL PRESUPUESTO X CLIENTE
    ===========================================*/

    public function mostrarTodoXCliente($cliente) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.* FROM ITEM_PRESUPUESTO I INNER JOIN  PRESUPUESTO P ON I.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO WHERE C.CLIENNOMBRE_CORTO LIKE '%".$cliente."%'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL PRESUPUESTO X VENDEDOR
    ===========================================*/

    public function mostrarTodoXVendedor($vendedor){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.* FROM ITEM_PRESUPUESTO I INNER JOIN PRESUPUESTO P ON I.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN PERSONAL V ON V.PERSCODIGO=P.PRESUPVENDEDOR WHERE V.PERSNOMBRE LIKE '%".$vendedor."%'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
      
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS PRESUPUESTO MEDIANTE EL NUMERO DE PRESUPUESTO
    ==========================================================================*/

    public function mostrarDatosPresupuesto($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.PRESUPNUMERO, P.PRESUPVENDEDOR, C.CLIENCODIGO FROM PRESUPUESTO P INNER JOIN CLIENTE C ON (P.CLIENCODIGO=C.CLIENCODIGO) WHERE P.PRESUPNUMERO='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS DE LOS PRESUPUESTO DEL CLIENTE POR SU CODIGO
    ==========================================================================*/

    public function mostrarPresupuestoCliente($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.PRESUPNUMERO, C.CLIENCODIGO FROM CLIENTE C INNER JOIN PRESUPUESTO P ON C.CLIENCODIGO=P.CLIENCODIGO WHERE C.CLIENCODIGO='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
}

?>