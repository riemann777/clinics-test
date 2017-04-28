const Hapi = require("hapi");

module.exports = class HapiProvder {

    get() {

        if (!this.hapiServer) {

            this.hapiServer = new Hapi.Server();
        }

        return this.hapiServer;
    }

};