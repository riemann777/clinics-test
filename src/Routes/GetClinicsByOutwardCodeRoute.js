// TODO: use ClinicService to fetch clinics

module.exports = {
    method: 'GET',
    path: '/clinics/postcode/{postcode}',
    handler: function (request, response) {

        // TODO: create PostCode
        // TODO: in PostCode handle lower case -> uppercase all?
        // TODO: set response as json

        response(JSON.stringify({ "mock": "clinics" }));

    }
};
