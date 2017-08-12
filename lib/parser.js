const parseStats = (stats) => {
  return stats.map((entry) => {
    const team_info = {
      abbreviated_name: entry.team.Abbreviation,
      short_name: entry.team.Name,
      full_name: `${entry.team.City} ${entry.team.Name}`
    }
    const keys = Object.keys(entry.stats)
    return keys
      .reduce((result, key) => {
        result[key] = Number(entry.stats[key]['#text'])
        return result
      }, team_info)
  })
}

const arrayToMap = (arr) => {
  return arr.reduce((result, ele) => {
    result[ele.abbreviated_name] = ele
    return result
  }, {})
}

module.exports = {parseStats: parseStats, arrayToMap: arrayToMap}
