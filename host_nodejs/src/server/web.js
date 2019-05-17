const express = require('express');


module.exports = function(host, port, messageModel, sendMessageCallback){
    const app = express();

    
    //app.use(express.json());
    
    app.use( (req, res, next)=>{
        console.log(`---------> req url: ${req.url}`);
        next();
    } );
    
    app.use( express.static(__dirname+'/public') );
    app.use( express.urlencoded() );

    app.get('/service/get_messages', async (req, res) => {
       const messages = await messageModel.getAll();
       res.send( messages );
    });

    app.post('/service/send_message', async (req, res) => {
        let message = req.body.message;
        var obj = sendMessageCallback(message);
        res.send( obj );    
    });

    app.listen(port, host);

    console.log(`Running on http://${host}:${port}`)

};



