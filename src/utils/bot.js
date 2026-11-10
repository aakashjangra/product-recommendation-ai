import data from "../data/responses.json";

const normalize = (s) => s.toLowerCase().trim();

// "500 - 1000", "500 to 1000", "500-1000" -> "500-1000"
const toBudgetKey = (s) =>
  s.toLowerCase().replace(/[^0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const formatBudget = (key) => key.replace("-", " - ");

/**
 * @param {string} input   user message
 * @param {string|null} pending  product waiting for a budget
 * @returns {{text:string, pending:string|null, options:string[]}}
 */
export function getReply(input, pending) {
  const q = normalize(input);

  if (pending) {
    const key = toBudgetKey(input);
    const reply = data.products[pending]?.budgets[key];
    if (reply) return { text: reply, pending: null, options: [] };
  }

  const product = Object.keys(data.products).find((k) => q.includes(k));
  if (product) {
    const p = data.products[product];
    return { text: p.prompt, pending: product, options: Object.keys(p.budgets) };
  }

  if (data.general[q]) {
    return { text: data.general[q], pending, options: [] };
  }

  return { text: data.fallback, pending, options: [] };
}