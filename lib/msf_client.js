'use strict';

const request = require('request-promise')
const parser = require('./parser')

const MSF_HOST = 'https://api.mysportsfeeds.com/v1.1/pull/nba'
const SEASON_HOST = `${MSF_HOST}/2016-2017-regular`

const optionsForUri = (uri) => {
  return {
    method: 'GET',
    uri: `${SEASON_HOST}/${uri}`,
    json: true,
    auth: {
      user: process.env.MSF_USER,
      pass: process.env.MSF_PASS
    }
  }
}

module.exports = {
  getSchedule: () => {
    const options = optionsForUri('daily_game_schedule.json?fordate=20170319')
    return request(options).then((sked) => sked.dailygameschedule.gameentry)
  },
  getTeamStats: () => {
    const options = optionsForUri('overall_team_standings.json')
    return request(options)
      .then((standings) => standings.overallteamstandings.teamstandingsentry)
      .then(parser.parseStats)
      .then(parser.arrayToMap)
  }
}
