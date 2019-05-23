//const axios = require("axios");
const redis = require("redis")
const ModelMessage = require('ModelMessage');

module.exports = class ModelMessageReddis extends ModelMessage{


    constructor (redisHost, redisPort=6379){
        this.client = redis.createClient({
            host: redisHost, 
            port: redisPort
        });
    }

    async add(message, host, queue) {
        // TODO send to redis
        //return this.client.post('/messages', { message, host, queue, date: new Date()}).then(res => res.data);
    }

    async getAll(){
        // TODO call redis
        //return this.client.get('/messages').then(res=> res.data);
    }

}