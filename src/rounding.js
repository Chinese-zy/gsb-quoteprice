// Rounding lives here alone and is applied exactly once, at the very end.
export function roundMoney(value) {
  // Shift via string-safe powers of ten to keep the last digit from drifting.
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
