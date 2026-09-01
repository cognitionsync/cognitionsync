import { Router as WouterRouter, Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Matches Vite's `base` (e.g. "/cognitionsync/" in production, "/" in dev) so
// routing works whether served from a subpath (GitHub Pages) or the root.
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppRoutes({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter base={routerBase} ssrPath={ssrPath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

/**
 * `ssrPath` is supplied only by the build-time prerender, which has no window
 * for wouter to read a location from. In the browser it stays undefined and
 * routing behaves exactly as it did before.
 */
function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <Toaster />
      <AppRoutes ssrPath={ssrPath} />
    </MotionConfig>
  );
}

export default App;
