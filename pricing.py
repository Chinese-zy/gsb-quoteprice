from rounding import round_final

def _is_empty(qty):
    return qty is None or qty == ""

def calc_line(unit, qty, discount, tax_rate):
    if _is_empty(qty):
        return {"base": None, "price": None, "tax": None, "total": None, "qty": None}
    q = float(qty)
    raw_base = unit * q
    raw_price = raw_base - sum(raw_base * d for d in (discount or []))
    raw_tax = raw_base * tax_rate
    price = round_final(raw_price)
    tax = round_final(raw_tax)
    return {
        "base": round_final(raw_base),
        "price": price,
        "tax": tax,
        "total": price + tax,
        "qty": q,
    }
