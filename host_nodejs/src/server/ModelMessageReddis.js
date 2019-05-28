//const axios = require("axios");
const redis = require("redis")
const ModelMessage = require('./ModelMessage');

module.exports = class ModelMessageReddis extends ModelMessage{


    constructor (host, port=6379, keyname, errorHandler=null){
        super();
        this.keyname = keyname;
        const options = {host, port};
        this.client = redis.createClient( options);
        if(errorHandler){

            this.client.on('error', (err)=>{
                errorHandler(err);
            });
        }
        
        
    }

    async add(message, host, queue) {
        return new Promise(
            (resolve, reject) => {
                console.log("Model: add promise...");
                this.client.rpush([this.keyname, JSON.stringify(
                    { message, host, queue, date: new Date()}
                )], (err, reply)=>{
                    if(err){
                        console.error("add promise, reject err:", err);
                        reject(err);
                    }else {
                        console.log("add promise, resolve reply:", reply);
                        resolve(reply);
                    }
                });
            }
        );
    }

    async getAll(){
        return new Promise(
            (resolve, reject) => {
                console.log("Model: add promise...");
                this.client.lrange(this.keyname, 0, -1, function(err, list){
                    if(err){
                        console.error("getAll promise, reject err:", err);
                        reject(err);
                    }else {
                        console.log("getAll promise, resolve list:", list);
                        const unserializedList = list.map(JSON.parse);
                        resolve(unserializedList);
                    }
                });
            }
        );
    }

    async clear(){
        return new Promise(
            (resolve, reject) => {
                console.log("Model: clear promise...");
                this.client.del(this.keyname, function(err, done){
                    if(err){
                        console.error("clear promise, reject error:", err);
                        reject(err);
                    }else {
                        console.log("getAll promise, resolve list:", done);
                        resolve(done);
                    }
                });
            }
        );
    }

}