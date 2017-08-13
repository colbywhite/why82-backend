const metrics = require('./metrics').all()

const calc_metrics = (stats, metricFuncs) => {
  let result = buildEmptyResult(stats)
  Object.keys(stats).forEach((team) => {
    metricFuncs.forEach((metric) => {
      const metric_info = metric(stats[team])
      Object.assign(result[team], metric_info)
    })
  })
  return result
}

const buildEmptyResult = (stats) => {
  let result = {}
  Object.keys(stats).forEach((team) => {
    result[team] = parseTeamInfo(team, stats)
  })
  return result
}

const parseTeamInfo = (abbreviated_name, allTeamStats) => {
  const team = allTeamStats[abbreviated_name]
  return {
    abbreviated_name: team.abbreviated_name,
    short_name: team.short_name,
    full_name: team.full_name
  }
}

const calc = (stats) => {
  return calc_metrics(stats, metrics)
}

module.exports = {
  calc: calc
}
