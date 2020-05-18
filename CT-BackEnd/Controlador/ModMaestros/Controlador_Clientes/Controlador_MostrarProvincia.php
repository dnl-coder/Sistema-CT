<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();

if(isset($_POST['_pais'])){
    
    $variable = $_POST['_pais'];
    
    if($Model_Clientes->mostrarProvincia($variable)){
        
        $data = $Model_Clientes->mostrarProvincia($variable);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Provincias no encontradas"                      
            );  
    }
}else{
    
    $data = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($data);  

?>