const config = require("../../config.json").Server,
    routes = require("../Routes/routes"),
    Hapi = require("hapi"),
    Good = require('good'),
    _ = require("lodash");


module.exports = class Server {

    constructor(routesProvider) {

        this.routesProvider = routesProvider
        this.hapiServer = new Hapi.Server();

        this.config = config;

    }


    start(callback) {

        this.hapiServer.connection(this.config);

        this.hapiServer.register({
            register: Good,
            options: {
                reporters: {
                    console: [
                        {
                            module: "good-squeeze",
                            name: "Squeeze",
                            args: [{ response: "*", log: "*" }]
                        },
                        { module: "good-console" },
                        "stdout"
                    ]
                }
            }
        }, (error) => {

            if (error) {
                throw error;
            }

            this.initializeRoutes(this.hapiServer);
            this.hapiServer.start(callback);

        });
    }

    initializeRoutes(server) {

        _.each(this.routesProvider.get(), (routeDefinition) => {

            server.route(routeDefinition);

        });

    }

};