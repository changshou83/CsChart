import { normalize, floor, ceil, nice } from '../utils/helper';
import { tickStep, ticks } from '../utils/array';
import { interpolateNumber } from './interpolate';

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  // 线性映射
  const scale = (x) => {
    // 归一化
    const t = normalize(x, d0, d1);
    // 计算插值
    return interpolate(t, r0, r1);
  };

  // 生成坐标刻度
  scale.ticks = (tickCount = 10) => ticks(d0, d1, tickCount);
  // 优化边界
  scale.nice = (tickCount) => {
    if (d0 === d1) return;
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
}
