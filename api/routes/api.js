const axios = require('axios');

function get(req, res, next) {

    axios.post('http://localhost:3001/getValue', {
        "requestType": -1,
        "nameOfParameter": "vac",
        "value": 0
    })
        .then(function (response) {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

module.exports.get = get;