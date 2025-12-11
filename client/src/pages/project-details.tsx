import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Building2, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service, Project } from "@shared/schema";

function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-12">
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const params = useParams<{ serviceSlug: string; projectId: string }>();
  const { serviceSlug = "", projectId = "" } = params;

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
  });

  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: ["/api/services", serviceSlug],
  });

  const isLoading = projectLoading || serviceLoading;

  if (!isLoading && (!project || !service)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Project not found
          </h1>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href={`/projects/${serviceSlug}`}>
            <Button
              variant="ghost"
              className="-ml-2 text-muted-foreground hover:text-foreground"
              data-testid="button-back-projects"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isLoading ? "Back" : `Back to ${service?.title}`}
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <ProjectDetailsSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-12"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <img
                src={project?.imageUrl}
                alt={project?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                data-testid="text-project-name"
              >
                {project?.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project?.fullDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <Card className="p-6 border-card-border bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Client
                  </span>
                </div>
                <p
                  className="text-lg font-semibold text-foreground"
                  data-testid="text-client-name"
                >
                  {project?.clientName}
                </p>
              </Card>

              <Card className="p-6 border-card-border bg-card">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Duration
                  </span>
                </div>
                <p
                  className="text-lg font-semibold text-foreground"
                  data-testid="text-duration"
                >
                  {project?.duration}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2" data-testid="list-technologies">
                {project?.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="font-mono text-xs px-3 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Key Features
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                data-testid="list-features"
              >
                {project?.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="p-6 border-card-border bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Project Outcomes
                  </h2>
                </div>
                <ul
                  className="space-y-3"
                  data-testid="list-outcomes"
                >
                  {project?.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-8"
            >
              <Link href={`/projects/${serviceSlug}`}>
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-view-more-projects"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View More {service?.title} Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
