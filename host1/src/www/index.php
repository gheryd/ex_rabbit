<?php

define('VENDOR_PATH', __DIR__."/../vendor");

require_once VENDOR_PATH."/autoload.php";
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPStreamConnection('host_rmq', 5672, 'guest', 'guest');
$channel = $connection->channel();
$channel->queue_declare('hello', false, false, false, false);
$msg = new AMQPMessage('Hello World!');
$channel->basic_publish($msg, '', 'hello');
$channel->close();
$connection->close();
?>
<pre>
<?php

echo " [x] Sent 'Hello World!'\n";
echo "<b>host</b>: host1\n";

?>
</pre>