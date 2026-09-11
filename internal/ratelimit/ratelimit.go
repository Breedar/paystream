// Package ratelimit implements a token-bucket limiter to protect API
// endpoints from abuse.
package ratelimit

import (
	"sync"
	"time"
)

// Limiter is a token-bucket rate limiter safe for concurrent use.
type Limiter struct {
	mu         sync.Mutex
	tokens     float64
	capacity   float64
	refillRate float64
	last       time.Time
}

// NewLimiter returns a Limiter that allows up to capacity requests in a
// burst, refilling at refillRate tokens per second.
func NewLimiter(capacity, refillRate float64) *Limiter {
	return &Limiter{
		tokens:     capacity,
		capacity:   capacity,
		refillRate: refillRate,
		last:       time.Now(),
	}
}

// Allow reports whether a single request may proceed now, consuming one
// token if so.
func (l *Limiter) Allow() bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(l.last).Seconds()
	l.last = now

	l.tokens += elapsed * l.refillRate
	if l.tokens > l.capacity {
		l.tokens = l.capacity
	}
	if l.tokens < 1 {
		return false
	}
	l.tokens--
	return true
}
