'use strict';

const request = require('request-promise')

const MSF_HOST = 'https://api.mysportsfeeds.com/v1.1/pull/nba'
const SEASON_HOST = `${MSF_HOST}/2016-2017-regular`

module.exports = {
  getSchedule: () => {
    const options = {
      method: 'GET',
      uri: `${SEASON_HOST}/daily_game_schedule.json?fordate=20170319`,
      json: true,
      auth: {
        user: process.env.MSF_USER,
        pass: process.env.MSF_PASS
      }
    }
    return request(options).then((sked) => sked.dailygameschedule.gameentry)
  }
}
