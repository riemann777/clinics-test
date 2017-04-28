

module.exports = class RoutesProvider {

    constructor(routes) {

        this.routes = routes;
    }

    get() {

        return this.routes;

    }

};