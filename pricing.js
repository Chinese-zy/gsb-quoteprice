import { roundFinal } from "./rounding.js";

export function calcLine(unit, qty, discount, taxRate) {
  if (qty == null || qty === "") {
    return { base: null, price: null, tax: null, total: null, qty: null };
  }
  const q = Number(qty);
  const rawBase = unit * q;
  const rawPrice = (discount || []).reduce((acc, d) => acc - rawBase * d, rawBase);
  const rawTax = rawBase * taxRate;
  const price = roundFinal(rawPrice);
  const tax = roundFinal(rawTax);
  return { base: roundFinal(rawBase), price, tax, total: price + tax, qty: q };
}
