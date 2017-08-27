'use strict';
const s3 = require('./lib/s3_client')

const HEADERS = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Credentials" : true
}

const get_latest = (season, type, callback) => {
  return s3.readLatest(season + '/', type)
    .then((result) => {
      const response =  {
        headers: HEADERS,
        statusCode: 200,
        body: result,
      }
      callback(null, response)
    })
}

module.exports.schedule = (event, context, callback) => {
  const season = parseInt(event.pathParameters.season)
  get_latest(season, 'game.scores', callback).catch(console.error)
}

module.exports.teams = (event, context, callback) => {
  const season = parseInt(event.pathParameters.season)
  get_latest(season, 'team.scores', callback).catch(console.error)
}
