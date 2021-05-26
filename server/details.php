<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

if(!isset($_POST)) die();

session_start();

$conn = mysqli_connect('localhost', 'root', '', 'projekt');

$id = mysqli_real_escape_string($conn, $_POST['id']);

$query = "SELECT * FROM products WHERE id=$id";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0) {
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $outp .= '{"id":"'  . $rs["ID"] . '",';
        $outp .= '"Title":"'  . $rs["title"] . '",';
        $outp .= '"Artist":"'   . $rs["artist"]        . '",';
        $outp .= '"ReleaseDate":"'. $rs["releaseDate"]         . '",';
        $outp .= '"Price":"'   . $rs["price"]        . '",';
        $outp .= '"Quantity":"'. $rs["quantity"]     . '"}';
    }
    $outp ='{"record":['.$outp.']}';
    $response['dane'] = $query;
} else {
    $response['dane'] = $query;
    $response['status'] = 'error';
}

$conn->close();

echo($outp);
?>