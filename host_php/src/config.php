<?php

define('BASE_PATH', __DIR__);
define('PUBLIC_PATH', BASE_PATH.'/www');
define('VENDOR_PATH', __DIR__."/vendor");

define('DB_HOST', $_ENV['DB_HOST']);
define('DB_PORT', $_ENV['DB_PORT']);
define('MQ_HOST', $_ENV['MQ_HOST']);
define('MQ_QUEUE', $_ENV['MQ_QUEUE']);
define('MQ_PORT', $_ENV['MQ_PORT']);
define('MQ_USER', $_ENV['MQ_USER']);
define('MQ_PASSWORD', $_ENV['MQ_PASSWORD']);
define('HOST', $_ENV['HOST']);


require_once VENDOR_PATH."/autoload.php";
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

/**
 * @param string $message
 */
function sendMessageMQ($message){
    $connection = new AMQPStreamConnection(MQ_HOST, MQ_PORT, MQ_USER, MQ_PASSWORD);
    $channel = $connection->channel();
    $channel->queue_declare(MQ_QUEUE, false, true, false, false);
    $msg = new AMQPMessage($message);
    $channel->basic_publish($msg, '', MQ_QUEUE);
    $channel->close();
    $connection->close();
}


function sendReq($url, $method, $payload, $timeout=10, array $headerList=[] ){
    $headerStr = implode("\r\n", [
        "Content-type:application/x-www-form-urlencoded"
    ]);
    
    $contextCfg = [
        'ignore_errors' => true,
        'method' => $method,
        'content' => $payload,
        'header' => $headerStr,
        'timeout' => $timeout
    ];

    $context = stream_context_create([ 'http' => $contextCfg ]);

    $result = file_get_contents($url, false, $context);
}