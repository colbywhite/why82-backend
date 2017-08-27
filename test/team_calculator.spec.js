const assert = require('chai').assert
const stats = require('./resources/2017-08-13-stats')
const team_calculator = require('../lib/team_calculator')

describe('team_calculator', () => {
  let scores

  before(() => {
    scores = team_calculator.calc(stats)
  })

  it('keeps team information', () => {
    assert.strictEqual(scores.GSW.abbreviated_name, 'GSW')
    assert.strictEqual(scores.GSW.short_name, 'Warriors')
    assert.strictEqual(scores.GSW.full_name, 'Golden State Warriors')
  })

  it('calculates win_loss scores', () => {
    assert.strictEqual(scores.GSW.metrics.win_loss.score, 8)
    assert.strictEqual(scores.WAS.metrics.win_loss.score, 3)
    assert.strictEqual(scores.LAL.metrics.win_loss.score, 0)
    assert.strictEqual(scores.BRO.metrics.win_loss.score, -1)
  })

  it('calculates offensive scores', () => {
    assert.strictEqual(scores.GSW.metrics.offense.score, 21)
    assert.strictEqual(scores.WAS.metrics.offense.score, 5)
    assert.strictEqual(scores.LAL.metrics.offense.score, 2)
    assert.strictEqual(scores.DAL.metrics.offense.score, -2)
  })

  it('calculates point difference scores', () => {
    assert.strictEqual(scores.GSW.metrics.pt_diff.score, 13)
    assert.strictEqual(scores.WAS.metrics.pt_diff.score, 1)
    assert.strictEqual(scores.LAL.metrics.pt_diff.score, -3)
  })

  it('calculates overall scores', () => {
    assert.strictEqual(scores.GSW.score, 42)
    assert.strictEqual(scores.WAS.score, 9)
    assert.strictEqual(scores.LAL.score, -1)
  })
})
