import { applyAttributes, createSVGElement, mount } from '../utils/dom';

export function line(context, attributes) {
  return shape('line', context, attributes);
}

export function rect(context, attributes) {
  const { width, height, x, y } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function path(context, attributes) {
  const { d } = attributes;
  const path = Array.isArray(d) ? d.flat().join(' ') : d;
  return shape('path', context, { ...attributes, d: path });
}

export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textEl = shape('text', context, rest);
  textEl.textContent = text;
  return textEl;
}

export function ring(context, attributes) {
  const { r1, r2, stroke, strokeWidth = 0, fill, ...rest } = attributes;
  if (strokeWidth > 0) {
    const c1R = r1 + strokeWidth;
    const c2Width = r2 - r1 - strokeWidth * 2;
    return [
      shape('circle', context, {
        ...rest,
        r: c1R,
        strokeWidth,
        fill: 'transparent',
        stroke: stroke || 'transparent',
      }),
      shape('circle', context, {
        ...rest,
        r: c1R + c2Width,
        strokeWidth: c2Width,
        fill: 'transparent',
        stroke: fill || 'transparent',
      }),
      shape('circle', context, {
        ...rest,
        r: r2,
        strokeWidth,
        fill: 'transparent',
        stroke: stroke || 'transparent',
      }),
    ];
  }
  return [
    shape('circle', context, {
      ...rest,
      r: r1,
      strokeWidth: r2 - r1,
      fill: 'transparent',
      stroke: fill || 'transparent',
    }),
  ];
}

export function shape(type, context, attributes) {
  const { group } = context;
  // 创建元素
  const el = createSVGElement(type);
  // 设置属性
  applyAttributes(el, attributes);
  // 挂载元素
  mount(group, el);
  return el;
}
