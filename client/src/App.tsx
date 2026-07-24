import { Router as WouterRouter, Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Matches Vite's `base` (e.g. "/cognitionsync/" in production, "/" in dev) so
// routing works whether served from a subpath (GitHub Pages) or the root.
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppRoutes() {
  return (
    <WouterRouter base={routerBase}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Toaster />
      <AppRoutes />
    </MotionConfig>
  );
}

export default App;
