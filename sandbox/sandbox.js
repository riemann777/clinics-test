var express = require('express');
var app = express();

app.get('/clinics/postcode/:postcode', function (req, res) {
    res.send('Hello World! ' + req.params.postcode)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

// const Hapi = require('hapi');
//
// const server = new Hapi.Server();
// server.connection({ port: 3000, host: 'localhost' });
//
// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         reply('Hello, world!');
//     }
// });
//
// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });
//
// server.start((err) => {
//
//     if (err) {
//         throw err;
//     }
//     console.log(`Server running at: ${server.info.uri}`);
// });