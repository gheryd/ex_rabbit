var amqp = require('amqplib');


const createHandler = (channel, callback) => (msg) => {
    if( msg!==null){
        console.log(`[receiveMQ] received message:\n`, msg);
        const content = msg.content.toString();
        console.log("[receiveMQ] content:", content);
        channel.ack(msg);
        callback(content);
    }else {
        console.warn("[receiveMQ] msg is null");
    }
};


module.exports = async function(url, queue, callback){
    let q = queue;
    try{
        let conn = await amqp.connect(url);
        var channel = await conn.createChannel();
        var ok = await channel.assertQueue(q);
        channel.consume(q, createHandler(channel, callback));
    }catch(err){
        console.error("[receiveMQ] catch error from receiveMQ", err);
    }

};