<?php

require_once "../../config.php";


$message = $_POST['message'];


// ---------------------------------------------------


$url = DB_HOST.":".DB_PORT."/service/send_message";

$payload = json_encode([ 
        "message" => $message, 
        "host" => HOST, 
        "queue" => MQ_QUEUE, 
        "date" => date()
]);

sendMessageMQ($message);
sendReq($url, 'POST', $payload);

echo $result;