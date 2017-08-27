'use strict';

const client = require('./lib/msf_client')
const s3 = require('./lib/s3_client')
const team_calc = require('./lib/team_calculator')
const moment = require('moment-timezone')

const buildFileName = (date, postfix) => {
  if(!date) {
    date = moment()
  }
  return moment(date).tz('America/New_York').format(`YYYYMMDD.[${postfix}.json]`)
}

module.exports.save_stats = (event, context, callback) => {
  const now = moment('20170216', "YYYYMMDD")
  const save_stats = s3.save_json.bind(s3, buildFileName(now, 'raw.stats'))
  const save_sked = s3.save_json.bind(s3, buildFileName(now, 'raw.schedule'))
  const save_team_scores = s3.save_json.bind(s3, buildFileName(now, 'team.scores'))
  const get_sked = client.getMultiDaySchedule.bind(client, now, 8)
  let getTeamScores = client.getTeamStats()
    .then(save_stats)
    .then(team_calc.calc)
    .then(save_team_scores)
  let getSchedule = client.getMultiDaySchedule(now, 8)
    .then(save_sked)

  Promise.all([getTeamScores, getSchedule])
    .then((results) => {
      const response = {
        statusCode: 200,
        body: results[0]
      }
      callback(null, response)
    })
    .catch(console.error)
};
