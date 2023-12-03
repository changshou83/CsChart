export function identity(x) {
  return x;
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

/**
 * 解决 js 精度问题，0.1 + 0.2 !== 0.3
 * @param {number} n
 * @returns
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

/**
 * 归一化函数，计算出值在值域中的位置
 * @param {*} value 值
 * @param {*} start 值域左边界
 * @param {*} end 值域右边界
 * @returns 百分比
 */
export function normalize(value, start, end) {
  return (value - start) / (end - start);
}

/**
 * 将刻度边界变得更易读
 * @param {*} domain 原边界
 * @param {*} interval
 * @returns
 */
export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}
