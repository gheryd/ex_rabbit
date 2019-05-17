const axios = require("axios");

module.exports = class ModelMessage {
        
    constructor(dbhost, dbport) {
        this.client = axios.create({
            baseURL: dbhost + ":" + dbport,
            timeout: 20000
        });
    }

    async add(message, host, queue) {
        return this.client.post('/messages', { message, host, queue, date: new Date()}).then(res => res.data);
    }

    async getAll(){
        return this.client.get('/messages').then(res=> res.data);
    }

}