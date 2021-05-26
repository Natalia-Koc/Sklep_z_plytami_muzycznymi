<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

if(!isset($_POST)) die();

session_start();

$response = [];

$con = mysqli_connect('localhost', 'root', '', 'projekt');

$title = mysqli_real_escape_string($con, $_POST['title']);
$artist = mysqli_real_escape_string($con, $_POST['artist']);
$releaseDate = mysqli_real_escape_string($con, $_POST['releaseDate']);
$price = mysqli_real_escape_string($con, $_POST['price']);
$quantity = mysqli_real_escape_string($con, $_POST['quantity']);

$sql = "INSERT INTO `products` (title, artist, releaseDate, price, quantity) VALUES ('$title', '$artist', '$releaseDate', $price, $quantity)";
$query = "SELECT * FROM `products` WHERE title='$title' AND artist='$artist'";

$result = mysqli_query($con, $sql);
$result = mysqli_query($con, $query);

if(mysqli_num_rows($result) > 0) {
    $response['status'] = 'saved';
} else {
    $response['status'] = 'error';
    $response['dane'] = $sql;
}

echo json_encode($response);

$con->close();
?>