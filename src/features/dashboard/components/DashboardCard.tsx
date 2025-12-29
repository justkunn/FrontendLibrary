import Button from "../../../shared/components/Button.tsx";

type DashboardCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  onClick: () => void;
};

export default function DashboardCard({
  title,
  description,
  ctaLabel,
  onClick,
}: DashboardCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-card__body">
        <p className="feature-card__eyebrow">Feature</p>
        <h2 className="feature-card__title">{title}</h2>
        <p className="feature-card__description">{description}</p>
      </div>
      <div className="feature-card__actions">
        <Button variant="primary" onClick={onClick}>
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
