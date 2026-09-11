// Package split allocates a payment amount among multiple recipients.
package split

import "fmt"

// Recipient receives a share of a payment, expressed in basis points
// (1/100th of a percent). Shares across all recipients must sum to 10000.
type Recipient struct {
	ID    string
	Share int
}

// Allocation is the amount, in the smallest currency unit, owed to a
// recipient after a split.
type Allocation struct {
	RecipientID string
	Amount      int64
}

// Split divides amount among recipients according to their basis-point
// shares. Any remainder from integer division is assigned to the last
// recipient so the allocations always sum to amount exactly.
func Split(amount int64, recipients []Recipient) ([]Allocation, error) {
	if len(recipients) == 0 {
		return nil, fmt.Errorf("split: no recipients")
	}

	var total int
	for _, r := range recipients {
		total += r.Share
	}
	if total != 10000 {
		return nil, fmt.Errorf("split: shares must sum to 10000 basis points, got %d", total)
	}

	allocations := make([]Allocation, len(recipients))
	var allocated int64
	for i, r := range recipients {
		share := amount * int64(r.Share) / 10000
		allocations[i] = Allocation{RecipientID: r.ID, Amount: share}
		allocated += share
	}
	allocations[len(allocations)-1].Amount += amount - allocated

	return allocations, nil
}
