<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR ORDEN

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA ORDEN
===========================================*/

class Model_Orden{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: CARGAR MAQUINAS
    ===========================================*/

    
    public function mostrarMaquinas() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAQUINA.MAQUICODIGO , MAQUINA.MAQUINOMBRE FROM AREA_MAQUINA INNER JOIN MAQUINA ON AREA_MAQUINA.AREAMAQCODIGO=MAQUINA.AREAMAQCODIGO WHERE AREA_MAQUINA.AREAMAQCODIGO='TIM07' OR AREA_MAQUINA.AREAMAQCODIGO='TIM10'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    

    
}

?>