<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'projekt');

$id = mysqli_real_escape_string($con, $_POST['id']);

$sql = "DELETE FROM `products` WHERE id=$id";
$query = "SELECT * FROM `products` WHERE id=$id";

$result = mysqli_query($con, $sql);
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) == 0) {
    $response['status'] = 'deleted';
} else {
    $response['dane'] = $sql;
    $response['status'] = 'error';
}

echo json_encode($response);

$con->close();
?>