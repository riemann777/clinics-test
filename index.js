const Server = require("./src/Server/Server"),
    routes = require("./src/Routes/routes"),
    RoutesProvider = require("./src/Server/RoutesProvider/RoutesProvider"),
    HapiProvider = require("./src/Server/HapiProvider/HapiProvider");


const hapiProvider = new HapiProvider(),
    routesProvider = new RoutesProvider(routes),
    server = new Server(routesProvider, hapiProvider);

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.hapiServer.info.uri}`);

});
