-- *****************************************************
-- Entidad Registro de Cliente [CLIEN]
-- *****************************************************

DROP TABLE IF EXISTS `CLIENTE`;
CREATE TABLE IF NOT EXISTS `CLIENTE` (
    `CLIENCODIGO` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO DEL CLIENTE',
    `CLIENRAZON_SOCIAL` varchar(70) NOT NULL COMMENT 'NOMBRE DEL CLIENTE',
    `CLIENNOMBRE_CORTO` varchar(20) NOT NULL COMMENT 'ACRONIMO DEL CLIENTE',
    `CLIENFECHA_REGISTRO` datetime NOT NULL COMMENT 'FECHA DEL REGISTRO',
    `CLIENTIPIDEN` varchar(15) NOT NULL COMMENT 'TIPO DE IDENTIFICACION DEL CLIENTE',
    `CLIENNUM_IDENTIFICACION` bigint(11) NOT NULL COMMENT 'RUC/LE/PAS DEL CLIENTE',
    `CLIENDOMICILIO` varchar(250) NOT NULL COMMENT 'DOMICILIO DEL CLIENTE',
    `DISTRCODIGO` int(11) NOT NULL COMMENT 'DISTRITO DEL CLIENTE',
    `CLIENTELEFONO1` varchar(11) NULL COMMENT 'TELEFONO 1 DEL CLIENTE',
    `CLIENTELEFONO2` varchar(11) NULL COMMENT 'TELEFONO 2 DEL CLIENTE',
    `CLIENANEX_TELEFONO` varchar(11) NULL COMMENT 'ANEXO DEL TELEFONO',
    `CLIENTIPO` varchar(50) NOT NULL COMMENT 'TIPO DE CLIENTE',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'ESTADO DEL CLIENTE',
    `EMPCODIGO` varchar(2) NOT NULL COMMENT 'EMPRESA ASIGNADA AL CLIENTE',
    `CLIENNOMBRE_CONTACTO` varchar(250) NULL COMMENT 'NOMBRE DEL CONTACTO',
    `CLIENCARGO_CONTACTO` varchar(250) NULL COMMENT 'CARGO DEL CONTACTO',
    `CLIENGIRO_EMPRESA` varchar(250) NULL COMMENT 'ACTIVIDAD DE LA EMPRESA',
    `CLIENCORREO_CONTACTO` varchar(250) NULL COMMENT 'CORREO ELECTRONICO DEL CONTACTO',
    `CLIENVENDEDOR` varchar(250) NOT NULL COMMENT 'NOMBRE DEL VENDEDOR ASIGNADO',
    `CLIENCREDITO` decimal(10,3) NULL COMMENT 'CREDITO DEL CLIENTE',
    `CLIENMONEDA` varchar(10) NULL COMMENT 'TIPO DE MONEDA',
    `CLIENDEUDA` decimal(10,3) NULL COMMENT 'DEUDA DEL CLIENTE. EN DOLARES',
    `CLIENPLAZO_PAGO` int(11) NULL COMMENT 'PLAZO DEL PAGO',
    `CLIENFORMPAGO` varchar(50) NULL COMMENT 'FORMA DE PAGO',
    `CLIENTIPCOMPROB` varchar(50) NULL COMMENT 'TIPO DE COMPROBANTE',
    `CLIENOBSERVACION` text COMMENT 'OBSERVACIONES DEL CLIENTE',
    
    PRIMARY KEY (`CLIENCODIGO`),
    UNIQUE KEY `U_CLIENRAZON_SOCIAL` (`CLIENRAZON_SOCIAL`) USING BTREE,
    UNIQUE KEY `U_CLIENNOMBRE_CORTO` (`CLIENNOMBRE_CORTO`) USING BTREE,
    UNIQUE KEY `U_CLIENNUM_IDENTIFICACION` (`CLIENNUM_IDENTIFICACION`) USING BTREE

) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE CLIENTES (CLIEN)';

COMMIT;


-- *****************************************************
-- Entidad Registro de Empresa [EMP]
-- *****************************************************

