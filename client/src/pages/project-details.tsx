import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  TrendingUp, 
  Globe, 
  MapPin, 
  Briefcase,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service, Project } from "@shared/schema";

function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-12">
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div className="grid grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="aspect-[3/2] rounded-lg" />
        ))}
      </div>
      <div>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-2/3" />
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
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href={`/projects/${serviceSlug}`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-black dark:text-black"
              data-testid="button-back-projects"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-black dark:text-black">
            AIRAVATA TECHNOLOGIES
          </h1>
          <div className="w-9" />
        </motion.div>

        {isLoading ? (
          <ProjectDetailsSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-16"
          >
            {/* Hero Image */}
            <section>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={project?.imageUrl}
                  alt={project?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </section>

            {/* Gallery Images */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4 uppercase tracking-wide">
                Project Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {project?.galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/2] rounded-lg overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={img}
                      alt={`${project?.name} gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Project Title & Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight"
                  data-testid="text-project-name"
                >
                  {project?.name}
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {project?.fullDescription}
              </p>
            </motion.section>

            <Separator className="my-8" />

            {/* Client Information Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Client Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Client Name
                    </span>
                  </div>
                  <p
                    className="text-xl font-semibold text-foreground"
                    data-testid="text-client-name"
                  >
                    {project?.clientName}
                  </p>
                </Card>

                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Industry
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {project?.clientIndustry}
                  </p>
                </Card>

                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Location
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {project?.clientLocation}
                  </p>
                </Card>

                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Duration
                    </span>
                  </div>
                  <p
                    className="text-xl font-semibold text-foreground"
                    data-testid="text-duration"
                  >
                    {project?.duration}
                  </p>
                </Card>

                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Completed
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-foreground">
                    {project?.completedDate}
                  </p>
                </Card>

                <Card className="p-6 border-card-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Website
                    </span>
                  </div>
                  <a
                    href={project?.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-primary hover:underline inline-flex items-center gap-2"
                    data-testid="link-website"
                  >
                    Visit Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Card>
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Technologies Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-3" data-testid="list-technologies">
                {project?.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="font-mono text-sm px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.section>

            {/* Key Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Key Features
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                data-testid="list-features"
              >
                {project?.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Project Outcomes Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="p-8 border-card-border bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Project Outcomes
                  </h2>
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  data-testid="list-outcomes"
                >
                  {project?.outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-xl bg-background/60 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 text-primary text-xl font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <p className="text-foreground font-medium text-lg">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>

            {/* Back Button */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-8"
            >
              <Link href={`/projects/${serviceSlug}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base"
                  data-testid="button-view-more-projects"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View More {service?.title} Projects
                </Button>
              </Link>
            </motion.section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
