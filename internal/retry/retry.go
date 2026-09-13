package retry

import (
	"context"
	"time"
)

// Policy configures automatic retry behavior for failed payment operations.
type Policy struct {
	MaxAttempts int
	Backoff     time.Duration
}

// DefaultPolicy retries up to 3 times with a 2 second backoff between
// attempts.
var DefaultPolicy = Policy{MaxAttempts: 3, Backoff: 2 * time.Second}

// Do runs fn, retrying on error according to the policy. It stops retrying
// once ctx is done and returns the last error encountered.
func (p Policy) Do(ctx context.Context, fn func() error) error {
	var err error
	for attempt := 1; attempt <= p.MaxAttempts; attempt++ {
		if err = fn(); err == nil {
			return nil
		}

		if attempt == p.MaxAttempts {
			break
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(p.Backoff):
		}
	}
	return err
}
