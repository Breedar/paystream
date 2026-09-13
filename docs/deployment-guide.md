# Deployment Guide

This guide covers deploying PayStream across common environments.

## Local Development

Run `make dev` to start the API and worker services with hot reload. See
`.env.example` for required environment variables.

## Docker

Build the production image with `docker build -t paystream .` and run it
with the environment variables from your secrets manager.

## Kubernetes

Helm charts are provided under `deploy/helm`. Install with:

```
helm install paystream ./deploy/helm
```

Configure resource limits and replica counts in `values.yaml` to match your
traffic profile.

## Terraform

Infrastructure definitions live under `deploy/terraform`. Run
`terraform plan` before `terraform apply` to review changes to cloud
resources.

## Zero-Downtime Rollouts

Use rolling updates with a readiness probe against `/health` so traffic is
only routed to instances that report `status: ok`.
