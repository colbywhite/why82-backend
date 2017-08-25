'use strict';

const client = require('./lib/msf_client')
const s3 = require('./lib/s3_client')
const moment = require('moment-timezone')

const buildFileName = (date, postfix) => {
  if(!date) {
    date = moment()
  }
  return moment(date).tz('America/New_York').format(`YYYYMMDD.[${postfix}.json]`)
}

module.exports.save_stats = (event, context, callback) => {
  const now = moment()
  const save_stats = s3.save_json.bind(s3, buildFileName(now, 'stats'))
  const save_sked = s3.save_json.bind(s3, buildFileName(now, 'schedule'))
  const get_sked = client.getMultiDaySchedule.bind(client, now, 8)
  let stats = undefined
  let sked = undefined
  client.getTeamStats()
    .then((results) => {
      stats = results
      return stats
    })
    .then(save_stats)
    .then(get_sked)
    .then((results) => {
      sked = results
      return sked
    })
    .then(save_sked)
    .then(() => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(sked)
      }
      callback(null, response)
    })
    .catch(console.error)
};
