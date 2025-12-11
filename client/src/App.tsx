import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Services from "@/pages/services";
import ProjectsGallery from "@/pages/projects-gallery";
import ProjectDetails from "@/pages/project-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Services} />
      <Route path="/projects/:serviceSlug" component={ProjectsGallery} />
      <Route path="/projects/:serviceSlug/:projectId" component={ProjectDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
