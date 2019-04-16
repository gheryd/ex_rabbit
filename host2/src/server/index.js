const webServer = require('./web');
const sendMQ = require('./sendMQ');
const receiveMQ = require('./receiveMQ');
const db = require('./db');
const ModelMessage = require('./ModelMessage');

console.log(process.env);

//process.env.DB_HOST
const message = new ModelMessage('http://host2', process.env.DB_PORT);


db(process.env.DB_PORT, process.env.DB_FILE);


webServer(process.env.WEB_HOST, process.env.WEB_PORT, async function(msg){
    try{
        let r = await sendMQ(process.env.MQ_URL, process.env.MQ_QUEUE, msg);
        return {result:'ok', message: msg};
    }catch(error){
        return {result:'ko', message: msg, error: error.message};
    }
});

 
receiveMQ(process.env.MQ_URL, process.env.MQ_QUEUE, async function(content){
    try{
        console.log("add message to db", content);
        await message.add(content, process.env.HOST, process.env.MQ_QUEUE);
    }catch(error){
        console.error("error receiveMQ cakkback", error.message);
    }
});