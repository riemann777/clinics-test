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
            "name":"Dodds Clinic",
            "address1": "24 Park Road",
            "address2": "Battersea",
            "address3": "",
            "city": "London"
        },{
            "postcode":"mockCode",
            "partial_postcode":"SW1",
            "organisation_id":"40755",
            "name":"Battersea Clinic",
            "address1": "12 Park Road",
            "address2": "",
            "address3": "Battersea",
            "city": "Paris"
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
                    name: "Dodds Clinic",
                    address: "Dodds Clinic (24 Park Road, Battersea, mockCode, London)"
                }, {
                    organisation_id: "40755",
                    name: "Battersea Clinic",
                    address: "Battersea Clinic (12 Park Road, Battersea, mockCode, Paris)"
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

    describe("when asked to get address from clinic data", () => {

        let address;

        beforeEach(() => {

            address = {
                name: "Dodds Clinic",
                address1: "24 Park Road",
                address2: "Battersea",
                address3: "mockAddressThree",
                postcode: "SW11 4LU",
                city: "London"
            };

        });


        it("should build correct address string", () => {

            const addressString = clinicService.getAddress(address);

            expect(addressString).to.equal("Dodds Clinic (24 Park Road, Battersea, mockAddressThree, SW11 4LU, London)");

        });

        it("should only use fields when not empty", () => {

            address.address1 = "";
            address.postcode = "";

            const addressString = clinicService.getAddress(address);

            expect(addressString).to.equal("Dodds Clinic (Battersea, mockAddressThree, London)");

        });

        it("should not include name if doesn't exist", () => {

            address.name = "";

            const addressString = clinicService.getAddress(address);

            expect(addressString).to.equal("(24 Park Road, Battersea, mockAddressThree, SW11 4LU, London)");

        });

    });

});
