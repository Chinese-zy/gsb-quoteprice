import { roundMoney } from "./rounding.js";

export function isEmptyQty(qty) {
  return qty === null || qty === undefined || qty === "";
}

// Pure pricing: no rendering, no rounding until the final step, no shared state.
export function computeLine(unit, qty, discounts, taxRate) {
  // Empty quantity stays empty: it is neither 1 nor 0.
  if (isEmptyQty(qty)) {
    return { qty: null, qtyEmpty: true, base: null, discount: null, tax: null, price: null, total: null };
  }

  const q = Number(qty);
  const base = unit * q;                 // no mid-pipeline rounding

  // Every discount is subtracted from the original price: never discount-on-discount.
  const discountAmount = (discounts || []).reduce((sum, d) => sum + base * d, 0);
  const price = base - discountAmount;

  // Tax is charged once, on the undiscounted original price only.
  const tax = base * taxRate;

  // Rounding happens once, at the end.
  return {
    qty: q,
    qtyEmpty: false,
    base: roundMoney(base),
    discount: roundMoney(discountAmount),
    tax: roundMoney(tax),
    price: roundMoney(price),
    total: roundMoney(price + tax),
  };
}

// Each quote is computed independently; nothing leaks between calls.
export function computeQuote(lines) {
  return (lines || []).map((line) =>
    computeLine(line.unit, line.qty, line.discount, line.taxRate)
  );
}
