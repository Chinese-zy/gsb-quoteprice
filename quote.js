// Page entry: pricing lives in src/pricing.js, rounding in src/rounding.js,
// and drawing in src/render.js. This file only wires the page.
import { computeLine, computeQuote } from "./src/pricing.js";
import { renderQuote } from "./src/render.js";

export { computeLine, computeQuote, renderQuote };

const app = document.getElementById("app");
if (app) renderQuote(app, [{ unit: 100, qty: 2, discount: [0.1, 0.05], taxRate: 0.1 }]);
