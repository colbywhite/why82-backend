const parser = require('./parser')

const WIN_LOSS_TIER_ONE_CUTOFF = .660
const WIN_LOSS_TIER_TWO_CUTOFF = .550

const parseTeamInfo = (abbreviated_name, allTeamStats) => {
  const team = allTeamStats[abbreviated_name]
  return {
    abbreviated_name: team.abbreviated_name,
    short_name: team.short_name,
    full_name: team.full_name
  }
}

const calc_win_loss = (stats) => {
  const win_loss_info = Object.keys(stats).map((team) => {
    const team_info = parseTeamInfo(team, stats)
    const win_pct = stats[team]['WinPct']
    const tier = calc_tier(win_pct, WIN_LOSS_TIER_ONE_CUTOFF, WIN_LOSS_TIER_TWO_CUTOFF)
    const tier_info = {win_loss: {
      tier: tier,
      WinPct: win_pct,
      Wins: stats[team]['Wins'],
      Losses: stats[team]['Losses']
    }}
    return Object.assign(team_info, tier_info)
  })
  return parser.arrayToMap(win_loss_info)
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

module.exports = {
  calc: calc_win_loss
}
