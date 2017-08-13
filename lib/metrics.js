const WIN_LOSS_TIER_ONE_CUTOFF = .660
const WIN_LOSS_TIER_TWO_CUTOFF = .550
const PTS_TIER_ONE_CUTOFF = 110.0
const PTS_TIER_TWO_CUTOFF = 106.0

const calc_tier = (value, tier_one_cutoff, tier_two_cutoff) => {
  if (value < tier_two_cutoff) {
    return 3
  } else if (value >= tier_one_cutoff) {
    return 1
  } else {
    return 2
  }
}

const calc_win_loss = (teamStats) => {
  const win_pct = teamStats['WinPct']
  const tier = calc_tier(win_pct, WIN_LOSS_TIER_ONE_CUTOFF, WIN_LOSS_TIER_TWO_CUTOFF)
  return {win_loss: {
    tier: tier,
    WinPct: win_pct,
    Wins: teamStats['Wins'],
    Losses: teamStats['Losses']
  }}
}

const calc_offense = (teamStats) => {
  const pts = teamStats['PtsPerGame']
  const tier = calc_tier(pts, PTS_TIER_ONE_CUTOFF, PTS_TIER_TWO_CUTOFF)
  return {offense: {
    tier: tier,
    PtsPerGame: pts
  }}
}

module.exports = {
  all: () => [calc_win_loss, calc_offense]
}