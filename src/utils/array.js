import { round } from './helper';

/**
 * @see https://github.com/d3/d3-array/blob/main/src/ticks.js#L46
 * 计算刻度
 * @param {*} min 值域左边界
 * @param {*} max 值域右边界
 * @param {*} count 目标刻度个数
 * @returns 刻度
 */
export function tickStep(min, max, count) {
  // 用数列 0，log2，log5 和 log10 两两之间的平均数来作为选择需要改变的误差的标准
  const e10 = Math.sqrt(50); // (log5 + log10) / 2 = log(Math.sqrt(5 * 10))
  const e5 = Math.sqrt(10); // (log2 + log5) / 2 = log(Math.sqrt(2 * 5))
  const e2 = Math.sqrt(2); // (0 + log2) / 2 = log(Math.sqrt(2))
  // 生成指定数量的刻度的间隔
  const step = Math.abs(max - min) / Math.max(0, count);
  // 希望 最后生成的刻度的间隔 满足两个条件：
  // 1. 满足 10 ^ n * b (其中 b=1,2,5) 这样最后生成出来的刻度更好看 2，5，10
  // 2. 误差尽量的小，更符合用户预期
  // 假设 step = 10 ^ x,获取 x 的整数部分，Math.floor(log 10 ^ 10 ^ x => x)
  const power = Math.floor(Math.log10(step));
  // 计算误差,error = 10 ^ (x - n),为 x 的小数部分
  const error = step / (10 ** power);
  // 根据 step = error * 10 ^ n = 10 ^ (x - n) * 10 ^ n = 10 ^ x, 减少误差
  let factor = 1; // 让 factor 更接近 10，最后结果也是更接近 10 的倍数
  // x - n >= 0.85
  if (error >= e10) factor = 10;
  // 0.85 > x- n >= 0.5
  else if (error >= e5) factor = 5;
  // 0.5 > x - n >= 0.15
  else if (error >= e2) factor = 2;
  // factor * 10 ^ n,最后结果是 10 的 n 次方的 1，2，5 倍数
  return factor * (10 ** power);
}

export function ticks(min, max, count) {
  if (min === max) return [min];
  const step = tickStep(min, max, count);
  const start = Math.ceil(min / step);
  const end = Math.floor(max / step);
  const n = Math.ceil(end - start + 1);
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}
