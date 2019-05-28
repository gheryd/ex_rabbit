const webServer = require('./web');
const sendMQ = require('./sendMQ');
const receiveMQ = require('./receiveMQ');

const ModelMessageReddis = require('./ModelMessageReddis');

console.log('Environment Params:', process.env);

const reddisKeyname = 'message logs';
const messageModel = new ModelMessageReddis(process.env.REDIS_HOST, process.env.REDIS_PORT, reddisKeyname, (err)=>{
    console.error("Error from ModelMessageReddis:", err);
});


webServer(process.env.WEB_HOST, process.env.WEB_PORT, messageModel, async function(msg){
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
        await messageModel.add(content, process.env.HOST, process.env.MQ_QUEUE);
    }catch(error){
        console.error("error receiveMQ callback", error.message);
    }
});