import { calcLine } from "./pricing.js";

export { calcLine };

export function renderQuote(el, lines) {
  el.innerHTML = "";
  for (const line of lines) {
    const r = calcLine(line.unit, line.qty, line.discount, line.taxRate);
    const div = document.createElement("div");
    div.textContent = r.total == null ? "" : `${r.total}`;
    el.appendChild(div);
  }
}

const app = document.getElementById("app");
if (app) renderQuote(app, [{ unit: 100, qty: 2, discount: [0.1, 0.05], taxRate: 0.1 }]);
