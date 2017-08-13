const metrics = require('./metrics').all()

const calc_metrics = (metricFuncs, stats) => {
  return Object.keys(stats).reduce((result, team) => {
    metricFuncs.forEach((metric) => {
      const metric_info = metric(stats[team])
      Object.assign(result[team], metric_info)
    })
    return result
  }, buildEmptyResult(stats))
}

const buildEmptyResult = (stats) => {
  return Object.keys(stats).reduce((result, team) => {
    result[team] = parseTeamInfo(stats[team])
    return result
  }, {})
}

const parseTeamInfo = (team) => {
  return {
    abbreviated_name: team.abbreviated_name,
    short_name: team.short_name,
    full_name: team.full_name
  }
}

module.exports = {
  calc: calc_metrics.bind(this, metrics)
}
