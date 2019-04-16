const express = require('express');


module.exports = function(host, port, sendMessageCallback){
    const app = express();

    app.use( express.static(__dirname+'/public') );
    //app.use(express.json());
    app.use( express.urlencoded() );
    app.post('/service/send_message', async (req, res) => {
        console.log("-------------------->called send_message ajax service");
        let message = req.body.message;
        var obj = sendMessageCallback(message);
        res.send( obj );    
    });


    app.listen(port, host);

    console.log(`Running on http://${host}:${port}`)

};



