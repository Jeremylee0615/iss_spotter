const request = require('request');

const fetchMyIP = function(callback) {
  const ipv4ipJson = 'https://api.ipify.org?format=json';
  request(ipv4ipJson,(error, response, body) => {
    if (error) {
      return callback("Oops! Something went wrong while retrieving IP address" + error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

module.exports = { fetchMyIP };