const expect = require("chai").expect,
    sinon = require("sinon"),
    Server = require("./Server"),
    RoutesProvider = require("./RoutesProvider/RoutesProvider");


const routesProvider = new RoutesProvider([
        {
            method: 'GET',
            path: '/mock/route',
            handler: () => {}
        }
    ]),
    hapiProvider = {
        get: () => {

            return {
                connection: () => {},
                register: () => {},
                start: () => {},
                route: () => {}
            }
        }
    },
    server = new Server(routesProvider, hapiProvider);

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

    describe("when starting instance of server", () => {

        it("should set hapi server connection", () => {

            let setConnectionSpy = sinon.spy(server.hapiServer, "connection");

            server.start(() => {

                expect(setConnectionSpy.calledOnce).to.equal(true);
                expect(setConnectionSpy.args[0][0]).to.deep.equal({
                    "host": "localhost",
                    "port": 1337
                });

            });


        });

        it("should initialise provided routes", () => {

            let setRouteSpy = sinon.spy(server.hapiServer, "route");

            server.start(() => {

                expect(setRouteSpy.calledOnce).to.equal(true);
                expect(setRouteSpy.args[0][0]).to.deep.equal({
                    method: 'GET',
                    path: '/mock/route',
                    handler: () => {
                    }
                });

            });

        });

        // TODO: ensure hapi only started once routes initialised
        it("should start hapi server once routes are initialised", () => {

            let startSpy = sinon.spy(server.hapiServer, "start");

            server.start(() => {

                expect(startSpy.calledOnce).to.equal(true);

            });

        });

    });

});