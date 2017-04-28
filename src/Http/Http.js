const requestPromise = require("request-promise");


module.exports = class Http {

    private requestPromise;

    constructor() {

        this.requestPromise = requestPromise;

    }

    public get(...args) {

        return this.requestPromise.get(args);
    }

};