const calc_score = require('./score_calculator')

/**
 * If GamesPlayed < 5, the score is automatically 0
 *
 * | win_pct | score |
 * | :------ | :---- |
 * | > .9    | 13    |
 * | > .8    | 8     |
 * | > .7    | 5     |
 * | > .6    | 3     |
 * | > .5    | 2     |
 * | > .4    | 1     |
 * | > .3    | 0     |
 * | > .2    | -1    |
 * | > .1    | -2    |
 * | 0       | -3    |
 */
const calc_win_loss = (teamStats) => {
  const win_pct = teamStats['WinPct']
  const win_pct_rounded = Math.round(win_pct * 10)
  const score = (teamStats['GamesPlayed'] < 5) ? 0 : calc_score(win_pct_rounded, 3, 1)
  return {win_loss: {
    score: score,
    WinPct: win_pct,
    Wins: teamStats['Wins'],
    Losses: teamStats['Losses']
  }}
}

/**
 * | pts_per_game | score |
 * | :----------- | :---- |
 * | > 115        | 21    |
 * | > 113        | 13    |
 * | > 111        | 8     |
 * | > 109        | 5     |
 * | > 107        | 3     |
 * | > 105        | 2     |
 * | > 103        | 1     |
 * | > 101        | 0     |
 * | > 99         | -1    |
 * | > 97         | -2    |
 */
const calc_offense = (teamStats) => {
  const pts = teamStats['PtsPerGame']
  const pts_rounded_to_odd = 2 * Math.round((pts+1)/2) - 1
  const score = calc_score(pts_rounded_to_odd, 101, 2)
  return {offense: {
    score: score,
    PtsPerGame: pts
  }}
}

/**
 * | pt_diff | score |
 * | :------ | :---- |
 * | +13     | 21    |
 * | +11     | 13    |
 * | +9      | 8     |
 * | +7      | 5     |
 * | +5      | 3     |
 * | +3      | 2     |
 * | +1      | 1     |
 * | -1      | 0     |
 * | -3      | -1    |
 * | -5      | -2    |
 * | -7      | -3    |
 */
const calc_pt_diff = (teamStats) => {
  const pts = teamStats['PtsPerGame']
  const pts_allowed = teamStats['PtsAgainstPerGame']
  const pt_diff = pts - pts_allowed
  const pt_diff_rounded_to_odd = 2 * Math.round((pt_diff+1)/2) - 1
  const score = calc_score(pt_diff_rounded_to_odd, -1, 2)
  return {pt_diff: {
    score: score,
    PtsPerGame: pts,
    PtsAgainstPerGame: pts_allowed,
    PtsDiffPerGame: pt_diff
  }}
}

module.exports = {
  all: () => [calc_win_loss, calc_offense, calc_pt_diff]
}
