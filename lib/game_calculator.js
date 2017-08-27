const moment = require('moment-timezone')
const MIDDLE_TIER_THRESHOLD = 5
const TOP_TIER_THRESHOLD = 10

const isMiddleTier = (score) => {
  return score > MIDDLE_TIER_THRESHOLD && score <= TOP_TIER_THRESHOLD
}

const isBottomTier = (score) => {
  return score <= MIDDLE_TIER_THRESHOLD
}

const grade_matchup = (home, away) => {
  if (isBottomTier(home.score) || isBottomTier(away.score)) {
    // if one team is bottom tier, ignore the game
    return 'D'
  } else if (isMiddleTier(home.score) && isMiddleTier(away.score)) {
    return 'C'
  } else if (isMiddleTier(home.score) || isMiddleTier(away.score)) {
    // at this point, if one is middle tier, the other must be top
    return 'B'
  } else {
    // at this point, both of them must be top tier
    return 'A'
  }
}

const parseTime = (date_string, eastern_time_string) => {
  const time = moment.tz(`${date_string} ${eastern_time_string}`, 'YYYY-MM-DD h:mma', 'America/New_York')
  return time.format()
}

const score_game = (team_scores, game) => {
  const home = team_scores[game.homeTeam.Abbreviation]
  const away = team_scores[game.awayTeam.Abbreviation]
  return {
    home: home,
    away: away,
    time: parseTime(game.date, game.time),
    score: grade_matchup(home, away)
  }
}

const score_games = (team_scores, games) => {
  return games.map((game) => score_game(team_scores, game))
}

const score_schedule = (team_scores, schedule) => {
  return Object.keys(schedule).reduce((results, day) => {
    results[day] = score_games(team_scores, results[day])
    return results
  }, JSON.parse(JSON.stringify(schedule)))
}

module.exports = {
  score: score_schedule
}
