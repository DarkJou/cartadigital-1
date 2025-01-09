<?php
$conexion=mysqli_init();
mysqli_ssl_set($conexion,NULL,NULL,"ssl/BaltimoreCyberTrustRoot.crt.pem",NULL,NULL);
mysqli_real_connect($conexion,"server-pagina1.mysql.database.azure.com","administrador","Darkjou19","carta_virtual",3306, MYSQLI_CLIENT_SSL) or die
("Error al conectar " . mysqli_error());
?>