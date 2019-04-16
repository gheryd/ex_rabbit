const axios = require("axios");

module.exports = class ModelMessage {
    
    
    constructor(host, port) {
        this.client = axios.create({
            baseURL: host + ":" + port,
            timeout: 20000
        });
    }


    async add(message, host, queue) {
        return this.client.post('/messages', { message, host, queue }).then(res => {
            return res.data;
        });
    }


}