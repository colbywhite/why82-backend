'use strict';

const client = require('./lib/msf_client')

module.exports.hello = (event, context, callback) => {
  client.getSchedule()
    .then((schedule) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(schedule)
      };
      callback(null, response);
    })
    .catch(console.error)
};
