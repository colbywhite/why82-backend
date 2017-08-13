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

  it('calculates win_loss tiers', () => {
    assert.strictEqual(tiers.GSW.win_loss.tier, 1)
    assert.strictEqual(tiers.WAS.win_loss.tier, 2)
    assert.strictEqual(tiers.LAL.win_loss.tier, 3)
  })

  it('calculates offensive tiers', () => {
    assert.strictEqual(tiers.GSW.offense.tier, 1)
    assert.strictEqual(tiers.WAS.offense.tier, 2)
    assert.strictEqual(tiers.LAL.offense.tier, 3)
  })

  it('calculates point difference tiers', () => {
    assert.strictEqual(tiers.GSW.pt_diff.tier, 1)
    assert.strictEqual(tiers.WAS.pt_diff.tier, 2)
    assert.strictEqual(tiers.LAL.pt_diff.tier, 3)
  })
})
