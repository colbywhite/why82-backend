'use strict';

const client = require('./lib/msf_client')
const s3 = require('./lib/s3_client')
const moment = require('moment-timezone')

const buildFileName = (date) => {
  if(!date) {
    date = moment()
  }
  return date.tz('America/New_York').format('YYYY-MM-DD-[stats.json]')
}

module.exports.save_stats = (event, context, callback) => {
  const save = s3.save.bind(s3, buildFileName())
  client.getTeamStats()
    .then(JSON.stringify)
    .then(save)
    .then((stats) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(stats)
      }
      callback(null, response)
    })
    .catch(console.error)
};
