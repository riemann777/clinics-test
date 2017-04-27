const config = require("../../config").ClinicService;


module.exports = class ClinicService {

    constructor(http) {

        this.http = http;
        this.config = config;
    }

    getAllByOutwardCode(outwardCode) {

        return this.http.get(this.config.endpoint + "/partial_postcode?partial_postcode=" + outwardCode);

    }

}