DROP TABLE IF EXISTS `EMPRESA`;
CREATE TABLE IF NOT EXISTS `EMPRESA` (
    `EMPCODIGO` varchar(2) NOT NULL COMMENT 'CODIGO DE LA EMPRESA',
    `EMPDESCRIPCION` varchar(250) NOT NULL COMMENT 'NOMBRE DE LA EMPRESA',
    `EMPDOMICILIO` varchar(250) NOT NULL COMMENT 'DOMICILIO DE LA EMPRESA',
    `EMPFAX` int(11) NULL COMMENT 'NUMERO DE FAX DE LA EMPRESA',
    `EMPTELEFONO1` int(11) NOT NULL COMMENT 'TELEFONO 1 DE LA EMPRESA',
    `EMPTELEFONO2` int(11) NULL COMMENT 'TELEFONO 2 DE LA EMPRESA',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'ESTADO DE LA EMPRESA',
    `EMPRUC` int(11) NOT NULL COMMENT 'RUC DE LA EMPRESA',
    `EMPNUM_FACTURA` int(11) NULL COMMENT 'NUMERO DE FACTURAS DE LA EMPRESA',
    `EMPSERIE_FACTURA` int(11) NULL COMMENT 'SERIE DE FACTURA DE LA EMPRESA',
    `EMPNUM_BOLETA` int(11) NULL COMMENT 'BOLETAS DE LA EMPRESA',
    `EMPSERIE_BOLETA` int(11) NULL COMMENT 'SERIE DE BOLETA DE LA EMPRESA',
    `EMPORDEN_SERVICIO` int(11) NULL COMMENT 'ORDEN DEL SERVICIO',
    `EMPLETRA` int(11) NULL COMMENT 'NUMERO DE LETRAS EMITIDAS',
    `EMPNOTA_DEBITO` int(11) NULL COMMENT 'CANTIDAD DE NOTA DE DEBITO',
    `EMPSERIE_NOTA_DEBITO` int(11) NULL COMMENT 'SERIE DE LA NOTA DE DEBITO',
    `EMPNOTA_CREDITO` int(11) NULL COMMENT 'CANTIDAD DE NOTA DE CREDITO',
    `EMPSERIE_NOTA_CREDITO` int(11) NULL COMMENT 'SERIE DE LA NOTA DE CREDITO',
    `EMPNUM_GUIA` int(11) NULL COMMENT 'CANTIDAD DE GUIAS DE REMISION',
    `EMPSERIE_GUIA` int(11) NULL COMMENT 'SERIE DE LA GUIA',
    `EMPCAJA_CHICA` int(11) NULL COMMENT 'CANTIDAD DE LA CAJA CHICA',
    `EMPCAJA_GRANDE` int(11) NULL COMMENT 'CANTIDAD DE LA CAJA GRANDE',

    PRIMARY KEY (`EMPCODIGO`),
    UNIQUE KEY `U_EMPDESCRIPCION` (`EMPDESCRIPCION`) USING BTREE,
    UNIQUE KEY `U_EMPRUC` (`EMPRUC`) USING BTREE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE LA EMPRESA (EMP)';


-- *****************************************************
-- Entidad Registro de Bancos [BANC]
-- *****************************************************


DROP TABLE IF EXISTS `BANCO`;
CREATE TABLE IF NOT EXISTS `BANCO` (
    `BANCCODIGO` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO DEL BANCO',
    `BANCDESCRIPCION` varchar(250) NOT NULL COMMENT 'NOMBRE DEL BANCO',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'ESTADO DEL BANCO',

    PRIMARY KEY (`BANCCODIGO`),
    UNIQUE KEY `BANCDESCRIPCION` (`BANCDESCRIPCION`)
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE LOS BANCOS (BANC)';


   
-- *****************************************************
-- Entidad Registro de Personal [PERS]
-- *****************************************************


DROP TABLE IF EXISTS `PERSONAL`;
CREATE TABLE IF NOT EXISTS `PERSONAL` (
    `PERSCODIGO` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO DEL PERSONAL',
    `PERSFECHA_REGISTRO` datetime NOT NULL COMMENT 'FECHA DEL REGISTRO',
    `PERSTIPIDEN` varchar(15) NOT NULL COMMENT 'TIPO DE IDENTIFICACION DEL PERSONAL',
    `PERSNUM_IDENTIFICACION` varchar(11) NOT NULL COMMENT 'NUMERO DE IDENTIFICACION DEL PERSONAL',
    `PERSNOMBRE` varchar(250) NOT NULL COMMENT 'NOMBRE DEL PERSONAL',
    `PERSAPELLIDO_PATERNO` varchar(250) NOT NULL COMMENT 'APELLIDO PATERNO DEL PERSONAL',
    `PERSAPELLIDO_MATERNO` varchar(250) NOT NULL COMMENT 'APELLIDO MATERNO DEL PERSONAL',
    `PERSTELEFONO1` varchar(11) NOT NULL COMMENT 'TELEFONO 1 DEL PERSONAL',
    `PERSTELEFONO2` varchar(11) NULL COMMENT 'TELEFONO 2 DEL PERSONAL',
    `PERSGENERO` varchar(11) NOT NULL COMMENT 'GENERO DEL PERSONAL',
    `PERSFECHA_NACIMIENTO` date NOT NULL COMMENT 'FECHA DE NACIMIENTO DEL PERSONAL',
    `PERSFECHA_INGRESO` date NOT NULL COMMENT 'FECHA DE INGRESO DEL PERSONAL',
    `PERSCORREO` varchar(250) NULL COMMENT 'CORREO ELECTRONICO DEL PERSONAL',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'ESTADO DEL PERSONAL',
    `EMPCODIGO` varchar(2) NOT NULL COMMENT 'NOMBRE DE LA EMPRESA ASIGNADA',
    `AREACODIGO` varchar(2) NOT NULL COMMENT 'AREA DE TRABAJO ASIGNADA',
    `PERSESPECIALIDAD` varchar(250) NULL COMMENT 'ESPECIALIDAD DEL PERSONAL',
    `PERSFOTO` varchar(250) NULL COMMENT 'FOTO DEL PERSONAL',
    `PERSTIPHORARIO` varchar(20) NOT NULL COMMENT 'TIPO DE HORARIO DEL PERSONAL',
    `PERSTURNO` varchar(20) NOT NULL COMMENT 'TURNO DE TRABAJO DEL PERSONAL',
    `PERSDOMICILIO` varchar(250) NULL COMMENT 'DOMICILIO DEL PERSONAL',
    `DISTRCODIGO` int(11) NOT NULL COMMENT 'DISTRITO DEL PERSONAL',
    `USUACODIGO` varchar(4) NOT NULL COMMENT 'CODIGO DE USUARIO',
    `PERSCONDICION_LABORAL` varchar(20) NOT NULL COMMENT 'CONDICIONAL LABORAL DEL PERSONAL',
    
    PRIMARY KEY (`PERSCODIGO`),
    UNIQUE KEY `U_PERSNUM_IDENTIFICACION` (`PERSNUM_IDENTIFICACION`) USING BTREE

    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE PERSONAL (PERS)';



-- *****************************************************
-- Entidad Registro de Servicio [SERV]
-- *****************************************************


DROP TABLE IF EXISTS `servicio`;
CREATE TABLE IF NOT EXISTS `servicio` (
    `SERVCODIGO` varchar(20) NOT NULL COMMENT 'CODIGO DEL SERVICIO',
    `SERVDESCRIPCION` varchar(250) NOT NULL COMMENT 'NOMBRE DEL SERVICIO',
    `SERVCALCULO_LINEAL` varchar(2) NOT NULL COMMENT 'CALCULO LINEAL DEL SERVICIO',
    `SERVANCHO` decimal(10,2) NULL COMMENT 'ANCHO DEL SERVICIO',
    `SERVPRECIO_UNITARIO` decimal(10,5) NOT NULL COMMENT 'PRECIO UNITARIO DEL SERVICIO',
    `SERVTIPO` varchar(20) NOT NULL COMMENT 'TIPO DE SERVICIO',
    `SERVFACTOR` decimal(10,5) NULL COMMENT 'FACTOR DE SERVICIO',
    `SERVMONEDA` varchar(10) NOT NULL COMMENT 'TIPO DE MONEDA',
    `SERVDESCUENTO` decimal(10,2) NULL COMMENT 'DESCUENTO DEL SERVICIO',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'CODIGO DEL ESTADO DEL SERVICIO',
    `SUBFAMCODIGO` varchar(5) NOT NULL COMMENT 'CODIGO DE LA SUB-FAMILIA',
    `SERVPRECIO_PAPEL` decimal(10,3) NULL COMMENT 'PRECIO DE PAPEL DEL SERVICIO',
    
    PRIMARY KEY (`SERVCODIGO`),
    UNIQUE KEY `U_SERVDESCRIPCION` (`SERVDESCRIPCION`) USING BTREE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE SERVICIO (SERV)';



-- *****************************************************
-- Entidad Registro de Maquina [MAQUI]
-- *****************************************************



DROP TABLE IF EXISTS `MAQUINA`;
CREATE TABLE IF NOT EXISTS `MAQUINA` (
    `MAQUICODIGO` varchar(4) NOT NULL COMMENT 'CODIGO DE MAQUINA',
    `MAQUINOMBRE` varchar(250) NOT NULL COMMENT 'NOMBRE DE MAQUINA',
    `MAQUIDESCRIPCION` varchar(250) NOT NULL COMMENT 'DESCRIPCION DE MAQUINA',
    `MAQUICOSTO_HORA` decimal(10,3) NOT NULL COMMENT 'COSTO POR HORA DE LA MAQUINA',
    `AREAMAQCODIGO` varchar(5) NOT NULL COMMENT 'CODIGO DEL AREA DE LA MAQUINA',
    `ESTCODIGO` int(11) NOT NULL COMMENT 'ESTADO DE LA MAQUINA',

    PRIMARY KEY (`MAQUICODIGO`),
    UNIQUE KEY `U_MAQUINOMBRE` (`MAQUINOMBRE`) USING BTREE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE MAQUINA (MAQUI)';



-- *****************************************************
-- Entidad Registro de Usuario [USUA]
-- *****************************************************


DROP TABLE IF EXISTS `USUARIO`;
CREATE TABLE IF NOT EXISTS `USUARIO` (
    `USUACODIGO` varchar(4) NOT NULL COMMENT 'CODIGO DE USUARIO',
    `USUAUSUARIO` varchar(30) NOT NULL COMMENT 'NOMBRE DE USUARIO',
    `USUAPASSWORD` varchar(30) NOT NULL COMMENT 'CONTRASEÑA DEL USUARIO',
    `USUANIVEL` int(11) NOT NULL COMMENT 'NIVEL DE ACCESO DEL USUARIO',
    
    PRIMARY KEY (`USUACODIGO`),
    UNIQUE KEY `U_USUAUSUARIO` (`USUAUSUARIO`) USING BTREE
    
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE USUARIO (USUA)';


-- *****************************************************
-- Entidad Registro de Proveedor [PROVEED]
-- *****************************************************


DROP TABLE IF EXISTS `PROVEEDOR`;
CREATE TABLE IF NOT EXISTS `PROVEEDOR` (
    `PROVEEDCODIGO` varchar(5) NOT NULL COMMENT 'CODIGO DEL PROVEEDOR',
    `PROVEEDRAZON_SOCIAL` varchar(250) NOT NULL COMMENT 'NOMBRE DEL PROVEEDOR',
    `PROVEEDRUC` bigint(11) NULL COMMENT 'RUC DEL PROVEEDOR',
    `PROVEEDTELEFONO_EMPRESA` varchar(11) NULL COMMENT 'TELEFONO DE LA EMPRESA',
    `PROVEEDCONTACTO` varchar(250) NULL COMMENT 'NOMBRE DEL CONTACTO',
    `PROVEEDTELEFONO_CONTACTO` varchar(11) NULL COMMENT 'TELEFONO DEL CONTACTO',
    
    PRIMARY KEY (`PROVEEDCODIGO`),
    UNIQUE KEY `U_PROVEEDRAZON_SOCIAL` (`PROVEEDRAZON_SOCIAL`) USING BTREE
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE PROVEEDOR (PROVEED)';


-- *****************************************************
-- Entidad Registro de Item [ITEM]
-- *****************************************************


DROP TABLE IF EXISTS `ITEM`;
CREATE TABLE IF NOT EXISTS `ITEM` (
    `ITEMCODIGO` varchar(12) NOT NULL COMMENT 'CODIGO DEL ITEM',
    `DETACABCODIGO` varchar(3) NOT NULL COMMENT 'CODIGO DEL DETALLE ACABADO',
    `PPRENCODIGO` varchar(3) NOT NULL COMMENT 'CODIGO DE LA PREPRENSA',
    `OPCODIGO` int(11) NOT NULL COMMENT 'CODIGO DE LA ORDEN DE PRODUCCION',
    `ITEMNOMBRE` varchar(60) NOT NULL COMMENT 'NOMBRE O PALABRA CLAVE DEL ITEM',
    `ITEMDESCRIPCION` varchar(250) NOT NULL COMMENT 'DESCRIPCION DEL ITEM',
    `ITEMCANTIDAD` INT NOT NULL COMMENT 'CANTIDAD DEL PEDIDO DEL ITEM',
    `ITEMUNID_MEDIDA` varchar(30) NOT NULL COMMENT 'UNIDAD DE MEDIDA DEL ITEM',
    `ITEMIMPORTE` decimal(10,3) NOT NULL COMMENT 'IMPORTE PRESUPUESTADO DEL ITEM',
    `ITEMOBSERVACION` varchar(250) NOT NULL COMMENT 'OBSERVACION DEL ITEM',
    
    PRIMARY KEY (`ITEMCODIGO`)
    
) ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='REGISTRO DE ITEM (ITEM)';
COMMIT;

