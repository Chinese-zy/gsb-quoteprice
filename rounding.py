# Rounding lives here alone and is applied exactly once, at the very end.
from decimal import Decimal, ROUND_HALF_UP


def round_money(value):
    if value is None:
        return None
    return float(Decimal(str(value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
