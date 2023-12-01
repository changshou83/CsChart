export function createSVGElement(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (d) => `-${d.toLocaleLowerCase()}`,
    );
    element.setAttribute(kebabCaseKey, value);
  }
}

export function applyTransform(element, transform) {
  const oldTrans = element.getAttribute('transform') || '';
  const prefix = oldTrans ? `${oldTrans} ` : '';
  element.setAttribute('transform', prefix + transform);
}
