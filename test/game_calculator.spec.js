const assert = require('chai').assert
const raw_schedule = require('./resources/20170216.raw.schedule')
const team_scores = require('./resources/20170216.team.scores')
const game_calculator = require('../lib/game_calculator')

describe('game_calculator', () => {
  let graded_sked
  let was_ind
  let bos_chi
  let lac_gsw
  let tor_okc
  let tor_gsw

  beforeEach(() => {
    graded_sked = game_calculator.score(team_scores, raw_schedule)
    was_ind = graded_sked['2017-02-16'][0]
    bos_chi = graded_sked['2017-02-16'][1]
    lac_gsw = graded_sked['2017-02-23'][4]
    tor_okc = graded_sked['2017-02-24'][0]
    tor_gsw = graded_sked['2017-02-24'][1]
  })

  it('returns games for same dates', () => {
    assert.deepEqual(Object.keys(graded_sked), Object.keys(raw_schedule))
  })

  it('grades games properly', () => {
    assert.strictEqual(was_ind.score, 'D')
    assert.strictEqual(bos_chi.score, 'D')
    assert.strictEqual(tor_okc.score, 'C')
    assert.strictEqual(tor_gsw.score, 'B')
    assert.strictEqual(lac_gsw.score, 'A')
  })

  it('includes appropriate game time', () => {
    assert.strictEqual(was_ind.time, '2017-02-16T19:00:00-05:00')
    assert.strictEqual(bos_chi.time, '2017-02-16T20:00:00-05:00')
  })

  it('includes redundant team info', () => {
    assert.strictEqual(was_ind.away, team_scores['WAS'])
    assert.strictEqual(was_ind.home, team_scores['IND'])
    assert.strictEqual(bos_chi.away, team_scores['BOS'])
    assert.strictEqual(bos_chi.home, team_scores['CHI'])
  })
})
