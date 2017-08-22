const assert = require('chai').assert
const stats = require('./resources/2017-08-13-stats')
const tier_calculator = require('../lib/tier_calculator')

describe('tier_calculator', () => {
  let tiers
  before(() => {
    tiers = tier_calculator.calc(stats)
  })

  it('keeps team information', () => {
    assert.strictEqual(tiers.GSW.abbreviated_name, 'GSW')
    assert.strictEqual(tiers.GSW.short_name, 'Warriors')
    assert.strictEqual(tiers.GSW.full_name, 'Golden State Warriors')
  })

  it('calculates win_loss scores', () => {
    assert.strictEqual(tiers.GSW.metrics.win_loss.score, 8)
    assert.strictEqual(tiers.WAS.metrics.win_loss.score, 3)
    assert.strictEqual(tiers.LAL.metrics.win_loss.score, 0)
    assert.strictEqual(tiers.BRO.metrics.win_loss.score, -1)
  })

  it('calculates offensive scores', () => {
    assert.strictEqual(tiers.GSW.metrics.offense.score, 21)
    assert.strictEqual(tiers.WAS.metrics.offense.score, 5)
    assert.strictEqual(tiers.LAL.metrics.offense.score, 2)
    assert.strictEqual(tiers.DAL.metrics.offense.score, -2)
  })

  it('calculates point difference tiers', () => {
    assert.strictEqual(tiers.GSW.metrics.pt_diff.score, 13)
    assert.strictEqual(tiers.WAS.metrics.pt_diff.score, 1)
    assert.strictEqual(tiers.LAL.metrics.pt_diff.score, -3)
  })
})
