import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <Logo />
      <div className="mt-10 font-mono text-sm text-muted-foreground">404</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-brand-hover"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to home
      </Link>
    </div>
  );
}
