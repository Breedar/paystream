package invoice

import "fmt"

// LineItem is a single billed item on an invoice.
type LineItem struct {
	Description string
	AmountCents int64
}

// Invoice represents a generated invoice for a payment transaction.
type Invoice struct {
	Number string
	Items  []LineItem
}

// Generate builds an Invoice for the given transaction ID from a set of
// line items, auto-numbering it using the transaction ID.
func Generate(transactionID string, items []LineItem) Invoice {
	return Invoice{
		Number: fmt.Sprintf("INV-%s", transactionID),
		Items:  items,
	}
}

// Total returns the sum of all line item amounts, in cents.
func (i Invoice) Total() int64 {
	var total int64
	for _, item := range i.Items {
		total += item.AmountCents
	}
	return total
}
