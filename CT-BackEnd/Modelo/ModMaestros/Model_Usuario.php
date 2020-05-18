<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR USUARIO

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO USUARIO
===========================================*/

class Model_Usuario{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL USUARIO
    ===========================================*/
    
    public function mostrarDatosUsuario($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, U.* FROM PERSONAL P INNER JOIN USUARIO U ON P.USUACODIGO= U.USUACODIGO WHERE P.PERSCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR REGISTRO USUARIO
    ===========================================*/

    public function validarUsuario($usuario) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT USUAUSUARIO FROM USUARIO WHERE USUAUSUARIO='".$usuario."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
  
    /*==================================================
        CONSULTA: ACTUALIZAR USUARIO
    ====================================================*/
    
    public function actualizarUsuario($codigo,$usuario, $password){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE `usuario` SET `USUAUSUARIO` = '" . $usuario . "', `USUAPASSWORD` = '" . $password . "' WHERE `usuario`.`USUACODIGO` = '".$codigo."' ; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==================================================
        CONSULTA: ACTUALIZAR USUARIO
    ====================================================*/
    
    public function mostrarAcceso($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="SELECT * FROM acceso A INNER JOIN usuario U ON A.USUACODIGO =U.USUACODIGO WHERE U.USUAUSUARIO='" .$codigo. "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: CREAR ACCESO
    ===========================================*/
    
    public function registrarAcceso($codigo,$acceso1,$acceso2,$acceso3,$acceso4,$acceso5,$acceso6,$acceso7 ,$acceso8,$acceso9,$acceso10,$acceso11,$acceso12,$acceso13,$acceso14,$acceso15,$acceso16,$acceso17,$acceso18,$acceso19,$acceso20,$acceso21,$acceso22,$acceso23,$acceso24,$acceso25,$acceso26,$acceso27,$acceso28,$acceso29,$acceso30,$acceso31,$acceso32,$acceso33,$acceso34){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `acceso` VALUES (NULL, '".$codigo."', '".$acceso1."', '".$acceso2."', '".$acceso3."', '".$acceso4."', '".$acceso5."', '".$acceso6."', '".$acceso7."', '".$acceso8."', '".$acceso9."', '".$acceso10."', '".$acceso11."', '".$acceso12."', '".$acceso13."', '".$acceso14."', '".$acceso15."', '".$acceso16."', '".$acceso17."', '".$acceso18."', '".$acceso19."', '".$acceso20."', '".$acceso21."', '".$acceso22."', '".$acceso23."', '".$acceso24."', '".$acceso25."', '".$acceso26."', '".$acceso27."', '".$acceso28."', '".$acceso29."', '".$acceso30."', '".$acceso31."', '".$acceso32."', '".$acceso33."', '".$acceso34."') ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR REGISTRO PERSONAL
    ===========================================*/

    public function validarPersonalPermisos($codeUser) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM acceso WHERE USUACODIGO='".$codeUser."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*================================================
        CONSULTA: ACTUALIZAR PERMISOS DE USUARIO
    ================================================*/
 
    
    public function actualizarPermisos($codigo,$acceso1,$acceso2,$acceso3,$acceso4,$acceso5,$acceso6,$acceso7,$acceso8,$acceso9,$acceso10,$acceso11,$acceso12,$acceso13,$acceso14,$acceso15,$acceso16,$acceso17,$acceso18,$acceso19,$acceso20,$acceso21,$acceso22,$acceso23,$acceso24,$acceso25,$acceso26,$acceso27,$acceso28,$acceso29,$acceso30,$acceso31,$acceso32,$acceso33,$acceso34){
        
        $sql="UPDATE acceso SET ACCCLIENTE='" .$acceso1. "', ACCSERVICIO='" .$acceso2. "', ACCEMPRESA='" .$acceso3. "', ACCMAQUINA='" . $acceso4 . "' , ACCBANCO='" . $acceso5 . "' , ACCPROVEEDOR='" . $acceso6 . "' ,  ACCPERSONAL='" . $acceso7 . "' ,  ACCUSUARIO = '" . $acceso8 . "' , ACCNUEVO_PRESUPUESTO='" . $acceso9 . "' , ACCACTUALIZAR_PRESUPUESTO='" . $acceso10 . "' , ACCCAMBIAR_ESTADO_PRESUPUESTO='" . $acceso11 . "' , ACCBUSCAR_PRESUPUESTO = '" . $acceso12 . "' , ACCF1810='" . $acceso13 . "' , ACCCREAR_ORDEN='" . $acceso14 . "' , ACCACTUALIZAR_ORDEN='" .$acceso15. "', ACCCAMBIAR_ESTADO_ORDEN='" . $acceso16 . "', ACCREEMPLAZAR_ORDEN='" . $acceso17 . "' , ACCSEGUIMIENTO_ORDEN ='" . $acceso18 . "' , ACCLISTAR_ORDENES='" . $acceso19 . "', ACCSEGUIMIENTO_PRODUCCION='" . $acceso20 . "', ACCPROGRAMAR_MAQUINAS ='".$acceso21."', ACCCONTROL_DESPACHOS ='".$acceso22."', ACCCONTROL_INSUMOS ='".$acceso23."',  ACCCOSTOS_MAQUINA='".$acceso24."', ACCCOSTOS_ACABADOS ='".$acceso25."',  ACCCOSTOS_TINTA='".$acceso26."', ACCLISTADO_COSTOS ='".$acceso27."', ACCFACTURACION='".$acceso28."', ACCARQUEO='".$acceso29."', ACCNOTA ='".$acceso30."', ACCLETRA ='".$acceso31."', ACCGUIA ='".$acceso32."', ACCRECIBO ='".$acceso33."' , ACCFINANZAS ='".$acceso34."' WHERE USUACODIGO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*==================================================
        CONSULTA: MOSTRAR PERMISOS DE USUARIO
    ====================================================*/
    
    public function mostrarPermisosUsuario($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="SELECT A.* FROM PERSONAL P INNER JOIN ACCESO A ON P.USUACODIGO=A.USUACODIGO WHERE P.PERSCODIGO='" .$variable. "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
}

?>