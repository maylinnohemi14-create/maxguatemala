import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TrustBadge = ({ icon: Icon, title, description }: TrustBadgeProps) => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
