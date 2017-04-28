const requestPromise = require("request-promise"),
    _ = require("lodash");


module.exports = class Http {

    constructor() {

        this.requestPromise = requestPromise;

    }

    get(...args) {

        const uri = args[0];
        let options = { uri: uri };

        options = _.extend(options, args.slice(1));

        return this.requestPromise.get(options).then((response) => {

            return JSON.parse(response);
        });
    }

};