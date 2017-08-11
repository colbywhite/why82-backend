'use strict';

const client = require('./lib/msf_client')

module.exports.save_stats = (event, context, callback) => {
  client.getTeamStats()
    .then((stats) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(stats)
      };
      callback(null, response);
    })
    .catch(console.error)
};
