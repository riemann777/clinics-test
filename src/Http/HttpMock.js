const Promise = require("bluebird");

module.exports = class HttpMock {

    get() {

        return Promise.resolve(this.response);
    }
};