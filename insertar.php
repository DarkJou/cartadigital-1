<?php
session_start();
if(($_SESSION[""])!= ''){
    include 'conexion.php';
    $var2 =$_POST['img'];
    $var3 =$_POST['nombre'];
    $var4 =$_POST['precio'];

    $sentencia = "insert into carta_virtual.datos values ('"$var2"', '"$var3"', '"$var3"')";
    mysqli_query($conexion, $sentencia) or die (mysqli_error());
    header("Location: visualizar_ui.php");
}
else{
    header("Location: index.html");
}
?>