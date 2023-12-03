export function interpolateNumber(t, start, end) {
  // (result - start) / (end - start) = t
  return start * (1 - t) + end * t;
}
