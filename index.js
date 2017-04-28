const Server = require("./src/Server/Server"),
    routes = require("./src/Routes/routes"),
    RoutesProvider = require("./src/Server/RoutesProvider/RoutesProvider");


const routesProvider = new RoutesProvider(routes),
    server = new Server(routesProvider);

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.hapiServer.info.uri}`);

});
