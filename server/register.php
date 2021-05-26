<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'projekt');

$username = mysqli_real_escape_string($con, $_POST['username']);
$password = mysqli_real_escape_string($con, $_POST['password']);

$sql = "INSERT INTO `users` (username, password) VALUES ('$username', '$password')";
$query = "SELECT * FROM `users` WHERE username='$username' AND password='$password'";

$result = mysqli_query($con, $sql);
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) > 0) {
    $response['status'] = 'registered';
} else {
    $response['status'] = 'error';
}

echo json_encode($response);

$con->close();
?>