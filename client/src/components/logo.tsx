import { cn } from "@/lib/utils";

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" role="img">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <circle cx="12" cy="4" r="1.9" fill="hsl(var(--brand))" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}

export default function Logo({
  className = "",
  markClassName = "h-7 w-7",
  textClassName = "text-[1.05rem]",
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <LogoMark className={markClassName} />
      <span className={cn("font-semibold tracking-tight", textClassName)}>CognitionSync</span>
    </span>
  );
}
