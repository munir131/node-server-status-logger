const util = require('util');
const fs = require('fs');
const appendFile = util.promisify(fs.appendFile);

let logger = function (message, now) {
    let fileName = 'logs-' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '.txt';

    appendFile('./logs/' + fileName, message)
        .then(function () {
            console.log('Logs Updated');
        })
        .catch(function (err) {
            console.log('Error in updating Logs: ', err);
        });
};

module.exports = logger;
