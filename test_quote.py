import unittest
from quote import calc_line

class QuoteTests(unittest.TestCase):
    def test_empty_qty_stays_empty(self):
        # empty must not become 1 or 0
        r = calc_line(10, None, [], 0.1)
        self.assertIsNone(r.get("qty_empty") or None)
        # Desired: reject/keep empty — current impl returns qty=1 (bug).
        self.assertNotEqual(r["qty"], 1)

    def test_tax_on_original_and_no_stack(self):
        r = calc_line(100, 1, [0.1, 0.05], 0.1)
        # tax only on undiscounted 100 -> 10; discounts off original: 100-10-5=85; total 95
        self.assertEqual(r["tax"], 10)
        self.assertEqual(r["price"], 85)

    def test_two_quotes_isolated(self):
        a = calc_line(10, 2, [], 0)
        b = calc_line(10, 5, [], 0)
        self.assertEqual(a["qty"], 2)
        self.assertEqual(b["qty"], 5)

if __name__ == "__main__":
    unittest.main()
