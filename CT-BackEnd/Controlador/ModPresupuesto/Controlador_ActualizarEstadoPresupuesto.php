<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_estado'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $estado = $_POST['_estado'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->actualizarestadoPresupuesto($estado)){                        
        $msg =$Model_Presupuesto->actualizarestadoPresupuesto($estado);                        
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                        
        $msg = array(
            "response" => 0,
            "message" => "No existen datos"                    
            );                        
    }
    
// MENSAJE A MOSTRAR SI NO SE REALIZA LA CONSULTA    
    
}else{
    
   $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 

?>
