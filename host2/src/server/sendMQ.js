//var amqp = require('amqplib/callback_api');
var amqp = require('amqplib');


module.exports = async function(url, queue, msg){
    
    var q = queue;

    console.log(`call url MQ: ${url} , queue: ${queue}` );

    try{
      var conn = await amqp.connect(url);
      var channel = await conn.createChannel();
      var ok = await channel.assertQueue(q);
      console.log("assertQueue", ok);
      var send = await channel.sendToQueue(q, Buffer.from(msg));
      return send;

    }catch(err){
      console.error("catch error from sendMQ");
      throw err;
    }
  
};
