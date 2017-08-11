const parseStats = (stats) => {
    return stats.map((entry) => {
      return {
        losses: Number(entry.stats.Losses['#text']),
        wins: Number(entry.stats.Wins['#text']),
        win_loss_pct: Number(entry.stats.WinPct['#text']),
        abbreviated_name: entry.team.Abbreviation,
        short_name: entry.team.Name,
        full_name: `${entry.team.City} ${entry.team.Name}`
      }
    })
}

const arrayToMap = (arr) => {
  return arr.reduce((result, ele) => {
    result[ele.abbreviated_name] = ele
    return result
  }, {})
}

module.exports= {parseStats: parseStats, arrayToMap: arrayToMap}
