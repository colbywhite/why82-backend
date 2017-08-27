const moment = require('moment-timezone')

const avg_score = (home, away) => {
  return parseFloat(((home.score + away.score) / 2).toFixed(2))
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
    score: avg_score(home, away)
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
