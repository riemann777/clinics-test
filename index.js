const Server = require("./src/Server/Server");

const server = new Server();

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.hapiServer.info.uri}`);

});
