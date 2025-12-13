import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service, Project } from "@shared/schema";

function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="aspect-[4/3] w-full lg:col-span-2" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-[4/3]" />
          ))}
        </div>
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

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectName: string;
}

function ImageLightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev, projectName }: ImageLightboxProps) {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
          onClick={onClose}
          data-testid="button-close-lightbox"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          data-testid="button-prev-image"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          data-testid="button-next-image"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
        
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          src={images[currentIndex]}
          alt={`${projectName} - Image ${currentIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectDetails() {
  const params = useParams<{ serviceSlug: string; projectId: string }>();
  const { serviceSlug = "", projectId = "" } = params;
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
  });

  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: ["/api/services", serviceSlug],
  });

  const isLoading = projectLoading || serviceLoading;
  
  const galleryImages = project?.galleryImages || [];
  const allImages = project ? [project.imageUrl, ...galleryImages] : [];
  
  const openLightbox = (index: number) => {
    if (allImages.length === 0) return;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  const desktopThumbnailCount = 6;
  const mobileThumbnailCount = 4;
  const desktopThumbnails = galleryImages.slice(0, desktopThumbnailCount);
  const mobileThumbnails = galleryImages.slice(0, mobileThumbnailCount);
  const hasMoreDesktopImages = galleryImages.length > desktopThumbnailCount;
  const hasMoreMobileImages = galleryImages.length > mobileThumbnailCount;

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
      <ImageLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        projectName={project?.name || ""}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
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
            {/* Image Gallery - Desktop Layout */}
            <section className="hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                {/* Main Image - Left Side */}
                <div 
                  className="col-span-2 aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(0)}
                  data-testid="image-main-desktop"
                >
                  <img
                    src={project?.imageUrl}
                    alt={project?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnails - Right Side */}
                {desktopThumbnails.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {desktopThumbnails.map((img, index) => {
                      const isLastVisible = index === desktopThumbnails.length - 1;
                      const showViewAll = isLastVisible && hasMoreDesktopImages;
                      const remainingCount = galleryImages.length - desktopThumbnailCount + 1;
                      
                      return (
                        <div
                          key={index}
                          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                          onClick={() => showViewAll ? openLightbox(0) : openLightbox(index + 1)}
                          data-testid={`thumbnail-desktop-${index}`}
                        >
                          <img
                            src={img}
                            alt={`${project?.name} gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {showViewAll && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">View All ({remainingCount}+)</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
            
            {/* Image Gallery - Mobile Layout */}
            <section className="lg:hidden">
              {/* Main Image */}
              <div 
                className="aspect-[4/3] overflow-hidden cursor-pointer mb-2"
                onClick={() => openLightbox(0)}
                data-testid="image-main-mobile"
              >
                <img
                  src={project?.imageUrl}
                  alt={project?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Grid */}
              {mobileThumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {mobileThumbnails.map((img, index) => {
                    const isLastVisible = index === mobileThumbnails.length - 1;
                    const showViewAll = isLastVisible && hasMoreMobileImages;
                    const remainingCount = galleryImages.length - mobileThumbnailCount + 1;
                    
                    return (
                      <div
                        key={index}
                        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                        onClick={() => showViewAll ? openLightbox(0) : openLightbox(index + 1)}
                        data-testid={`thumbnail-mobile-${index}`}
                      >
                        <img
                          src={img}
                          alt={`${project?.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {showViewAll && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">View All ({remainingCount}+)</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

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
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-50 dark:to-gray-100 p-8 -mx-4 sm:-mx-6 lg:-mx-8"
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-blue-500 rounded-full" />
                  Tech Stack
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="list-technologies">
                  {(project?.technologies ?? []).map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white dark:bg-white p-4 shadow-sm border border-gray-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-base font-medium text-gray-900 dark:text-gray-900">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Key Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-green-500 rounded-full" />
                Key Features
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-testid="list-features"
              >
                {(project?.features ?? []).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-50 border-l-4 border-green-500"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-gray-800 dark:text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Project Outcomes Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-50 dark:to-indigo-50 p-8 -mx-4 sm:-mx-6 lg:-mx-8"
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-indigo-500 rounded-full" />
                  Project Results
                </h2>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  data-testid="list-outcomes"
                >
                  {(project?.outcomes ?? []).map((outcome, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 bg-white dark:bg-white shadow-sm border border-indigo-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-base text-gray-800 dark:text-gray-800 font-medium leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
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
