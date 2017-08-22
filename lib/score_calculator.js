const calc_fib_score_recursivly = (score, prev_score, cur_value, value, step) => {
  if(cur_value===value || Math.abs(score) >= 144) {
    return score
  }
  return calc_fib_score_recursivly(score+prev_score, score, cur_value+step, value, step)
}

const calc_fibonacci_score = (value, zero_value, step) => {
  if(value === zero_value) {
    return 0
  } else if (value === zero_value + step) {
    return 1
  } else if (value === zero_value - step) {
    return -1
  }
  real_step = step
  score = 2
  prev_score = 1
  if (value < zero_value) {
    real_step = -1 * real_step
    score = -1 * score
    prev_score = -1 * prev_score
  }
  return calc_fib_score_recursivly(score, prev_score, zero_value+(real_step*2), value, real_step)
}

module.exports = calc_fibonacci_score
