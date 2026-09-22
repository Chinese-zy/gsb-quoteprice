import { computeQuote } from "./pricing.js";

// Rendering only draws already-computed numbers; it never prices anything.
export function renderQuote(el, lines) {
  const rows = computeQuote(lines);
  el.innerHTML = "";
  for (const row of rows) {
    const div = document.createElement("div");
    div.textContent = row.qtyEmpty ? "" : `${row.total}`;
    el.appendChild(div);
  }
}
