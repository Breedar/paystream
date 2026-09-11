// Package twofactor implements HOTP one-time codes (RFC 4226) for
// two-factor account verification.
package twofactor

import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/binary"
	"fmt"
)

// GenerateCode returns a 6-digit one-time code for secret at counter.
func GenerateCode(secret []byte, counter uint64) string {
	buf := make([]byte, 8)
	binary.BigEndian.PutUint64(buf, counter)

	mac := hmac.New(sha1.New, secret)
	mac.Write(buf)
	sum := mac.Sum(nil)

	offset := sum[len(sum)-1] & 0x0f
	code := (uint32(sum[offset])&0x7f)<<24 |
		uint32(sum[offset+1])<<16 |
		uint32(sum[offset+2])<<8 |
		uint32(sum[offset+3])

	return fmt.Sprintf("%06d", code%1000000)
}

// Verify reports whether code matches the HOTP value for secret at
// counter, checking a small forward window to tolerate counter drift.
func Verify(secret []byte, counter uint64, code string, window uint64) bool {
	for i := uint64(0); i <= window; i++ {
		if GenerateCode(secret, counter+i) == code {
			return true
		}
	}
	return false
}
