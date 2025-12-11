import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

import websiteDevImg from "@assets/2_1765447271354.png";
import mobileAppImg from "@assets/3_1765447271355.png";
import softwareDevImg from "@assets/4_1765447271355.png";
import digitalMarketingImg from "@assets/5_1765447271356.png";

const imageMap: Record<string, string> = {
  "website-development": websiteDevImg,
  "mobile-application-development": mobileAppImg,
  "software-development": softwareDevImg,
  "digital-marketing": digitalMarketingImg,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function ServiceImageSkeleton() {
  return (
    <Skeleton className="w-full aspect-video rounded-lg" />
  );
}

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming ideas into digital excellence
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ServiceImageSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const serviceImage = imageMap[service.slug];
              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Link href={`/projects/${service.slug}`}>
                    <div
                      className="cursor-pointer rounded-lg"
                      data-testid={`image-service-${service.id}`}
                    >
                      <img
                        src={serviceImage}
                        alt={service.title}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
