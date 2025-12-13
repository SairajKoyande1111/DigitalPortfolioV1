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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-6 uppercase tracking-wide">
                Project Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Client
                  </span>
                  <p
                    className="text-sm font-medium text-gray-900 dark:text-gray-900"
                    data-testid="text-client-name"
                  >
                    {project?.clientName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Industry
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    {project?.clientIndustry}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Location
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    {project?.clientLocation}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Duration
                  </span>
                  <p
                    className="text-sm font-medium text-gray-900 dark:text-gray-900"
                    data-testid="text-duration"
                  >
                    {project?.duration}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Completed
                  </span>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
                    {project?.completedDate}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">
                    Website
                  </span>
                  {project?.websiteUrl && project.websiteUrl !== "#" ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 dark:text-gray-900 hover:underline inline-flex items-center gap-1"
                      data-testid="link-website"
                    >
                      Visit Site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Private
                    </p>
                  )}
                </div>
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Technologies Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-6 uppercase tracking-wide">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2" data-testid="list-technologies">
                {project?.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-100 text-gray-700 dark:text-gray-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Key Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-6 uppercase tracking-wide">
                Key Features
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                data-testid="list-features"
              >
                {project?.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-2"
                  >
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-400 dark:bg-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-700">{feature}</span>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-6 uppercase tracking-wide">
                Results
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                data-testid="list-outcomes"
              >
                {project?.outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-50"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-700">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
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
