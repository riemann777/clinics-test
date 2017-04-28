const config = require("../../config").ClinicService,
    _ = require("lodash");


module.exports = class ClinicService {

    constructor(http) {

        this.http = http;
        this.config = config;
    }

    getAllByOutwardCode(postCode) {

        return this.http.get(this.config.endpoint + "/partial_postcode?partial_postcode=" + postCode.outwardCode)
            .then((response) => {

                let exactPostCodeResults = this.getExactPostcodeMatches(response.result, postCode.fullcode);

                return this.formatResults(exactPostCodeResults);

            });

    }

    getExactPostcodeMatches(responseResult, fullcode) {

        let results = _.cloneDeep(responseResult);

        return _.filter(results, (result) => {

            return result.postcode === fullcode;

        });
    }

    formatResults(clinicData) {

        return {
            results: _.map(clinicData, (clinic) => {
                return {
                    organisation_id: clinic.organisation_id,
                    name: clinic.name
                }
            })
        };
    }

};