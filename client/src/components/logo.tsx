import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@config";

// Step sequence: Normal -> Flip H -> Flip V -> Rotate
const TRANSFORMS = [
  "scale(1, 1) rotate(0deg)",
  "scale(-1, 1) rotate(0deg)",
  "scale(-1, -1) rotate(0deg)",
  "scale(-1, -1) rotate(180deg)",
];

// Random delay options in milliseconds (e.g., 2s, 3s, 4s, 5s, 8s)
const RANDOM_DELAYS = [1000, 2000];

function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerNextAnimation = () => {
      // Pick a random interval from the list
      const randomDelay =
        RANDOM_DELAYS[Math.floor(Math.random() * RANDOM_DELAYS.length)];

      timeoutId = setTimeout(() => {
        setStep((prev) => (prev + 1) % TRANSFORMS.length);
        triggerNextAnimation(); // Schedule the next trigger recursively
      }, randomDelay);
    };

    triggerNextAnimation();

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, []);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* C — outer arc */}
      <path
        d="M 18.93 8 A 8 8 0 1 0 18.93 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* S — animated inner path */}
      <path
        d="M 14.5 9 C 11 7.2, 7.5 10, 12 12 C 16.5 14, 13 16.8, 9.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "12px 12px",
          transform: TRANSFORMS[step],
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {/* Brand accent dots */}
      <circle cx="18.93" cy="8" r="1.5" fill="hsl(var(--brand))" />
      <circle cx="18.93" cy="16" r="1.5" fill="hsl(var(--brand))" />
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
      <span className={cn("font-semibold tracking-tight", textClassName)}>
        {siteConfig.brand.name}
      </span>
    </span>
  );
}