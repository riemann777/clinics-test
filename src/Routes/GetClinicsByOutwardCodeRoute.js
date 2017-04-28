// TODO: use ClinicService to fetch clinics

module.exports = {
    method: 'GET',
    path: '/clinics/postcode/{postcode}',
    handler: function (request, response) {

        // TODO: set response as json

        response(JSON.stringify({ "mock": "clinics" });

    }
};
