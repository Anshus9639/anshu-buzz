import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Availability({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span className="status-dot mt-1.5 shrink-0" aria-hidden="true" />
      <div>
        <p className="mono-label text-chalk">{profile.availability.label}</p>
        {!compact ? (
          <p className="mt-1.5 text-xs leading-relaxed text-ash">
            {profile.availability.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}
