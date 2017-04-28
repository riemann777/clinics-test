const expect = require("chai").expect,
    sinon = require("sinon"),
    ClinicService = require("./ClinicService"),
    HttpMock = require("../Http/HttpMock");


const clinicService = new ClinicService(new HttpMock());

describe("ClinicService", () => {

    let mockPostcode = {
        fullcode: "mockCode",
        outwardCode: "SW1"
    };

    clinicService.http.response = {
        "success":true,
        "result":[{
            "postcode":"mockCode",
            "partial_postcode":"SW1",
            "organisation_id":"40957",
            "name":"Dodds Clinic"
        },{
            "postcode":"mockCode",
            "partial_postcode":"SW1",
            "organisation_id":"40755",
            "name":"Battersea Clinic"
        }]
    };

    describe("when asked for clinics in a given outward code", () => {

        it("should make correct http request", () => {

            let getSpy = sinon.spy(clinicService.http, "get");

            return clinicService.getAllByOutwardCode(mockPostcode).then(() => {

                expect(getSpy.args[0][0]).to.equal("http://mock.endpoint/partial_postcode?partial_postcode=SW1");
                expect(getSpy.args[0][1]).to.deep.equal({ json: true });

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

            return clinicService.getAllByOutwardCode(mockPostcode).then((clinics) => {

                expect(clinics).to.deep.equal(expectedResults);

            });

        });

        describe("when response contains results that do not match full postcode", () => {

            it("should filter these out from the response", () => {

                clinicService.http.response.result.push({
                    "postcode":"notMockCode",
                    "partial_postcode":"SW1",
                    "organisation_id":"40755",
                    "name":"Battersea Clinic"
                });

                return clinicService.getAllByOutwardCode(mockPostcode).then((clinics) => {

                    expect(clinics.results.length).to.equal(2);

                });

            });

        });

    });

});
