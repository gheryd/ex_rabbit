<?php

require_once "config.php";


$message = $_POST['message'];


// ---------------------------------------------------

$dbRow = [ 
        "message" => $message, 
        "host" => HOST, 
        "queue" => MQ_QUEUE, 
        "date" => date("Y-m-d H:i:s")
];

$payload = http_build_query($dbRow);

sendMessageMQ($message);
//sendReq($url, 'POST', $payload);
$redis = new Predis\Client([
        'scheme' => 'tcp',
        'host' => REDIS_HOST,
        'port' => REDIS_PORT
]);

try{
        $redis->rpush('message logs', json_encode($dbRow));
        echo json_encode(['sent'=>$dbRow]);

}catch(Predis\Connection\ConnectionException $e){
        error_log($e);
        echo json_encode(['error'=>$ex->getMessage()]);
}

