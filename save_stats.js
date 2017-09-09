'use strict';

const client = require('./lib/msf_client')
const s3 = require('./lib/s3_client')
const team_calc = require('./lib/team_calculator')
const game_calc = require('./lib/game_calculator')
const moment = require('moment-timezone')
const SEASON = parseInt(process.env.SEASON)
const LAST_SEASON = SEASON - 1
const EASTERN_TIMEZONE = 'America/New_York'

const buildFileName = (season, date, postfix) => {
  if(!date) {
    date = moment()
  }
  const filename = moment(date).tz('America/New_York').format(`YYYYMMDD.[${postfix}.json]`)
  return `${season}/${filename}`
}

const getDate = () => {
 const now = moment.tz(EASTERN_TIMEZONE)
 const season_info = require(`./lib/seasons/${SEASON}.json`)
 const start = moment.tz(season_info.start, 'YYYY-MM-DD', EASTERN_TIMEZONE)
 const end = moment.tz(season_info.end, 'YYYY-MM-DD', EASTERN_TIMEZONE)
 if (now.isBefore(start)) {
   return start
 } else if (now.isAfter(end)) {
   return end
 } else {
   return now
 }
}

module.exports.save_stats = (event, context, callback) => {
  const date = getDate()
  console.log(`Saving stats for ${date.format("MMM Do YYYY ZZ")}`)
  const save_stats = s3.save_json.bind(s3, buildFileName(SEASON, date, 'raw.stats'))
  const save_sked = s3.save_json.bind(s3, buildFileName(SEASON, date, 'raw.schedule'))
  const save_team_scores = s3.save_json.bind(s3, buildFileName(SEASON, date, 'team.scores'))
  const save_game_scores = s3.save_json.bind(s3, buildFileName(SEASON, date, 'game.scores'))
  const get_sked = client.getMultiDaySchedule.bind(client, date, 8)

  let getLastSeasonStats = s3.readLatest(LAST_SEASON + '/', 'raw.stats')
    .then(JSON.parse)

  let getTeamStats = client.getTeamStats()
    .then(save_stats)

  let getTeamScores = Promise.all([getTeamStats, getLastSeasonStats])
    .then((results) => team_calc.calc(results[0], results[1]))
    .then(save_team_scores)

  let getSchedule = client.getMultiDaySchedule(date, 8)
    .then(save_sked)

  Promise.all([getTeamScores, getSchedule])
    .then((results) => game_calc.score(results[0], results[1]))
    .then(save_game_scores)
    .then((results) => {
      const response = {
        statusCode: 200,
        body: results
      }
      callback(null, response)
    })
    .catch(console.error)
};
