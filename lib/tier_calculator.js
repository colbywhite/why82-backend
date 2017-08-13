const parser = require('./parser')

const WIN_LOSS_TIER_ONE_CUTOFF = .660
const WIN_LOSS_TIER_TWO_CUTOFF = .550
const PTS_TIER_ONE_CUTOFF = 110.0
const PTS_TIER_TWO_CUTOFF = 106.0

const parseTeamInfo = (abbreviated_name, allTeamStats) => {
  const team = allTeamStats[abbreviated_name]
  return {
    abbreviated_name: team.abbreviated_name,
    short_name: team.short_name,
    full_name: team.full_name
  }
}

const calc_win_loss = (stats, result) => {
  Object.keys(stats).forEach((team) => {
    const win_pct = stats[team]['WinPct']
    const tier = calc_tier(win_pct, WIN_LOSS_TIER_ONE_CUTOFF, WIN_LOSS_TIER_TWO_CUTOFF)
    const win_loss_info = {win_loss: {
      tier: tier,
      WinPct: win_pct,
      Wins: stats[team]['Wins'],
      Losses: stats[team]['Losses']
    }}
    Object.assign(result[team], win_loss_info)
  })
  return result
}

const calc_offense = (stats, result) => {
  Object.keys(stats).forEach((team) => {
    const pts = stats[team]['PtsPerGame']
    const tier = calc_tier(pts, PTS_TIER_ONE_CUTOFF, PTS_TIER_TWO_CUTOFF)
    const offense_info = {offense: {
      tier: tier,
      PtsPerGame: pts
    }}
    Object.assign(result[team], offense_info)
  })
  return result
}

const calc_tier = (value, tier_one_cutoff, tier_two_cutoff) => {
  if (value < tier_two_cutoff) {
    return 3
  } else if (value >= tier_one_cutoff) {
    return 1
  } else {
    return 2
  }
}

const buildEmptyResult = (stats) => {
  let result = {}
  Object.keys(stats).forEach((team) => {
    result[team] = {}
  })
  return result
}

const calc = (stats) => {
  return calc_win_loss(stats, calc_offense(stats, buildEmptyResult(stats)))
}

module.exports = {
  calc: calc
}
