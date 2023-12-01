import { createContext } from './context';
import { line, circle, text, rect, path } from './shape';
import { restore, save, scale, translate, rotate } from './transform';

export function createRenderer(
  width,
  height,
  {
    line: drawLine = line,
    circle: drawCircle = circle,
    text: drawText = text,
    rect: drawRect = rect,
    path: drawPath = path,
    context: intensifyContext = (d) => d,
  } = {},
) {
  const context = intensifyContext(createContext(width, height));

  return {
    // shape
    line: (attributes) => drawLine(context, attributes),
    circle: (attributes) => drawCircle(context, attributes),
    text: (attributes) => drawText(context, attributes),
    rect: (attributes) => drawRect(context, attributes),
    path: (attributes) => drawPath(context, attributes),
    // transform
    restore: () => restore(context),
    save: () => save(context),
    scale: (...args) => scale(context, ...args),
    translate: (...args) => translate(context, ...args),
    rotate: (...args) => rotate(context, ...args),
    // other
    node: () => context.node,
    group: () => context.group,
  };
}
