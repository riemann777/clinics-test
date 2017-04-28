const expect = require("chai").expect,
    sinon = require("sinon"),
    Server = require("./Server"),
    RoutesProvider = require("./RoutesProvider/RoutesProvider");


const routesProvider = new RoutesProvider([
        {}
    ]),
    server = new Server(routesProvider);

describe("Server", () => {

    describe("when instantiating new server", () => {


        it("should set new instance of Hapi", () => {

            expect(server.hapiServer.connection).to.be.function;
            expect(server.hapiServer.register).to.be.function;
            expect(server.hapiServer.start).to.be.function;

        });

        it("should set server config", () => {

            expect(server.config).to.deep.equal({
                "host": "localhost",
                "port": 1337
            });

        });

        it("should set routes provider", () => {

            expect(server.routesProvider).to.be.instanceOf(RoutesProvider);

        });

    });

    xdescribe("when starting instance of server", () => {

        it("should ", () => {

            expect(true).to.equal(false);

        });

    });

});