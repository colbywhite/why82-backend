const assert = require('chai').assert
const stats = require('./resources/2017-08-13-stats')
const tier_calculator = require('../lib/tier_calculator')

describe('tier_calculator', () => {
  let tiers
  before(() => {
    tiers = tier_calculator.calc(stats)
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
})
