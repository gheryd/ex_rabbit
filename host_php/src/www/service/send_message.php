<?php

require_once "../../config.php";


$message = $_POST['message'];


// ---------------------------------------------------


$url = DB_HOST.":".DB_PORT."/messages";

$dbRow = [ 
        "message" => $message, 
        "host" => HOST, 
        "queue" => MQ_QUEUE, 
        "date" => date("Y-m-d H:i:s")
];

$payload = http_build_query($dbRow);

sendMessageMQ($message);
sendReq($url, 'POST', $payload);

echo json_encode(['sent'=>$dbRow]);