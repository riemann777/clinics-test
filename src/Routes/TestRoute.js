// This endpoint should:
// i. Accept a postcode in the format such as SW11 4LU
// ii. Take the first partial bit before the space to call CLINICS_POSTCODE (eg
// https://data.gov.uk/data/api/service/health/clinics/partial
//     _postcode?partial_postcode=SE1)
// iii. Provide a JSON response with results that match the full postcode only
// iv. Each result item should include:
//     a. organisation_id b. name
// The response might look something like:
// {
//     results: [{
//         organisation_id: "40957",
//         name: "Dodds Clinic"
//     }, {
//         organisation_id: "40755",
//         name: "Battersea Clinic"
//     }]
// }

module.exports = {
    method: 'GET',
    path: '/clinics/postcode/{postcode}',
    handler: function (request, response) {

        response('Hello, ' + request.params.postcode);//encodeURIComponent(request.params.postcode) + '!');

    }
};

//     class TestRoute {
//
//     definition = {
//         method: 'GET',
//         path: '/clinics/postcode/:postcode',
//         handler: function (request, response) {
//             response('Hello, ' + encodeURIComponent(request.params.name) + '!');
//         }
//     }
//
// };