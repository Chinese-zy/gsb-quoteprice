# Server-side twin with same bugs for unittest vectors.
_shared = {"qty": 1}

def calc_line(unit, qty, discount, tax_rate):
    q = 1 if qty in (None, "") else float(qty)
    base = round(unit * q)
    price = float(base)
    for d in discount or []:
        price = price * (1 - d)
    price = round(price)
    tax = round(price * tax_rate)
    _shared["qty"] = q
    return {"base": base, "price": price, "tax": tax, "total": price + tax, "qty": q}
