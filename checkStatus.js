const request = require('superagent');
const logger = require('./logger');

const url = 'http://localhost:3000/';
let isServerDown = false;
let serverDownTime;

let checkStatus = function () {
    let message;
    request.get(url)
        .then(function (res) {
            console.log('res status', res.status);
            if (isServerDown === true) {
                let now = new Date();
                let duration = (now - serverDownTime) / 1000;
                message = 'Server Online after: ' + duration + ' seconds.\n';
                logger(message, now);
                isServerDown = false;
            }
        })
        .catch(function (err) {
            if (err.status) {
                let errorStatusType = err.status / 100 | 0;
                switch (errorStatusType) {
                case 4:
                    console.log('Client Error ', err.status);
                    console.log('Message ', err.response.res.statusMessage);
                    break;
                case 5:
                    console.log('Server Error ', err.status);
                    console.log('Message ', err.response.res.statusMessage);
                    if (isServerDown === false) {
                        let now = new Date();
                        message = 'Server Down at: ' + now + '\n';
                        serverDownTime = now;
                        isServerDown = true;
                        logger(message, now);
                    }
                    break;
                default:
                    console.log('Error ', err.status);
                }
            } else {
                console.log('Error Occured: ', err);
            }
        });
};

module.exports = checkStatus;
