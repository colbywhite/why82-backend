'use strict';
const s3 = require('./lib/s3_client')

module.exports.schedule = (event, context, callback) => {
  const season = parseInt(event.pathParameters.season)
  s3.readLatest(season + '/', 'game.scores')
    .then((result) => {
      const response = {
        statusCode: 200,
        body: result,
      }
      callback(null, response);
    })
    .catch(console.error)
}
