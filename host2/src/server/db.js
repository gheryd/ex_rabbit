const jsonServer = require('json-server');

module.exports = (port, dbFile) => {

    const server = jsonServer.create();
    console.log("-------------------->", dbFile);
    const router = jsonServer.router(dbFile);
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    
    server.listen(port, ()=>{
        console.log(`Json server is running on port ${port}`);
    });

};