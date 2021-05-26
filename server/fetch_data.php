<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

if(!isset($_POST)) die();

session_start();

$conn = mysqli_connect('localhost', 'root', '', 'projekt');

$result = $conn->query("SELECT * from `products`");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
  if ($outp != "") {$outp .= ",";}
  $outp .= '{"id":"'  . $rs["ID"] . '",';
  $outp .= '"Title":"'  . $rs["title"] . '",';
  $outp .= '"Artist":"'   . $rs["artist"]        . '",';
  $outp .= '"ReleaseDate":"'. $rs["releaseDate"]         . '",';
  $outp .= '"Price":"'   . $rs["price"]        . '",';
  $outp .= '"Quantity":"'. $rs["quantity"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>
