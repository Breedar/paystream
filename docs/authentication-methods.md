# Authentication Methods

PayStream supports the following authentication methods for API access.

## API Keys

Include your API key in the `Authorization` header of every request:

```
Authorization: Bearer <your_api_key>
```

API keys are scoped per environment (test/live) and can be rotated from the
dashboard without downtime.

## OAuth 2.0

For integrations acting on behalf of a merchant account, use the OAuth 2.0
authorization code flow. Register your application to receive a client ID
and secret, then redirect users to the authorization endpoint to obtain an
access token.

## Webhook Signatures

Webhook payloads are signed using HMAC-SHA256. Verify the
`X-Paystream-Signature` header against the raw request body using your
webhook signing secret before trusting the payload.

## Two-Factor Authentication

Dashboard accounts can enable two-factor authentication (TOTP) for an
additional layer of protection. This is independent of API authentication
and applies only to the web dashboard.
