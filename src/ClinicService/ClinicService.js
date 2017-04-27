const config = require("../../config").ClinicService,
    _ = require("lodash");


module.exports = class ClinicService {

    constructor(http) {

        this.http = http;
        this.config = config;
    }

    getAllByOutwardCode(outwardCode) {

        return this.http.get(this.config.endpoint + "/partial_postcode?partial_postcode=" + outwardCode)
            .then((response) => {

                return {
                    results: _.map(response.result, (result) => {

                        return {
                            organisation_id: result.organisation_id,
                            name: result.name
                        }
                    })
                };

            });
    }

};