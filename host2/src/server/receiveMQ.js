var amqp = require('amqplib');


const createHandler = (channel) => (msg) => {
      if( msg!==null){
          console.log(`[receiveMQ] received message:\n`, msg);
          console.log(msg.content.toString());
          channel.ack(msg);
      }else {
          console.warn("[receiveMQ] msg is null");
      }
  };


module.exports = async function(url, queue){
    let q = queue;
    try{
        let conn = await amqp.connect(url);
        var channel = await conn.createChannel();
        var ok = await channel.assertQueue(q);
        channel.consume(q, createHandler(channel));
    }catch(err){
        console.error("catch error from receiveMQ");
        throw err;
    }

};