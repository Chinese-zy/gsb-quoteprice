from rounding import round_money


def is_empty_qty(qty):
    return qty is None or qty == ""


# Pure pricing: no rendering, no rounding until the final step, no shared state.
def compute_line(unit, qty, discounts, tax_rate):
    # Empty quantity stays empty: it is neither 1 nor 0.
    if is_empty_qty(qty):
        return {
            "qty": None,
            "base": None,
            "discount": None,
            "tax": None,
            "price": None,
            "total": None,
        }

    q = float(qty)
    base = unit * q  # no mid-pipeline rounding

    # Every discount is subtracted from the original price: never discount-on-discount.
    discount_amount = sum(base * d for d in (discounts or []))
    price = base - discount_amount

    # Tax is charged once, on the undiscounted original price only.
    tax = base * tax_rate

    # Rounding happens once, at the end.
    return {
        "qty": q,
        "base": round_money(base),
        "discount": round_money(discount_amount),
        "tax": round_money(tax),
        "price": round_money(price),
        "total": round_money(price + tax),
    }


# Each quote is computed independently; nothing leaks between calls.
def compute_quote(lines):
    return [
        compute_line(line["unit"], line["qty"], line.get("discount"), line["taxRate"])
        for line in (lines or [])
    ]
