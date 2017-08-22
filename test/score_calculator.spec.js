const assert = require('chai').assert
const calc = require('../lib/score_calculator')

describe('score_calculator', () => {
  it('calculates scores for positive base cases', () => {
    assert.strictEqual(calc(3, 3, 1), 0)
    assert.strictEqual(calc(4, 3, 1), 1)
    assert.strictEqual(calc(5, 3, 1), 2)
  })

  it('calculates scores for negative base cases', () => {
    assert.strictEqual(calc(2, 3, 1), -1)
    assert.strictEqual(calc(1, 3, 1), -2)
  })

  it('calculates scores for positive recursive cases', () => {
    assert.strictEqual(calc(6, 3, 1), 3)
    assert.strictEqual(calc(7, 3, 1), 5)
    assert.strictEqual(calc(8, 3, 1), 8)
    assert.strictEqual(calc(9, 3, 1), 13)
    assert.strictEqual(calc(10, 3, 1), 21)
    assert.strictEqual(calc(11, 3, 1), 34)
    assert.strictEqual(calc(12, 3, 1), 55)
    assert.strictEqual(calc(13, 3, 1), 89)
    assert.strictEqual(calc(14, 3, 1), 144)
  })

  it('calculates scores for negative recursive cases', () => {
    assert.strictEqual(calc(0, 3, 1), -3)
    assert.strictEqual(calc(-1, 3, 1), -5)
    assert.strictEqual(calc(-2, 3, 1), -8)
    assert.strictEqual(calc(-3, 3, 1), -13)
    assert.strictEqual(calc(-4, 3, 1), -21)
    assert.strictEqual(calc(-5, 3, 1), -34)
    assert.strictEqual(calc(-6, 3, 1), -55)
    assert.strictEqual(calc(-7, 3, 1), -89)
    assert.strictEqual(calc(-8, 3, 1), -144)
  })

  it('does not overflow on scores > 144 or < -144', () => {
    assert.strictEqual(calc(15, 3, 1), 144)
    assert.strictEqual(calc(-9, 3, 1), -144)
  })
})
