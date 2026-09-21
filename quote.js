// BUG: pricing + rendering + rounding tangled in one module.
let sharedQty = 1; // BUG: shared across quotes -> cross talk

export function calcLine(unit, qty, discount, taxRate) {
  // BUG: empty qty treated as 1
  const q = qty == null || qty === "" ? 1 : Number(qty);
  // BUG: round in the middle
  let base = Math.round(unit * q);
  // BUG: tax on discounted; and discounts stack on already-discounted
  let price = base;
  for (const d of discount || []) {
    price = price * (1 - d);
  }
  price = Math.round(price);
  const tax = Math.round(price * taxRate);
  sharedQty = q;
  return { base, price, tax, total: price + tax, qty: q };
}

export function renderQuote(el, lines) {
  el.innerHTML = "";
  for (const line of lines) {
    const r = calcLine(line.unit, line.qty, line.discount, line.taxRate);
    const div = document.createElement("div");
    div.textContent = `${r.total}`;
    el.appendChild(div);
  }
}

const app = document.getElementById("app");
if (app) renderQuote(app, [{ unit: 100, qty: 2, discount: [0.1, 0.05], taxRate: 0.1 }]);
