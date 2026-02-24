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
    <article className="grid gap-5 rounded-[20px] border border-white/80 bg-white/85 p-6 shadow-[0_18px_40px_rgba(63,41,90,0.12)] animate-floatIn">
      <div className="grid gap-2">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b5a80]">Feature</p>
        <h2 className="text-[1.6rem] font-semibold text-[#2f1f3a]">{title}</h2>
        <p className="leading-relaxed text-[#4f4161]">{description}</p>
      </div>
      <div className="flex">
        <Button variant="primary" onClick={onClick}>
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
