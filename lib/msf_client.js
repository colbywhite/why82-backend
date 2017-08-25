'use strict';

const request = require('request-promise')
const parser = require('./parser')
const moment = require('moment-timezone')

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

const getSingleDaySchedule = (date) => {
  console.log(`Retrieving schedule for ${date.format('YYYYMMDD')}`)
  const options = optionsForUri(`daily_game_schedule.json?fordate=${date.format('YYYYMMDD')}`)
  return request(options).then((sked) => sked.dailygameschedule.gameentry || [])
}

module.exports = {
  getSingleDaySchedule: getSingleDaySchedule,
  getMultiDaySchedule: (start_date, num_days) => {
    console.log(`Retrieving ${num_days}-day schedule from ${start_date.format('YYYYMMDD')}`)
    const promises = Array(num_days).fill()
      .map((x,i)=>i)
      .map((i) => getSingleDaySchedule(moment(start_date).add(i, 'd')))
    return Promise.all(promises)
      .then((results) => {
        console.log('All days retrieved')
        return results.reduce((result, single_day_sked) => {
          if(single_day_sked && single_day_sked.length > 0) {
            result[single_day_sked[0].date] = single_day_sked
          }
          return result
        }, {})
      })
  },
  getTeamStats: () => {
    console.log('Retrieving team stats')
    const options = optionsForUri('overall_team_standings.json')
    return request(options)
      .then((standings) => standings.overallteamstandings.teamstandingsentry)
      .then(parser.parseStats)
      .then(parser.arrayToMap)
  }
}
