export type HealthStatus = 'healthy' | 'degraded' | 'down';

interface HealthBadgeProps {
  status: HealthStatus;
}

export default function HealthBadge({ status }: HealthBadgeProps) {
  return <span data-testid="health-badge" data-status={status}>{status}</span>;
}