const webServer = require('./web');
const sendMQ = require('./sendMQ');
const receiveMQ = require('./receiveMQ');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';
const URL_RABBIT = 'amqp://host_rmq';
const QUEUE_RABBIT = 'hello';

webServer(HOST, PORT, async function(msg){
    try{
        let r = await sendMQ(URL_RABBIT, QUEUE_RABBIT, msg);
        return {result:'ok', message: msg};
    }catch(error){
        return {result:'ko', message: msg, error: error.message};
    }
});

 
receiveMQ(URL_RABBIT, QUEUE_RABBIT);