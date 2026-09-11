# Webhooks

PayStream can notify your service of payment status changes via signed
HTTP webhooks, delivered by `internal/webhook`.

## Registering an endpoint

An `Endpoint` pairs a destination URL with a secret used to sign payloads:

```go
ep := webhook.Endpoint{
	URL:    "https://example.com/hooks/paystream",
	Secret: "your-webhook-secret",
}
```

## Delivery and retries

`Notifier.Send` posts a JSON-encoded `Event` to the endpoint, retrying
non-2xx responses and transport errors with exponential backoff (default
3 retries, starting at a 1 second delay):

```go
n := webhook.NewNotifier()
err := n.Send(ctx, ep, webhook.Event{Type: "payment.completed", Data: payload})
```

## Verifying signatures

Every request includes an `X-PayStream-Signature` header: the hex-encoded
HMAC-SHA256 of the raw request body, keyed with your endpoint's secret.
Recompute it with `webhook.Sign(secret, body)` and compare before trusting
the payload. The event type is also sent as `X-PayStream-Event`.
