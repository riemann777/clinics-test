const expect = require("chai").expect,
    sinon = require("sinon"),
    ClinicService = require("./ClinicService"),
    HttpMock = require("../Http/HttpMock");


const clinicService = new ClinicService(new HttpMock());

describe("ClinicService", () => {

    describe("when asked for clinics in a given outward code", () => {

        it("should make correct http request", () => {

            let getSpy = sinon.spy(clinicService.http, "get");

            return clinicService.getAllByOutwardCode("mockCode").then(() => {

                expect(getSpy.args[0][0]).to.equal("http://mock.endpoint/partial_postcode?partial_postcode=mockCode");

            });

        });

    });

});
