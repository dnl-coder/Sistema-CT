function NuevoPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/F1810.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function BuscarPresupuestos(presup,busc){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/F1810.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            var presupuesto = presup;
            var buscar = busc;
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarPresupuestos(client, nam){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/ListarPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            var cliente = client;
            var name = nam;
            clearInterval(intervalo)
        }  
    }); 
    
}