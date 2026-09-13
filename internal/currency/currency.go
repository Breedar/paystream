package currency

import "fmt"

// Rates holds exchange rates keyed by ISO 4217 currency code, relative to a
// single base currency (rate of 1.0).
type Rates map[string]float64

// Converter converts amounts between currencies using a fixed rate table,
// enabling payment streaming across different currencies.
type Converter struct {
	base  string
	rates Rates
}

// NewConverter creates a Converter for the given base currency and rates.
func NewConverter(base string, rates Rates) *Converter {
	return &Converter{base: base, rates: rates}
}

// Convert converts amount (in the smallest currency unit, e.g. cents) from
// one currency to another using the configured rate table.
func (c *Converter) Convert(amount int64, from, to string) (int64, error) {
	if from == to {
		return amount, nil
	}

	fromRate, err := c.rateFor(from)
	if err != nil {
		return 0, err
	}
	toRate, err := c.rateFor(to)
	if err != nil {
		return 0, err
	}

	baseAmount := float64(amount) / fromRate
	return int64(baseAmount * toRate), nil
}

func (c *Converter) rateFor(code string) (float64, error) {
	if code == c.base {
		return 1, nil
	}
	rate, ok := c.rates[code]
	if !ok {
		return 0, fmt.Errorf("currency: no rate configured for %q", code)
	}
	return rate, nil
}
