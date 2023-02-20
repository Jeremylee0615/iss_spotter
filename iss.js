const request = require('request');

const fetchMyIP = function(callback) {
  const ipv4ipJson = 'https://api.ipify.org?format=json';
  request(ipv4ipJson,(error, response, body) => {
    if (error) {
      return callback("Oops! Something went wrong while retrieving IP address: " + error, null);
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

const fetchCoordsByIP = function(callback) {
  const singleipLookup = `http://ipwho.is/${singleipLookup}`;
  request(singleipLookup,(error, response, body) => {
    if (error) {
      return callback("Oops! Something went wrong while retrieving coordinates: " + error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    
    const lattiude = JSON.parse(body).data.lattiude;
    const longitude = JSON.parse(body).date.longitude;
  
    callback(null,{lattiude , longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const overtimeUrl = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(overtimeUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


module.exports = { fetchISSFlyOverTimes };
module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP};