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

    it("should return data in correct format", () => {

        const expectedResults = {
            results: [{
                organisation_id: "40957",
                name: "Dodds Clinic"
            }, {
                organisation_id: "40755",
                name: "Battersea Clinic"
            }]
        };

        clinicService.http.response = {
            "success":true,
            "result":[{
                "partial_postcode":"SW1",
                "organisation_id":"40957",
                "name":"Dodds Clinic"
            },{
                "partial_postcode":"SW1",
                "organisation_id":"40755",
                "name":"Battersea Clinic"
            }]
        };

        return clinicService.getAllByOutwardCode("mockCode").then((clinics) => {

            expect(clinics).to.deep.equal(expectedResults);

        });

    });

});
